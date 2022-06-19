using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IAcBulletRepository
    {
        void Update(AcBullet acBullet);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<AcBulletDto>> GetAcBulletDtosByStudInfoIdAsync(int id);
        Task<AcBulletDto> GetAcBulletDtoByIdAsync(int id);
        Task<AcBullet> GetAcBulletByIdAsync(int id);
        void DeleteAcBullet(AcBullet acBullet);
        Task<bool> Complete();
    }
}