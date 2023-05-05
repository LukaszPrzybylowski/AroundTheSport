using CloudinaryDotNet.Actions;
using CloudinaryDotNet;
using EngineerWorld.Model.Settings;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EngineerWorld.Services
{
    public class AvatarService : IAvatarService
    {
        private readonly Cloudinary _cloudinary;

        public AvatarService(IOptions<CloudinaryOptions> config)
        {
            var account = new Account(config.Value.CloudName, config.Value.ApiKey, config.Value.ApiSecret);

            _cloudinary = new Cloudinary(account);
        }

        public async Task<ImageUploadResult> AddAvatarAsync(IFormFile file)
        {
            var uploadResult = new ImageUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new ImageUploadParams
                    {
                        File = new FileDescription(file.FileName, stream),
                        Transformation = new Transformation().Height(300).Width(500).Crop("fill")
                    };

                    uploadResult = await _cloudinary.UploadAsync(uploadParams);
                }
            }

            return uploadResult;
        }

        public async Task<DeletionResult> DeleteAvatarAsync(string avatarPublicId)
        {
            var deletionParams = new DeletionParams(avatarPublicId);

            var result = await _cloudinary.DestroyAsync(deletionParams);

            return result;
        }
    }
}
