using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class RegisterCodeDto
    {
        public int RegisterCodeId { get; set; }
        public string RegisterCodeName1 { get; set; }
        public string RegisterCodeName2 { get; set; }
        public string RegisterCodeName3 { get; set; }
        public string RegisterCodeName4 { get; set; }
        public string RegisterCodeName5 { get; set; }
        public string RegisterCodeName6 { get; set; }
        public string RegisterCodeName7 { get; set; }
        public string RegisterCodeNameStud { get; set; }
        public string RegisterCodeNameAdmin { get; set; }
        public string RegisterCodeNameOwner { get; set; }
        public bool IsActive { get; set; } = true;
    }
}