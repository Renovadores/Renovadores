using FicusApp.Models.Custom;

namespace FicusApp.Services
{
    public interface IAutorizacionService
    {

        Task<AutorizacionResponse> DevolverToken(AutorizacionRequest autorizacion);
        Task<AutorizacionResponse> DevolverRefreshToken(RefreshTokenRequest refreshTokenRequest, int idUsuario);
        public Task<bool> CloseSession(int UsuarioId);
    }
}
