using FicusApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using FicusApp.Models.Custom;
using FicusApp.Services;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace FicusApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsuarioController : ControllerBase
    {
        private readonly IAutorizacionService _autorizacionService;
        private readonly IUserService _userService;
        public UsuarioController(IAutorizacionService autorizacionService, IUserService userService)
        {
            _autorizacionService = autorizacionService;
            _userService = userService;
        }

        [HttpPost]
        [Route("Autenticar")]
        public async Task<IActionResult> Autenticar([FromBody] AutorizacionRequest autorizacion)
        {
            var resultado_autorizacion = await _autorizacionService.DevolverToken(autorizacion);
            if (resultado_autorizacion == null)
                return Unauthorized();

            return Ok(resultado_autorizacion);
        }


        [HttpPost]
        [Route("ObtenerRefreshToken")]
        public async Task<IActionResult> ObtenerRefreshToken([FromBody] RefreshTokenRequest request)
        {

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenExpiradoSupuestamente = tokenHandler.ReadJwtToken(request.TokenExpirado);

            if (tokenExpiradoSupuestamente.ValidTo > DateTime.UtcNow/*.AddSeconds(5)*/)
                // was: bad request
                return Ok(new AutorizacionResponse { Resultado = false, Msg = "Token no ha expirado" });

            string idUsuario = tokenExpiradoSupuestamente.Claims.First(x =>
                x.Type == JwtRegisteredClaimNames.NameId).Value.ToString();


            var autorizacionResponse = await _autorizacionService.DevolverRefreshToken(request, int.Parse(idUsuario));

            if (autorizacionResponse.Resultado)
                return Ok(autorizacionResponse);
            else
                return BadRequest(autorizacionResponse);
        }

        [Authorize]
        [HttpGet]
        [Route("GetUsers")]
        public async Task<IActionResult> GetUsers()
        {
            List<Usuario> users = _userService.GetUsers();
            return Ok(users);
        }

        [Authorize]
        [HttpGet]
        [Route("GetUser/{id}")]
        public async Task<IActionResult> GetUser(int id)
        {
            Usuario usuario = _userService.GetUser(id);
            return Ok(usuario);
        }

        // TO-DO: delete this method
        [HttpGet]
        [Route ("CloseSession/{id}")]
        public async Task<IActionResult> CloseSession(int id)
        {
            return Ok(await _autorizacionService.CloseSession(id));
        }
    }
}
