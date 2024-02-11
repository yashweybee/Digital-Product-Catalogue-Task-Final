using Digital_Product_Catalogue.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Digital_Product_Catalogue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class LoginController : ControllerBase
    {
        public IConfiguration _config { get; }
        public DigitalProductCatalogueContext _context { get; }

        public LoginController(IConfiguration configuration, DigitalProductCatalogueContext context)
        {
            _config = configuration;
            _context = context;
        }



        private User AuthenticateUser(User user)
        {
            User _user = null;
            var _userDb = _context.Users.FirstOrDefault(u => u.UserName == user.UserName);
            if (_userDb.Password == user.Password)
            {
                _user = _userDb;
            }
            return _user;
        }

        private string GenerateTockens(User user)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_config["Jwt:key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var token = new JwtSecurityToken(_config["Jwt:Issuer"], _config["Jwt:Audience"], null,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        [AllowAnonymous]
        [HttpPost]
        public IActionResult Login(User user)
        {
            IActionResult response = Unauthorized();
            var _user = AuthenticateUser(user);
            if (_user != null)
            {
                var token = GenerateTockens(_user);
                response = Ok(new { token = token, user = _user });
            }
            return response;
        }

        [AllowAnonymous]
        [HttpPost("Register")]
        public async Task<IActionResult> Register(User user)
        {
            var _useres = _context.Users.Any(u => u.UserName == user.UserName);
            if (!_useres)
            {
                _context.Add(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            return BadRequest();
        }

    }
}
