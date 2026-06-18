using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Application.DTOs
{
    public class CourseDto
    {
        public int Id { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}
