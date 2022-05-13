using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class ProfileAdviceDto
    {
        public int ProfileAdviceId { get; set; }
        public string ProfileAdviceTitle { get; set; }
        public string ProfileAdviceContent { get; set; }
        public float Order { get; set; }
        public bool IsActive { get; set; }
    }
}