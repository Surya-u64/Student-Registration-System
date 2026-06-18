using StudentManagementSystem.Domain.Entities;

namespace StudentManagementSystem.Application.Interfaces;

public interface ICourseService
{
    Task<List<Course>> GetAllAsync();
    Task<Course?> GetByIdAsync(int id);
    Task<Course> AddAsync(Course course);
    Task<Course?> UpdateAsync(int id, Course course);
    Task<bool> DeleteAsync(int id);
}