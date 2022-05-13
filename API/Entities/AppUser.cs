using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace API.Entities
{
    public class AppUser
    {
        [Key]
        public int AppUserId { get; set; }

        [Column(TypeName = "nvarchar(256)")]
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [Column(TypeName = "nvarchar(30)")]
        public string FirstName { get; set; }

        [Column(TypeName = "nvarchar(40)")]
        public string LastName { get; set; }

        [Column(TypeName = "varchar(12)")]
        public string AppUserType { get; set; }

        public bool IsActive { get; set; } = true;

        [Column(TypeName = "nvarchar(60)")]
        public string CoLocation { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string StLocation { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string CiLocation { get; set; }

        [Column(TypeName = "varchar(12)")]
        public string ClassYear { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string Category { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string Major { get; set; }

        // [Column(TypeName = "nvarchar(60)")]
        // public string PosCategory { get; set; }

        // [Column(TypeName = "nvarchar(60)")]
        // public string PosName { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string College { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        public string EmpName { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string EmpIndustry { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string EmployeeNum { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string RegisterCode { get; set; }
        public string LogoUrl { get; set; }
        public bool IsMainLogo { get; set; } = true;
        public DateTime Created { get; set; } = DateTime.Now;
        public DateTime LastActive { get; set; } = DateTime.Now;
        public ICollection<Photo> Photos { get; set; }
        public ICollection<PhotoHr> PhotoHrs { get; set; }
        public ICollection<StudInfo> StudInfos { get; set; }
        public ICollection<EmpInfo> EmpInfos { get; set; }
        public ICollection<Position> Positions { get; set; }
        // public ICollection<DutyBullet> DutyBullets { get; set; }
        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }
    }
}