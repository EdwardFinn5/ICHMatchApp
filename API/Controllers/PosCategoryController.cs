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
        private readonly IMapper _mapper;
        private readonly IUnitOfWork _unitOfWork;
        public PosCategoryController(DataContext context, IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
            _context = context;
        }

        [HttpPost]
        public async Task<ActionResult<PosCategoryDto>> AddPosCategory(PosCategoryDto posCategoryDto)
        {
            if (await PosCategoryExists(posCategoryDto.PosCategoryName)) return BadRequest("Position category is already in place");

            var posCategory = new PosCategory
            {
                // CategoryId = categoryDto.CategoryId,
                PosCategoryName = posCategoryDto.PosCategoryName
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
            var posCategories = await _unitOfWork.PosCategoryRepository.GetPosCategoriesAsync();

            return Ok(posCategories);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PosCategoryDto>> GetPosCategoryById(int id)
        {
            return await _unitOfWork.PosCategoryRepository.GetPosCategoryDtoByIdAsync(id);
        }

        [HttpGet("GetPosCategoryById/{id}")] //this is the one I just added
        public async Task<ActionResult<PosCategory>> GetPosCategoryByIdAsync(int id)
        {
            return await _unitOfWork.PosCategoryRepository.GetPosCategoryByIdAsync(id);
        }


        [HttpPut("{id}")]
        public async Task<ActionResult> UpdatePosCategory(PosCategoryUpdateDto posCategoryUpdateDto, int id)
        {
            var posCategory = await _unitOfWork.PosCategoryRepository.GetPosCategoryByIdAsync(id);

            _mapper.Map(posCategoryUpdateDto, posCategory);

            _unitOfWork.PosCategoryRepository.Update(posCategory);

            if (await _unitOfWork.Complete()) return NoContent();

            return BadRequest("Failed to update position category");
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePosCategory(int id)
        {
            var posCategory = await _unitOfWork.PosCategoryRepository.GetPosCategoryByIdAsync(id);

            _unitOfWork.PosCategoryRepository.DeletePosCategory(posCategory);

            if (await _unitOfWork.PosCategoryRepository.Complete()) return Ok();

            return BadRequest("Problem deleting this position category");

        }
        private async Task<bool> PosCategoryExists(string posCategoryName)
        {
            return await _context.PosCategories.AnyAsync(x => x.PosCategoryName == posCategoryName.ToLower());
        }
    }
}