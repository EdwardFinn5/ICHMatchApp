using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;

namespace API.Interfaces
{
    public interface ICollegeRepository
    {
        void Update(College college);
        // Task<bool> SaveAllAsync();
        Task<IEnumerable<CollegeDto>> GetCollegesAsync();
        Task<College> GetCollegeByIdAsync(int id);
        Task<CollegeDto> GetCollegeDtoByIdAsync(int id);
        void DeleteCollege(College college);
        Task<bool> Complete();

    }
}