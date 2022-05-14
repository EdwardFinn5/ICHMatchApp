using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class PhotoLogo
    {
        public int Id { get; set; }
        public string LogoHrUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainLogoHr { get; set; } = false;
        public string PublicId { get; set; }
        public virtual Position Position { get; set; }
        public int PositionId { get; set; }
    }
}