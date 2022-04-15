using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Major
    {
        [Key]
        public int MajorId { get; set; }

        [Column(TypeName = "nvarchar(100)")]
        public string MajorName { get; set; }

        public virtual Category Category { get; set; }

        public int CategoryId { get; set; }
    }
}