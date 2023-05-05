using EngineerWorld.Model.Avatar;
using EngineerWorld.Repository;
using EngineerWorld.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.JsonWebTokens;

namespace EngineerWorld.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AvatarController : ControllerBase
    {
        private readonly IAvatarRepository _avatarRepository;
        private readonly IAvatarService _avatarService;

        public AvatarController(
            IAvatarRepository avatarRepository,
            IAvatarService avatarService)
        {
            _avatarRepository = avatarRepository;
            _avatarService = avatarService;
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Avatar>> UploadAvatar(IFormFile file)
        {
            int applicaitonUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);
            
            var uploadResult = await _avatarService.AddAvatarAsync(file);

            var userAvatar = await _avatarRepository.GetByUserIdAsync(applicaitonUserId);

            if (uploadResult.Error != null) return BadRequest(uploadResult.Error.Message);

            var avatarCreate = new AvatarCreate()
            {
                AvatarPublicId = uploadResult.PublicId,
                AvatarUrl = uploadResult.SecureUri.AbsoluteUri,
            };

            var avatar = await _avatarRepository.InsertAsync(avatarCreate, applicaitonUserId);

            return Ok(avatar);
        }

        [HttpGet]
        public async Task<ActionResult<Avatar>> GetAvatarByUserId()
        {
            int applicaitonUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var avatar = await _avatarRepository.GetByUserIdAsync(applicaitonUserId);

                return Ok(avatar);
        }

        [HttpGet("{avatarId}")]
        public async Task<ActionResult<Avatar>> GetAvatar(int avatarId)
        {
            var avatar = await _avatarRepository.GetAsync(avatarId);

            return Ok(avatar);
        }

        
        [Authorize]
        [HttpDelete("{avatarId}")]
        public async Task<ActionResult<int>> Delete(int avatarId)
        {
            int applicaitonUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var foundAvatar = await _avatarRepository.GetByUserIdAsync(applicaitonUserId);

            if (foundAvatar != null)
            {
                if (foundAvatar.ApplicationUserId == applicaitonUserId)
                {
                    var deleteResult = await _avatarService.DeleteAvatarAsync(foundAvatar.AvatarPublicId);

                    if (deleteResult.Error != null) return BadRequest(deleteResult.Error.Message);

                    var affectRows = await _avatarRepository.DeleteAsync(foundAvatar.AvatarId);

                    return Ok(affectRows);
                }
                else
                {
                    return BadRequest("Avatar was not upload by the current user.");
                }
            }

            return BadRequest("Avatar does not exsit.");
        }

        [Authorize]
        [HttpPatch("{avatarId}")]

        public async Task<ActionResult<AvatarUpdate>> UpdateAsync(AvatarUpdate avatarUpdate, int avatarId)
        {
            int applicaitonUserId = int.Parse(User.Claims.First(i => i.Type == JwtRegisteredClaimNames.NameId).Value);

            var foundAvatar = await _avatarRepository.GetAsync(avatarId);

            if(foundAvatar != null)
            {
                var updateResult = await _avatarRepository.UpdateAsync(avatarUpdate, avatarId);

                return Ok(updateResult);
            }

            return BadRequest("You can't update Avatar for this User.");
        }
    }
}
