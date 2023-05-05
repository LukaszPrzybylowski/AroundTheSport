using EngineerWorld.Model.Account;

using Microsoft.AspNetCore.Identity;

namespace EngineerWorld.Repository
{
    public interface IAccountRepository
    {
        public Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken);

        public Task<ApplicationUserIdentity> GetByUsernameAsync(string normalizedUsername, CancellationToken cancellationToken);

        public Task<ApplicationUserUpdate> UpdateUserAsync(ApplicationUserUpdate applicationUserUpdate, int applicationUserId);

        public Task<ApplicationUserIdentity> GetApplicationUser(int applicationUserId);
    }
}