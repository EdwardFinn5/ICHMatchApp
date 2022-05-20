using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterCodeDto
    {
        public int RegisterCodeId { get; set; }
        public string RegisterCodeName { get; set; }
        public bool IsActive { get; set; } = true;
        public int AppUserId { get; set; }
    }
}