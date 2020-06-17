using System.Linq;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DatingApp.API.Models.Data
{
    public class Seed
    {
        public static void SeedUsers(DataContext context)
        {
            if(!context.Users.Any())
            {
                var userDate = System.IO.File.ReadAllText("Data/UserSeedData.json");
                var users = JsonConvert.DeserializeObject<List<User>>(userDate);
                foreach (var user in users)
                {
                    byte[] passwordhash, PasswordSalt;
                    CreatePasswordHash("password", out passwordhash, out PasswordSalt);
                    user.PasswordHash = passwordhash;
                    user.PasswordSalt = PasswordSalt;
                    user.Username = user.Username.ToLower();
                    context.Users.Add(user);
                }
                context.SaveChanges();
            }
        }
        private static void CreatePasswordHash(string password, out byte[] passwordHash, out byte[] passwordSalt)
        {
            using(var hmac=new System.Security.Cryptography.HMACSHA512())
            {
                passwordSalt=hmac.Key;
                passwordHash=hmac.ComputeHash(System.Text.Encoding.UTF8.GetBytes(password));
            }
        }
    }
}