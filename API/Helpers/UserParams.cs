using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class UserParams
    {
        private const int MaxPageSize = 50;
        public int PageNumber { get; set; } = 1;
        private int _pageSize { get; set; } = 4;
        public int PageSize
        {
            get => _pageSize;
            set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
        }
        public string CurrentUsername { get; set; }
        public string AppUserType { get; set; }
        public string Major { get; set; }
        public string Location { get; set; }
        public string ClassYear { get; set; }
        public string Position { get; set; }
        public string PositionType { get; set; }
        public string PositionLocation { get; set; }
        public string OrderByLastActive { get; set; }
        public string OrderByMajor { get; set; }
        public string OrderByLocation { get; set; }


    }
}