using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddCollegeDto
    {
        public int CollegeId { get; set; }
        public string CollegeName { get; set; }
        public string CollegeNickname { get; set; }
    }
}