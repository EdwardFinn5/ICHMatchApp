using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PhotoNews
    {
        public int Id { get; set; }
        public string NewsUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainNews { get; set; } = false;
        public string PublicId { get; set; }
        public virtual News News { get; set; }
        public int NewsId { get; set; }
    }
}