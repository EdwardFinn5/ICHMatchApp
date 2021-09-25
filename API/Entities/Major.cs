using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Major
    {
        [Key]
        public int MajorId { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string MajorName { get; set; }
    }
}