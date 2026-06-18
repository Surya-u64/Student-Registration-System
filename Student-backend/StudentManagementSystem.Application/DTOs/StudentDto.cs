using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Application.DTOs
{
    public class StudentDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public int? CourseId { get; set; }
    }
}
