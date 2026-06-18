using StudentManagementSystem.Application.Interfaces;
using StudentManagementSystem.Domain.Entities;

namespace StudentManagementSystem.Application.Services;

public class CourseService : ICourseService
{
    private readonly ICourseRepository _courseRepository;

    public CourseService(ICourseRepository courseRepository)
    {
        _courseRepository = courseRepository;
    }

    public async Task<List<Course>> GetAllAsync()
    {
        return await _courseRepository.GetAllAsync();
    }

    public async Task<Course?> GetByIdAsync(int id)
    {
        return await _courseRepository.GetByIdAsync(id);
    }

    public async Task<Course> AddAsync(Course course)
    {
        return await _courseRepository.AddAsync(course);
    }

    public async Task<Course?> UpdateAsync(int id, Course course)
    {
        return await _courseRepository.UpdateAsync(id, course);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        return await _courseRepository.DeleteAsync(id);
    }
}