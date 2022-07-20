using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class Photo
    {
        public int Id { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string StudentUrl { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string LogoUrl { get; set; }
        [Column(TypeName = "varchar(250)")]
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMain { get; set; } = false;
        public bool IsMainLogo { get; set; } = false;
        [Column(TypeName = "varchar(100)")]
        public string PublicId { get; set; }
        public virtual AppUser AppUser { get; set; }
        public int AppUserId { get; set; }
    }
}