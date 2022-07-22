using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ISkillsBulletRepository
    {
        void Update(SkillsBullet skillsBullet);
        // Task<bool> SaveAllAsync();
        // Task<IEnumerable<DutyBulletDto>> GetDutyBulletDtosByAppUserIdAsync(int id);
        Task<IEnumerable<SkillsBulletDto>> GetSkillsBulletDtosByPositionIdAsync(int id);
        Task<SkillsBulletDto> GetSkillsBulletDtoByIdAsync(int id);
        Task<SkillsBullet> GetSkillsBulletByIdAsync(int id);
        void DeleteSkillsBullet(SkillsBullet skillsBullet);
        Task<bool> Complete();
    }
}