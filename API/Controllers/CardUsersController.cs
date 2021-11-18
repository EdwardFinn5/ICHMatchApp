using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class CardUsersController : BaseApiController
    {
        private readonly ICardUserRepository _cardUserRepository;
        private readonly IMapper _mapper;

        public CardUsersController(ICardUserRepository cardUserRepository, IMapper mapper)
        {
            _mapper = mapper;
            _cardUserRepository = cardUserRepository;

        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<CardMemberDto>>> GetUsers()
        {
            var users = await _cardUserRepository.GetMembersAsync();

            return Ok(users);

            // could also combine the above into: return Ok(await _userRepository.GetMembersAsync());
        }

        [HttpGet("{username}")]
        public async Task<ActionResult<CardMemberDto>> GetUser(string username)
        {
            return await _cardUserRepository.GetMemberAsync(username);

        }

        // [Route("users/{id:int}")]
        // [HttpGet("{id}")]
        // public async Task<ActionResult<CardMemberDto>> GetUserbyId(int id)
        // {
        //     return await _cardUserRepository.GetMemberIdAsync(id);

        // }
    }
}