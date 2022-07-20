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

        [Column(TypeName = "varchar(60)")]
        public string UserName { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string FirstName { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string LastName { get; set; }

        [Column(TypeName = "varchar(75)")]
        public string HrContactTitle { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string AppUserType { get; set; }
        [Column(TypeName = "varchar(75)")]
        public string IcfNote { get; set; }

        public bool IsActive { get; set; } = true;

        [Column(TypeName = "varchar(50)")]
        public string CoLocation { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string StLocation { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string CiLocation { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string CiempLocation { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string StempLocation { get; set; }

        [Column(TypeName = "varchar(20)")]
        public string ClassYear { get; set; }

        [Column(TypeName = "varchar(50)")]
        public string Category { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string Major { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string College { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string EmpName { get; set; }

        [Column(TypeName = "varchar(60)")]
        public string EmpIndustry { get; set; }

        [Column(TypeName = "varchar(30)")]
        public string EmployeeNum { get; set; }

        [Column(TypeName = "varchar(15)")]
        public string RegisterCode { get; set; }

        public DateTime Created { get; set; } = DateTime.Now.Date;
        public DateTime LastActive { get; set; } = DateTime.Now.Date;
        public ICollection<Photo> Photos { get; set; }
        public ICollection<PhotoHr> PhotoHrs { get; set; }
        public ICollection<StudInfo> StudInfos { get; set; }
        public ICollection<EmpInfo> EmpInfos { get; set; }
        public ICollection<Position> Positions { get; set; }
        public ICollection<UserLike> LikedByUsers { get; set; }
        public ICollection<UserLike> LikedUsers { get; set; }
        public ICollection<Message> MessagesSent { get; set; }
        public ICollection<Message> MessagesReceived { get; set; }


    }
}