using Microsoft.AspNetCore.Mvc;
using FicusApp.Models;

namespace FicusApp.Services
{
    public interface IUserService
    {
        List<Usuario> GetUsers();
        Usuario GetUser(int username);
    }
}
