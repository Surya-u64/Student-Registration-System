using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Domain.Entities
{
    public class Course
    {
        public int Id { get; set; }
        public string CourseName { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public ICollection<Student> Students { get; set; }
           = new List<Student>();
    }
}
