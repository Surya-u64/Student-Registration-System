using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Application.DTOs;
using StudentManagementSystem.Application.Interfaces;

namespace StudentManagementSystem.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly IJwtService _jwtService;

    public AuthController(IJwtService jwtService)
    {
        _jwtService = jwtService;
    }

    [HttpPost("login")]
    public IActionResult Login(LoginDto loginDto)
    {
        if (loginDto.Username == "admin" &&
            loginDto.Password == "admin123")
        {
            var token = _jwtService.GenerateToken("admin", "Admin");

            return Ok(new AuthResponseDto
            {
                Token = token
            });
        }

        return Unauthorized("Invalid Username or Password");
    }
}