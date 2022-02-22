using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IPosition2Repository
    {
        void Update(Position position);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<PositionDto>> GetPositionDtosAsync(int id);
        Task<PagedList<PositionDto>> GetPositionDtosAsync(UserParams userParams);
        Task<PositionDto> GetPositionDtoByIdAsync(int id);
        Task<Position> GetPositionByIdAsync(int id);
        void DeletePosition(Position position);
        Task<bool> Complete();
    }
}