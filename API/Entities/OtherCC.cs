using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class OtherCC
    {
        [Key]
        public int OtherCCId { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string OtherCCName { get; set; }
        public int CoLocationId { get; set; }
    }
}