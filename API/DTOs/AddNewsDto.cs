using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddNewsDto
    {
        public int NewsId { get; set; }
        public string NewsTitle { get; set; }
        public string NewsContent { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; }
        public ICollection<PhotoNews> PhotoNewes { get; set; }
    }
}