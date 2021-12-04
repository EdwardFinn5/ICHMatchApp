using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddStudInfoDto
    {
        public int StudInfoId { get; set; }
        public string StudInfoName { get; set; }
        public string GPA { get; set; }
        public Nullable<DateTime> GradDate { get; set; }
        public string BestEmail { get; set; }
        public string BestPhone { get; set; }
        public string Athletics { get; set; }
        public string Arts { get; set; }
        public bool IsActive { get; set; }
        public string ExtraCurricular { get; set; }
        public string AcademicPlus { get; set; }
        public string WorkPlus { get; set; }
        public string DreamJob { get; set; }
        public int AppUserId { get; set; }


    }
}