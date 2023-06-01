using FicusApp.Models;

namespace FicusApp.Services
{
    public interface IAutorizacionService
    {

        Task<AutorizacionResponse> DevolverToken(AutorizacionRequest autorizacion);
        Task<AutorizacionResponse> DevolverRefreshToken(RefreshTokenRequest refreshTokenRequest, int idUsuario);
    }
}
