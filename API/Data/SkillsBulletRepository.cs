using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;

namespace API.Data
{
    public class SkillsBulletRepository : ISkillsBulletRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;
        public SkillsBulletRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }
        public async Task<bool> Complete()
        {
            return await _context.SaveChangesAsync() > 0;
        }

        public void DeleteSkillsBullet(SkillsBullet skillsBullet)
        {
            _context.SkillsBullets.Remove(skillsBullet);
        }

        public Task<SkillsBullet> GetSkillsBulletByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<SkillsBulletDto> GetSkillsBulletDtoByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<SkillsBulletDto>> GetSkillsBulletDtosByPositionIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<bool> SaveAllAsync()
        {
            throw new NotImplementedException();
        }

        public void Update(SkillsBullet skillsBullet)
        {
            throw new NotImplementedException();
        }
    }
}