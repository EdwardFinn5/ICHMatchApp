// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using API.DTOs;
// using API.Entities;
// using API.Interfaces;
// using AutoMapper;
// using AutoMapper.QueryableExtensions;
// using Microsoft.EntityFrameworkCore;

// namespace API.Data
// {
//     public class PositionRepository : IPositionRepository
//     {
//         private readonly DataContext _context;
//         private readonly IMapper _mapper;
//         public PositionRepository(DataContext context, IMapper mapper)
//         {
//             _mapper = mapper;
//             _context = context;
//         }

//         public async Task<bool> Complete()
//         {
//             return await _context.SaveChangesAsync() > 0;
//         }

//         public void DeletePosition(Position position)
//         {
//             _context.Positions.Remove(position);
//         }


//         public async Task<Position> GetPositionByIdAsync(int id)
//         {
//             return await _context.Positions
//                  .Where(x => x.PositionId == id)

//                  .SingleOrDefaultAsync();
//         }

//         public Task<PositionDto> GetPositionDtoAsync(int id)
//         {
//             throw new NotImplementedException();
//         }

//         public async Task<IEnumerable<PositionDto>> GetPositionDtosAsync(int id)
//         {
//             return await _context.Positions
//                   .Where(x => x.AppUserId == id)
//                   .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
//                   .ToListAsync();
//         }

//         public async Task<IEnumerable<PositionDto>> GetPositionDtosAsync()
//         {
//             return await _context.Positions
//             .ProjectTo<PositionDto>(_mapper.ConfigurationProvider)
//             .ToListAsync();
//         }

//         public async Task<IEnumerable<Position>> GetPositionsAsync()
//         {
//             return await _context.Positions
//                  .Include(a => a.AppUser)
//                  .ThenInclude(a => a.EmpInfos)
//                  .ToListAsync();
//         }

//         public async Task<Position> GetPositionByPositionIdAsync(int id)
//         {
//             return await _context.Positions
//                 .Where(x => x.PositionId == id)
//                 .SingleOrDefaultAsync();
//         }

//         public async Task<bool> SaveAllAsync()
//         {
//             return await _context.SaveChangesAsync() > 0;
//         }

//         public void Update(Position position)
//         {
//             _context.Entry(position).State = EntityState.Modified;
//         }


//     }
// }