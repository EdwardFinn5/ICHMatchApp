using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddMajorDto
    {
        public int MajorId { get; set; }
        public string MajorName { get; set; }
        public int CategoryId { get; set; }
    }
}