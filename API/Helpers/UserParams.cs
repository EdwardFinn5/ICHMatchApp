using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams : PaginationParams
    {
        public string LastName { get; set; }
        public string FirstName { get; set; }
        public string RegisterCode { get; set; }
        public string EmpName { get; set; }
        public string EmpIndustry { get; set; }
        public string Major { get; set; }
        public string Location { get; set; }
        public string ClassYear { get; set; }
        public string College { get; set; }
        public string PositionName { get; set; }
        public string PositionType { get; set; }
        public string PositionLocation { get; set; }
        public string OrderByMajor { get; set; }
        public string OrderByLocation { get; set; }
        public string OrderByCollege { get; set; }
        public string OrderByEmpIndustry { get; set; }
        public string OrderByRegisterCode { get; set; }
        public string OrderByEmpName { get; set; }
        public string OrderByPositionName { get; set; }
        public string OrderByPositionLocation { get; set; }


    }
}