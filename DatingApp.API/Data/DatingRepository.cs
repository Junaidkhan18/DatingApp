using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingApp.API.Models;
using DatingApp.API.Models.Data;
using Microsoft.EntityFrameworkCore;

namespace DatingApp.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;

        }
        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Photo> GetMainPhotoForUser(int userId)
        {
            return await _context.photos.Where(u => u.UserId == userId).FirstOrDefaultAsync(p => p.IsMain);

        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.photos.FirstOrDefaultAsync(p => p.Id == id);

            return photo;
        }

        public Task<User> GetUser(int id)
        {
            var user =_context.Users.Include(p => p.photos).FirstOrDefaultAsync(u => u.Id == id);
            
            return user;
        }

        public Task GetUser()
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users =await _context.Users.Include(p =>p.photos).ToListAsync();

            return users;
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0;
        }
    }
}