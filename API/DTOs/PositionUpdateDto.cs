using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class PositionUpdateDto
    {
        // public string PositionIdentifier { get; set; }
        public string PosName { get; set; }
        public string PosCategory { get; set; }
        public string PositionDescription { get; set; }
        // public string LookingFor { get; set; }
        public string PositionBenefits { get; set; }
        public string PositionType { get; set; }
        public string SalaryRange { get; set; }
        public string CiempLocation { get; set; }
        public string StempLocation { get; set; }
        public bool IsActive { get; set; }
        public Nullable<DateTime> DateAdded { get; set; }
        public Nullable<DateTime> StartDate { get; set; }
        public Nullable<DateTime> AppDeadline { get; set; }
        // public string HrContact { get; set; }
        // public string HrContactTitle { get; set; }
        public string HowToApply { get; set; }
        public string ApplyEmail { get; set; }
        public string ApplyLink { get; set; }
        public string UniqueTitle { get; set; }
        public string UniqueContent { get; set; }
    }
}