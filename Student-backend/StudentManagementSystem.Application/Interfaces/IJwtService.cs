using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Application.Interfaces
{
    public interface IJwtService
    {
        string GenerateToken(string username, string role);
    }
}
