using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPosition2Repository
    {
        void Update(Position position);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<PositionDto>> GetPositionDtosAsync(int id);
        Task<IEnumerable<PositionDto>> GetPositionDtosAsync();
        Task<Position> GetPositionByIdAsync(int id);
        void DeletePosition(Position position);
        Task<bool> Complete();
    }
}