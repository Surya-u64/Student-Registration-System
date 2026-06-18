using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Application.Features.Students.Commands
{
    public class CreateStudentCommand
    {
        public string Name { get; set; } = string.Empty;

        public string Email { get; set; } = string.Empty;

        public string Department { get; set; } = string.Empty;

        public List<int> CourseIds { get; set; } = new();
    }
}
