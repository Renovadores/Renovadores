using FicusApp.Models;

namespace FicusApp.Services
{
    public class UserService : IUserService
    {
        private readonly FicusContext _context;
        public UserService(FicusContext context)
        {
            _context = context;
        }

        public Usuario GetUser(int id)
        {
            Usuario usuario = _context.Usuario.Find(id);
            return usuario;
        }

        public List<Usuario> GetUsers()
        {
            List<Usuario> usuarios = _context.Usuario.ToList();
            return usuarios;
        }
    }
}
