using Microsoft.EntityFrameworkCore;
using StudentManagementSystem.Application.Interfaces;
using StudentManagementSystem.Domain.Entities;
using StudentManagementSystem.Infrastructure.Persistence;

namespace StudentManagementSystem.Infrastructure.Repositories;

public class StudentRepository : IStudentRepository
{
    private readonly AppDbContext _context;

    public StudentRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<Student>> GetAllAsync()
    {
        return await _context.Students
            .Include( s=>s.Courses)
            .ToListAsync();
    }

    public async Task<Student?> GetByIdAsync(int id)
    {
        return await _context.Students
            .Include(s => s.Courses)
            .FirstOrDefaultAsync(s => s.Id == id);
    }

    public async Task<Student> AddAsync(Student student)
    {
        _context.Students.Add(student);
        await _context.SaveChangesAsync();
        return student;
    }

    public async Task<Student?> UpdateAsync(int id, Student student)
    {
        var existingStudent = await _context.Students
         .Include(s => s.Courses)
         .FirstOrDefaultAsync(s => s.Id == id);

        if (existingStudent == null)
            return null;

        existingStudent.Name = student.Name;
        existingStudent.Email = student.Email;
        existingStudent.Department = student.Department;
        existingStudent.Courses = student.Courses;


        await _context.SaveChangesAsync();

        return existingStudent;
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var student = await _context.Students.FindAsync(id);

        if (student == null)
            return false;

        _context.Students.Remove(student);
        await _context.SaveChangesAsync();

        return true;
    }
}