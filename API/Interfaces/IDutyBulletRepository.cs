using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IDutyBulletRepository
    {
        void Update(DutyBullet dutyBullet);
        Task<bool> SaveAllAsync();
        // Task<IEnumerable<DutyBulletDto>> GetDutyBulletDtosByAppUserIdAsync(int id);
        Task<IEnumerable<DutyBulletDto>> GetDutyBulletDtosByPositionIdAsync(int id);
        Task<DutyBulletDto> GetDutyBulletDtoByIdAsync(int id);
        Task<DutyBullet> GetDutyBulletByIdAsync(int id);
        void DeleteDutyBullet(DutyBullet dutyBullet);
        Task<bool> Complete();
    }
}