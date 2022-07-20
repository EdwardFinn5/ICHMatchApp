using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class EmpIndustry
    {
        [Key]
        public int EmpIndustryId { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string EmpIndustryName { get; set; }
    }
}