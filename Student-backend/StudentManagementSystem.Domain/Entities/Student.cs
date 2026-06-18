using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Domain.Entities
{
    public class Student
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Department { get; set; } = string.Empty;
        public ICollection<Course> Courses { get; set; }
         = new List<Course>();
    }
}
