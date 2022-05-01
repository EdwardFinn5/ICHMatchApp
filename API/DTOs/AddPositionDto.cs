using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class AddPositionDto
    {
        public int PositionId { get; set; }
        public string RegisterCode { get; set; }
        public string PosName { get; set; }
        public string PosCategory { get; set; }
        public string PositionDescription { get; set; }
        public string LookingFor { get; set; }
        public string PositionBenefits { get; set; }
        public string PositionType { get; set; }
        public string PositionLocation { get; set; }
        public DateTime DateAdded { get; set; } = DateTime.Now;
        public DateTime StartDate { get; set; }
        public DateTime AppDeadline { get; set; }
        public bool Active { get; set; } = true;
        public string HrContact { get; set; }
        public string HrContactTitle { get; set; }
        public string HowToApply { get; set; }
        public string ApplyEmail { get; set; }
        public string ApplyLink { get; set; }
        public int AppUserId { get; set; }
    }
}