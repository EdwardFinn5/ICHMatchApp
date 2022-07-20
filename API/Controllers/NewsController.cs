using API.DTOs;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class NewsController : BaseApiController
    {
        private readonly INewsRepository _newsRepository;
        private readonly IMapper _mapper;
        private readonly DataContext _context;
        private readonly IPhotoService _photoService;
        public NewsController(INewsRepository newsRepository, IMapper mapper, DataContext context, IPhotoService photoService)
        {
            _context = context;
            _mapper = mapper;
            _newsRepository = newsRepository;
            _photoService = photoService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<NewsDto>>> GetNewes()
        {
            var newes = await _newsRepository.GetNewsDtosAsync();

            return Ok(newes);
        }

        [HttpGet("GetNewsById/{id}")] //this is the one I just added
        public async Task<ActionResult<News>> GetNewsByIdAsync(int id)
        {
            return await _newsRepository.GetNewsByIdAsync(id);
        }

        [HttpGet("GetNewsDtoById/{id}")] //this is the one I just added
        public async Task<ActionResult<NewsDto>> GetNewsDtoById(int id)
        {
            return await _newsRepository.GetNewsDtoByIdAsync(id);
        }

        [HttpPost]
        public async Task<ActionResult<NewsDto>> AddNews(AddNewsDto addNewsDto)
        {
            var news = new News
            {
                // DutyBulletId = addDutyBulletDto.DutyBulletId,
                NewsTitle = addNewsDto.NewsTitle,
                NewsContent = addNewsDto.NewsContent,
                Order = addNewsDto.Order,
                IsActive = addNewsDto.IsActive
            };

            _context.Newses.Add(news);
            await _context.SaveChangesAsync();

            return new NewsDto
            {
                NewsId = news.NewsId,
                NewsTitle = news.NewsTitle,
                NewsContent = news.NewsContent,
                Order = addNewsDto.Order,
                IsActive = addNewsDto.IsActive
            };
        }

        // [HttpPost("add-news-photo/{newsId}")]
        // public async Task<ActionResult<PhotoNewsDto>> AddNewsPhoto(IFormFile file, int newsId)
        // {
        //     var news = await _newsRepository.GetNewsByIdAsync(newsId);

        //     var result = await _photoService.AddPhotoAsync(file);

        //     if (result.Error != null) return BadRequest(result.Error.Message);

        //     var photoNews = new PhotoNews
        //     {
        //         NewsUrl = null

        //     };

        //     photoNews.NewsUrl = result.SecureUrl.AbsoluteUri;
        //     photoNews.PublicId = result.PublicId;

        //     if (news.PhotoNewes.Count == 0)
        //     {
        //         photoNews.IsMainNews = true;
        //     }

        //     news.PhotoNewes.Add(photoNews);

        //     await _context.SaveChangesAsync();

        //     if (await _newsRepository.SaveAllAsync())

        //         return BadRequest("Problem adding photo");

        //     return Ok();

        // }

        //     [HttpPut("set-main-hr-photo/{photoId}/{newsId}")]
        //     public async Task<ActionResult> SetMainHrPhoto(int photoId)
        //     {
        //         var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        //         var photo = user.PhotoHrs.FirstOrDefault(x => x.Id == photoId);

        //         if (photo.IsMainHr) return BadRequest("This is already your main photo");

        //         var currentMainHr = user.PhotoHrs.FirstOrDefault(x => x.IsMainHr);

        //         if (currentMainHr != null)
        //         {
        //             currentMainHr.IsMainHr = false;
        //             photo.IsMainHr = true;
        //         }

        //         if (await _userRepository.SaveAllAsync()) return NoContent();

        //         return BadRequest("Failed to set main image");
        //     }

        //     [HttpDelete("delete-photo-hr/{photoId}")]
        //     public async Task<ActionResult> DeletePhotoHr(int photoId)
        //     {
        //         var user = await _userRepository.GetUserByUsernameAsync(User.GetUsername());

        //         var photo = user.PhotoHrs.FirstOrDefault(x => x.Id == photoId);

        //         if (photo == null)
        //         {
        //             return NotFound();
        //         }

        //         if (photo.IsMainHr)
        //         {
        //             return BadRequest("You cannot delete your main contact photo");
        //         }

        //         if (photo.PublicId != null)
        //         {
        //             var result = await _photoService.DeletePhotoAsync(photo.PublicId);

        //             if (result.Error != null)
        //             {
        //                 return BadRequest(result.Error.Message);
        //             }
        //         }

        //         user.PhotoHrs.Remove(photo);

        //         if (await _userRepository.SaveAllAsync()) return Ok();

        //         return BadRequest("Failed to delete the contact photo");
        //     }
        // }




        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteNews(int id)
        {
            var news = await _newsRepository.GetNewsByIdAsync(id);

            _newsRepository.DeleteNews(news);

            if (await _newsRepository.Complete()) return Ok();

            return BadRequest("Problem deleting this news item");

        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateNews(NewsUpdateDto newsUpdateDto, int id)
        {
            var news = await _newsRepository.GetNewsByIdAsync(id);

            _mapper.Map(newsUpdateDto, news);

            _newsRepository.Update(news);

            if (await _newsRepository.SaveAllAsync()) return NoContent();

            return BadRequest("Failed to update news item");
        }

    }
}

