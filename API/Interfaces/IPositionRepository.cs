using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface IPositionRepository
    {
        void Update(Position position);
        Task<bool> SaveAllAsync();
        Task<IEnumerable<Position>> GetPositionsAsync();
        Task<Position> GetPositionByIdAsync(int id);
        Task<Position> GetPositionByPositionIdAsync(int id);

        // Task<StudInfo> GetStudInfoByUsernameAsync(string username);

        // added the following two methods during video 97 on automapper queryable

        Task<IEnumerable<PositionDto>> GetPositionDtosAsync();
        Task<IEnumerable<PositionDto>> GetPositionDtosAsync(int id);
        // Task<CardMemberDto> GetMemberAsync(string username);
        Task<PositionDto> GetPositionDtoAsync(int id);
        void DeletePosition(Position position);
        Task<bool> Complete();
    }
}