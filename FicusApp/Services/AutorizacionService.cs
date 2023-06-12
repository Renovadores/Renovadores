using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using FicusApp.Models;
using FicusApp.Models.Custom;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualBasic;
using System.Security.Cryptography;

namespace FicusApp.Services
{
    public class AutorizacionService : IAutorizacionService
    {
        private readonly FicusContext _context;
        private readonly IConfiguration _configuration;

        public AutorizacionService(FicusContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        private string GenerarToken(string idUsuario) {

            var key = _configuration.GetValue<string>("JwtSettings:key");
            var keyBytes = Encoding.ASCII.GetBytes(key);

            var claims = new ClaimsIdentity();
            claims.AddClaim(new Claim(ClaimTypes.NameIdentifier, idUsuario));

            var credencialesToken = new SigningCredentials(
                new SymmetricSecurityKey(keyBytes),
                SecurityAlgorithms.HmacSha256Signature
                );

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = claims,
                Expires = DateTime.UtcNow.AddMinutes(1),
                SigningCredentials = credencialesToken
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenConfig = tokenHandler.CreateToken(tokenDescriptor);

            string tokenCreado = tokenHandler.WriteToken(tokenConfig);

            return tokenCreado;
        
        
        }

        private string GenerarRefreshToken() {

            var byteArray = new byte[64];
            var refreshToken = "";

            using (var rng = RandomNumberGenerator.Create()) {
                rng.GetBytes(byteArray);
                refreshToken = Convert.ToBase64String(byteArray);
            }
            return refreshToken;
        }

        private async Task<AutorizacionResponse> GuardarHistorialRefreshToken(
            int UsuarioId,
            string token,
            string refreshToken
            ) {
            // find user register
            var userRecord = _context.HistorialRefreshToken
                                               .Where(h => h.UsuarioId == UsuarioId).FirstOrDefault();
            if (userRecord != null)
            {
                userRecord.Token = token;
                userRecord.RefreshToken = refreshToken;
                userRecord.FechaCreacion = DateTime.UtcNow;
                userRecord.FechaExpiracion = DateTime.UtcNow.AddMinutes(2);
                _context.HistorialRefreshToken.Update(userRecord);
                await _context.SaveChangesAsync();
            }
            else
            {
                var historialRefreshToken = new HistorialRefreshToken
                {
                    UsuarioId = UsuarioId,
                    Token = token,
                    RefreshToken = refreshToken,
                    FechaCreacion = DateTime.UtcNow,
                    FechaExpiracion = DateTime.UtcNow.AddMinutes(2)
                };
                await _context.HistorialRefreshToken.AddAsync(historialRefreshToken);
                await _context.SaveChangesAsync();
            }

            return new AutorizacionResponse { Token = token, RefreshToken = refreshToken, UsuarioId = UsuarioId, Resultado = true, Msg = "Ok" };
        }


        public async Task<AutorizacionResponse> DevolverToken(AutorizacionRequest autorizacion)
        {
            var usuario_encontrado = _context.Usuario.FirstOrDefault(x =>
                x.NombreUsuario == autorizacion.NombreUsuario &&
                x.Contrasena == autorizacion.Contrasena
            );

            if (usuario_encontrado == null) { 
                return await Task.FromResult<AutorizacionResponse>(null);
            }


            string tokenCreado = GenerarToken(usuario_encontrado.UsuarioId.ToString());

            string refreshTokenCreado = GenerarRefreshToken();

            //return new AutorizacionResponse() { Token = tokenCreado, Resultado = true, Msg = "Ok" };

            return await GuardarHistorialRefreshToken(usuario_encontrado.UsuarioId, tokenCreado, refreshTokenCreado);


        }

        public  async Task<AutorizacionResponse> DevolverRefreshToken(RefreshTokenRequest refreshTokenRequest, int idUsuario)
        {
            var refreshTokenEncontrado = _context.HistorialRefreshToken.FirstOrDefault(x =>
            x.Token == refreshTokenRequest.TokenExpirado &&
            x.RefreshToken == refreshTokenRequest.RefreshToken &&
            x.UsuarioId == idUsuario);

            if (refreshTokenEncontrado == null)
                return new AutorizacionResponse { Resultado = false, Msg = "No existe refreshToken" };

            var refreshTokenCreado = GenerarRefreshToken();
            var tokenCreado = GenerarToken(idUsuario.ToString());

            return await GuardarHistorialRefreshToken(idUsuario, tokenCreado, refreshTokenCreado);

        }

        public async Task<bool> CloseSession(int UsuarioId)
        {
            var refreshTokenEncontrado = _context.HistorialRefreshToken.FirstOrDefault(x =>
            x.UsuarioId == UsuarioId);
            if (refreshTokenEncontrado != null)
            {
                refreshTokenEncontrado.FechaExpiracion = DateTime.UtcNow;
                _context.HistorialRefreshToken.Update(refreshTokenEncontrado);
                await _context.SaveChangesAsync();
            }
            return true;
        }
    }
}
