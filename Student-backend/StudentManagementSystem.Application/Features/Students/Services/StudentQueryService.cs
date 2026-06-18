using StudentManagementSystem.Application.DTOs;
using StudentManagementSystem.Application.Features.Students.Queries;
using StudentManagementSystem.Application.Interfaces;

namespace StudentManagementSystem.Application.Features.Students.Services;

public class StudentQueryService
{
    private readonly IStudentRepository _repository;

    public StudentQueryService(IStudentRepository repository)
    {
        _repository = repository;
    }

    public async Task<List<StudentDto>> GetStudentsAsync()
    {
        var students = await _repository.GetAllAsync();

        return students.Select(x => new StudentDto
        {
            Id = x.Id,
            Name = x.Name,
            Email = x.Email,
            Department = x.Department
        }).ToList();
    }

    public async Task<StudentDto?> GetStudentByIdAsync(GetStudentByIdQuery query)
    {
        var student = await _repository.GetByIdAsync(query.Id);

        if (student == null)
            return null;

        return new StudentDto
        {
            Id = student.Id,
            Name = student.Name,
            Email = student.Email,
            Department = student.Department
        };
    }
}