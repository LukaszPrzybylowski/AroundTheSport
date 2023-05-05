     using EngineerWorld.Model.Avatar;
using EngineerWorld.Model.Photo;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Dapper;
using CloudinaryDotNet;

namespace EngineerWorld.Repository
{
    public class AvatarRepository : IAvatarRepository
    {
        private readonly IConfiguration _config;

        public AvatarRepository(IConfiguration config)
        {
            _config = config;
        }
        public async Task<int> DeleteAsync(int avatarId)
        {
            int affectiveRows = 0;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                affectiveRows = await connection.ExecuteAsync("Avatar_Delete",
                    new { AvatarId = avatarId },
                    commandType: CommandType.StoredProcedure);

            }

            return affectiveRows;
        }

        public async Task<Avatar> GetAsync(int avatarId)
        {
            Avatar avatar;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                avatar = await connection.QueryFirstOrDefaultAsync<Avatar>("Avatar_Get",
                    new { AvatarId = avatarId },
                    commandType: CommandType.StoredProcedure);

            }

            return avatar;
        }

        public async Task<Avatar> GetByUserIdAsync(int applicationUserId)
        {
            Avatar avatar;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                avatar = await connection.QueryFirstOrDefaultAsync<Avatar>("Avatar_GetByUserId",
                    new { ApplicationUserId = applicationUserId },
                    commandType: CommandType.StoredProcedure);

            }

            return avatar;
        }

        public async Task<Avatar> InsertAsync(AvatarCreate avatarCreate, int applicationUserId)
        {
            
            var dataTable = new DataTable();
            dataTable.Columns.Add("AvatarPublicId", typeof(string));
            dataTable.Columns.Add("AvatarUrl", typeof(string));

            dataTable.Rows.Add(
                avatarCreate.AvatarPublicId,
                avatarCreate.AvatarUrl);

            int newAvatarId;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync();

                newAvatarId = await connection.ExecuteScalarAsync<int>("Avatar_Insert",
                    new
                    {
                        Avatar = dataTable.AsTableValuedParameter("dbo.AvatarType"),
                        ApplicationUserId = applicationUserId
                    },
                    commandType: CommandType.StoredProcedure);

                
            }

            Avatar avatar = await GetAsync(newAvatarId);

            

            return avatar;
        }

        public async Task<AvatarUpdate> UpdateAsync(AvatarUpdate avatarUpdate, int avatarId)
        {
            var dataTable = new DataTable();
            dataTable.Columns.Add("AvatarPublicId", typeof(string));
            dataTable.Columns.Add("AvatarUrl", typeof(string));

            dataTable.Rows.Add(
                avatarUpdate.AvatarPublicId,
                avatarUpdate.AvatarUrl);

            AvatarUpdate newAvatarUpdateDTO;

            try
            {
                using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();

                    newAvatarUpdateDTO = await connection.ExecuteScalarAsync<AvatarUpdate>(
                        "AvatarUpdate", new
                        {
                            ApplicationUser = dataTable.AsTableValuedParameter("dbo.AvatarTypeUpdate"),
                            AvatarId = avatarId
                        }, commandType: CommandType.StoredProcedure);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return newAvatarUpdateDTO;
        } 
    }
}
