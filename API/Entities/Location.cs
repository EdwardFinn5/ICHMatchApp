using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Location
    {
        [Key]
        public int LocationId { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string LocationName { get; set; }
    }
}