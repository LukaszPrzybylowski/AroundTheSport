using CloudinaryDotNet.Actions;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EngineerWorld.Services
{
    public interface IAvatarService
    {
            Task<ImageUploadResult> AddAvatarAsync(IFormFile file);

            public Task<DeletionResult> DeleteAvatarAsync(string avatarPublicId);
        
    }
}
