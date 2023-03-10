using Dapper;
using EngineerWorld.Model.Account;
using EngineerWorld.Model.Article;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace EngineerWorld.Repository
{
    public class AccountRepository : IAccountRepository
    {
        private readonly IConfiguration _config;

        public AccountRepository(IConfiguration config)
        {
            _config = config;
        }
        public async Task<IdentityResult> CreateAsync(ApplicationUserIdentity user, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            var dataTable = new DataTable();
            dataTable.Columns.Add("UserRole", typeof(string));
            dataTable.Columns.Add("Username", typeof(string));
            dataTable.Columns.Add("NormalizedUsername", typeof(string));
            dataTable.Columns.Add("Email", typeof(string));
            dataTable.Columns.Add("NormalizedEmail", typeof(string));
            dataTable.Columns.Add("Fullname", typeof(string));
            dataTable.Columns.Add("Lastname", typeof(string));
            dataTable.Columns.Add("Company", typeof(string));
            dataTable.Columns.Add("Profession", typeof(string));
            dataTable.Columns.Add("PasswordHash", typeof(string));

            dataTable.Rows.Add(
                user.UserRole,
                user.Username,
                user.NormalizedUsername,
                user.Email,
                user.NormalizedEmail,
                user.Fullname,
                user.Lastname,
                user.Company,
                user.Profession,
                user.PasswordHash
                );

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync(cancellationToken);

                await connection.ExecuteAsync("Account_Insert",
                    new { Account = dataTable.AsTableValuedParameter("dbo.AccountType")},
                    commandType: CommandType.StoredProcedure);
            }

            return IdentityResult.Success;
        }
        public async Task<ApplicationUserIdentity> GetByUsernameAsync(string normalizedUsername, CancellationToken cancellationToken)
        {
            cancellationToken.ThrowIfCancellationRequested();

            ApplicationUserIdentity applicationUser;

            using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
            {
                await connection.OpenAsync(cancellationToken);

                applicationUser = await connection.QuerySingleOrDefaultAsync<ApplicationUserIdentity>(
                    "Account_GetByUsername", new { NormalizedUsername = normalizedUsername },
                    commandType: CommandType.StoredProcedure);
            }

            return applicationUser;
        }

        public async Task<ApplicationUserUpdate> UpdateUserAsync(ApplicationUserUpdate applicationUserUpdate, int applicationUserId)
        {

            var dataTable = new DataTable();
            dataTable.Columns.Add("Fullname", typeof(string));
            dataTable.Columns.Add("Lastname", typeof(string));
            dataTable.Columns.Add("Company", typeof(string));
            dataTable.Columns.Add("Profession", typeof(string));

            dataTable.Rows.Add(applicationUserUpdate.Fullname, applicationUserUpdate.Lastname, applicationUserUpdate.Company, applicationUserUpdate.Profession);

            ApplicationUserUpdate newApplicationUserUpdateDTO;

            try
            {
                using (var connection = new SqlConnection(_config.GetConnectionString("DefaultConnection")))
                {
                    await connection.OpenAsync();

                    newApplicationUserUpdateDTO = await connection.ExecuteScalarAsync<ApplicationUserUpdate>(
                        "Account_Update",
                        new
                        {
                            ApplicationUser = dataTable.AsTableValuedParameter("dbo.AccountTypeUpdate"),
                            ApplicationUserId = applicationUserId
                        }, commandType: CommandType.StoredProcedure
                        );
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

         

            return newApplicationUserUpdateDTO;

        }
    }

}
