using EngineerWorld.Model.Avatar;
using EngineerWorld.Model.Photo;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EngineerWorld.Repository
{
    public  interface IAvatarRepository
    {
        public Task<Avatar> InsertAsync(AvatarCreate avatarCreate, int applicationUserId);

        public Task<Avatar> GetAsync(int avatarId);

        public Task<int> DeleteAsync(int avatarId);

        public Task<Avatar> GetByUserIdAsync(int applicationUserId);

        public Task<AvatarUpdate> UpdateAsync(AvatarUpdate avatarUpdate, int avatarId);
    }
}
