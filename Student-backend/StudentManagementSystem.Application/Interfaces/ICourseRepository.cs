using StudentManagementSystem.Domain.Entities;
using System;
using System.Collections.Generic;
using System.Text;

namespace StudentManagementSystem.Application.Interfaces
{
    public interface ICourseRepository
    {
        Task<List<Course>> GetAllAsync();
        Task<Course?> GetByIdAsync(int id);
        Task<Course> AddAsync(Course course);
        Task<Course?> UpdateAsync(int id, Course course);
        Task<bool> DeleteAsync(int id);
    }
}
