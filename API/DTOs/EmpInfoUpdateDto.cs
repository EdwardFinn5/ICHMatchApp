using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class EmpInfoUpdateDto
    {
        public int EmpInfoId { get; set; }
        public string EmpWebsite { get; set; }
        public string CompanyDescription { get; set; }
        public string WhyWork { get; set; }
        // public int AppUserId { get; set; }
    }
}