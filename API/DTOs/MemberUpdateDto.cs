using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MemberUpdateDto
    {
        public string Location { get; set; }
        public string ClassYear { get; set; }
        public string Category { get; set; }
        public string Major { get; set; }
        public string College { get; set; }
        public int GiftAmt { get; set; }
        public string RegisterCode { get; set; }
        public string EmpName { get; set; }
        public string EmpIndustry { get; set; }
        public string EmployeeNum { get; set; }
    }
}