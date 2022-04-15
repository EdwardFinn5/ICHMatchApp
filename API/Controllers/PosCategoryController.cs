using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class PosCategoryController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly IPosCategoryRepository _posCategoryRepository;
        private readonly IMapper _mapper;
        public PosCategoryController(DataContext context, IPosCategoryRepository posCategoryRepository, IMapper mapper)
        {
            _mapper = mapper;
            _posCategoryRepository = posCategoryRepository;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<PosCategoryDto>> AddPosCategory(PosCategoryDto posCategoryDto)
        {
            if (await PosCategoryExists(posCategoryDto.PosCategoryName)) return BadRequest("Position category is already in place");

            var posCategory = new PosCategory
            {
                // CategoryId = categoryDto.CategoryId,
                PosCategoryName = posCategoryDto.PosCategoryName.ToLower(),
            };

            _context.PosCategories.Add(posCategory);
            await _context.SaveChangesAsync();

            return new PosCategoryDto
            {
                PosCategoryId = posCategory.PosCategoryId,
                PosCategoryName = posCategory.PosCategoryName
            };
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<PosCategoryDto>>> GetPosCategories()
        {
            var posCategories = await _posCategoryRepository.GetPosCategoriesAsync();

            return Ok(posCategories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PosCategoryDto>> GetPosCategoryById(int id)
        {
            return await _posCategoryRepository.GetPosCategoryDtoByIdAsync(id);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePosCategory(PosCategoryUpdateDto posCategoryUpdateDto, int id)
        {
            var posCategory = await _posCategoryRepository.GetPosCategoryByIdAsync(id);

            _mapper.Map(posCategoryUpdateDto, posCategory);

            _posCategoryRepository.Update(posCategory);

            if (await _posCategoryRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update position category");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePosCategory(int id)
        {
            var posCategory = await _posCategoryRepository.GetPosCategoryByIdAsync(id);

            _posCategoryRepository.DeletePosCategory(posCategory);

            if (await _posCategoryRepository.Complete()) return Ok();

            return BadRequest("Problem deleting this position category");

        }
        private async Task<bool> PosCategoryExists(string posCategoryName)
        {
            return await _context.PosCategories.AnyAsync(x => x.PosCategoryName == posCategoryName.ToLower());
        }
    }
}