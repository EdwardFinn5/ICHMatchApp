using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PhotoHrDto
    {
        public int Id { get; set; }
        public string HrUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainHr { get; set; } = false;
        public string PublicId { get; set; }
    }
}