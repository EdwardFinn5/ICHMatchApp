using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class RegisterCode
    {
        [DatabaseGenerated(DatabaseGeneratedOption.None)]
        public int RegisterCodeId { get; set; } = 1;
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeName1 { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeName2 { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeName3 { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeName4 { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeName5 { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeName6 { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeName7 { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeNameStud { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeNameAdmin { get; set; }
        [Column(TypeName = "varchar(10)")]
        public string RegisterCodeNameOwner { get; set; }

        public bool IsActive { get; set; } = true;
    }
}