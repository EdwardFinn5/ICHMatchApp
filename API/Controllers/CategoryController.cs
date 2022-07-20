using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]

    public class CategoryController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ICategoryRepository _categoryRepository;
        private readonly IMapper _mapper;
        public CategoryController(DataContext context, ICategoryRepository categoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<CategoryDto>> AddCategory(CategoryDto categoryDto)
        {
            if (await CategoryExists(categoryDto.CategoryName)) return BadRequest("Category is already in place");

            var category = new Category
            {
                // CategoryId = categoryDto.CategoryId,
                CategoryName = categoryDto.CategoryName
            };

            _context.Categories.Add(category);
            await _context.SaveChangesAsync();

            return new CategoryDto
            {
                CategoryId = category.CategoryId,
                CategoryName = category.CategoryName
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CategoryDto>>> GetCategories()
        {
            var categories = await _categoryRepository.GetCategoriesAsync();

            return Ok(categories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<CategoryDto>> GetCategoryById(int id)
        {
            return await _categoryRepository.GetCategoryDtoByIdAsync(id);
        }

        [HttpGet("GetCategoryById/{id}")] //this is the one I just added
        public async Task<ActionResult<Category>> GetCategoryByIdAsync(int id)
        {
            return await _categoryRepository.GetCategoryByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateCategory(CategoryUpdateDto categoryUpdateDto, int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);

            _mapper.Map(categoryUpdateDto, category);

            _categoryRepository.Update(category);

            if (await _categoryRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update category");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteCategory(int id)
        {
            var category = await _categoryRepository.GetCategoryByIdAsync(id);

            _categoryRepository.DeleteCategory(category);

            if (await _categoryRepository.Complete()) return Ok();

            return BadRequest("Problem deleting the position");

        }
        private async Task<bool> CategoryExists(string categoryname)
        {
            return await _context.Categories.AnyAsync(x => x.CategoryName == categoryname.ToLower());
        }
    }
}