using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberUpdateDto
    {

        public string CiLocation { get; set; }
        public string CiempLocation { get; set; }
        public string StLocation { get; set; }
        public string StempLocation { get; set; }
        public string CoLocation { get; set; }
        public string ClassYear { get; set; }
        public bool IsActive { get; set; }
        public string Category { get; set; }
        public string Major { get; set; }
        public string PosCategory { get; set; }
        public string PosName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string HrContactTitle { get; set; }
        public string College { get; set; }
        public string RegisterCode { get; set; }
        public string IcfNote { get; set; }
        public string EmpName { get; set; }
        public string EmpIndustry { get; set; }
        public string EmployeeNum { get; set; }
    }
}