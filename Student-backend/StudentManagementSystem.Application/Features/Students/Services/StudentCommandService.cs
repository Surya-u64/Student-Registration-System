using StudentManagementSystem.Application.Features.Students.Commands;
using StudentManagementSystem.Application.Interfaces;
using StudentManagementSystem.Domain.Entities;

namespace StudentManagementSystem.Application.Features.Students.Services;

public class StudentCommandService
{
    private readonly IStudentRepository _repository;
    

    public StudentCommandService(IStudentRepository repository)
    {
        _repository = repository;
        
    }

    public async Task<Student> CreateStudentAsync(CreateStudentCommand command)
    {
        var student = new Student
        {
            Name = command.Name,
            Email = command.Email,
            Department = command.Department,
            Courses = new List<Course>()
        };

        return await _repository.AddAsync(student);
    }

    public async Task<Student?> UpdateStudentAsync(UpdateStudentCommand command)
    {
        var student = new Student
        {
            Id = command.Id,
            Name = command.Name,
            Email = command.Email,
            Department = command.Department,
            Courses = new List<Course>()
        };

        return await _repository.UpdateAsync(command.Id, student);
    }

    public async Task<bool> DeleteStudentAsync(DeleteStudentCommand command)
    {
        return await _repository.DeleteAsync(command.Id);
    }
}