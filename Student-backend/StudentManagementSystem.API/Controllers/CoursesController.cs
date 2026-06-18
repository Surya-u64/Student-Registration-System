using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using StudentManagementSystem.Application.Interfaces;
using StudentManagementSystem.Domain.Entities;

namespace StudentManagementSystem.API.Controllers;

[AllowAnonymous]
[Route("api/[controller]")]
[ApiController]
public class CoursesController : ControllerBase
{
    private readonly ICourseService _courseService;

    public CoursesController(ICourseService courseService)
    {
        _courseService = courseService;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _courseService.GetAllAsync());
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var course = await _courseService.GetByIdAsync(id);

        if (course == null)
            return NotFound();

        return Ok(course);
    }

    [HttpPost]
    public async Task<IActionResult> Create(Course course)
    {
        var result = await _courseService.AddAsync(course);

        return Ok(result);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, Course course)
    {
        var result = await _courseService.UpdateAsync(id, course);

        if (result == null)
            return NotFound();

        return Ok(result);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _courseService.DeleteAsync(id);

        if (!result)
            return NotFound();

        return Ok("Course Deleted");
    }
}