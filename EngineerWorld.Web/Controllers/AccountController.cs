using EngineerWorld.Model.Account;
using EngineerWorld.Model.Article;
using EngineerWorld.Repository;
using EngineerWorld.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.IdentityModel.Tokens.Jwt;

namespace EngineerWorld.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly ITokenService _tokenService;
        private readonly UserManager<ApplicationUserIdentity> _userManager;
        private readonly SignInManager<ApplicationUserIdentity> _signInManager;
        private readonly IAccountRepository _accountRepository;

        public AccountController(ITokenService tokenService, UserManager<ApplicationUserIdentity> userManager, SignInManager<ApplicationUserIdentity> signInManager, IAccountRepository accountRepository)
        {
            _tokenService = tokenService;
            _userManager = userManager;
            _signInManager = signInManager;
            _accountRepository = accountRepository;

        }

        [HttpPost("register")]
        public async Task<ActionResult<ApplicationUser>> Register(ApplicationUserCreate applicationUserCreate)
        {

            var applicationUserIdentity = new ApplicationUserIdentity
            {
                UserRole = applicationUserCreate.UserRole,
                Username = applicationUserCreate.Username,
                Email = applicationUserCreate.Email,
                Fullname = applicationUserCreate.Fullname,
                Lastname = applicationUserCreate.Lastname,
                Company = applicationUserCreate.Company,
                Profession = applicationUserCreate.Profession,
                AvatarId = applicationUserCreate.AvatarId
            };

            var result = await _userManager.CreateAsync(applicationUserIdentity, applicationUserCreate.Password);

            if(result.Succeeded) 
            {
                applicationUserIdentity = await _userManager.FindByNameAsync(applicationUserCreate.Username);

                ApplicationUser applicationUser = new ApplicationUser()
                {
                    ApplicationUserId = applicationUserIdentity.ApplicationUserId,
                    Username = applicationUserIdentity.Username,
                    Email = applicationUserIdentity.Email,
                    Fullname = applicationUserIdentity.Fullname,
                    Lastname = applicationUserIdentity.Lastname,
                    Company = applicationUserIdentity.Company,
                    Profession = applicationUserIdentity.Profession,
                    Token = _tokenService.CreateToken(applicationUserIdentity),
                    AvatarId = applicationUserIdentity.AvatarId
                };

                return Ok(applicationUser);

            }

            return BadRequest(result.Errors);
        }

        [HttpPost("login")]
        public async Task<ActionResult<ApplicationUser>> Login(ApplicationUserLogin applicationUserLogin)
        {
            var applicationUserIdentity = await _userManager.FindByNameAsync(applicationUserLogin.Username);

            if (applicationUserLogin != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(applicationUserIdentity, applicationUserLogin.Password, false);

                if (result.Succeeded)
                {
                    ApplicationUser applicationUser = new ApplicationUser
                    {
                        ApplicationUserId = applicationUserIdentity.ApplicationUserId,
                        Username = applicationUserIdentity.Username,
                        Email = applicationUserIdentity.Email,
                        Fullname = applicationUserIdentity.Fullname,
                        Lastname = applicationUserIdentity.Lastname,
                        Company = applicationUserIdentity.Company,
                        Profession = applicationUserIdentity.Profession,
                        Token = _tokenService.CreateToken(applicationUserIdentity),
                        AvatarId = applicationUserIdentity.AvatarId
                    };

                    return Ok(applicationUser);
                }

                return BadRequest("Invalid login attempt.");
            }

            return BadRequest("Invalid login attempt.");
        }

        [Authorize]
        [HttpPatch("accountSettings")]
        public async Task<ActionResult<ApplicationUserUpdate>> UpdateUser(ApplicationUserUpdate applicationUserUpdate)
        {

            int applicaitonUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            if (applicaitonUserId != null)
            {
                var applicationUserUpdateDTO = await _accountRepository.UpdateUserAsync(applicationUserUpdate, applicaitonUserId);

                return Ok(applicationUserUpdate);
            }
            
           return BadRequest("You can't update data for this User.");
        }

        [HttpGet]
        public async Task<ActionResult<ApplicationUserUpdate>> GetApplicationUser(int applicationUserId)
        {
            var applicationUser = await _accountRepository.GetApplicationUser(applicationUserId);

            return Ok(applicationUser);
        }

    }
}
