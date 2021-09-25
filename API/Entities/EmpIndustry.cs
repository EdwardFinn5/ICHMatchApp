using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class EmpIndustry
    {
        [Key]
        public int EmpIndustryId { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string EmpIndustryName { get; set; }
    }
}