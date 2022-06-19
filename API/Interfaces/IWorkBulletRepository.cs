using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IWorkBulletRepository
    {
        void Update(WorkBullet workBullet);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<WorkBulletDto>> GetWorkBulletDtosByStudInfoIdAsync(int id);
        Task<WorkBulletDto> GetWorkBulletDtoByIdAsync(int id);
        Task<WorkBullet> GetWorkBulletByIdAsync(int id);
        void DeleteWorkBullet(WorkBullet workBullet);
        Task<bool> Complete();
    }
}