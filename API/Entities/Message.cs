using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        [Column(TypeName = "varchar(60)")]
        public string SenderUsername { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string SenderFirstName { get; set; }
        [Column(TypeName = "varchar(60)")]
        public string SenderCompany { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string SenderCollege { get; set; }
        [Column(TypeName = "varchar(15)")]
        public string SenderAppUserType { get; set; }
        public AppUser Sender { get; set; }
        public int RecipientId { get; set; }
        [Column(TypeName = "varchar(60)")]
        public string RecipientUsername { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string RecipientFirstName { get; set; }
        [Column(TypeName = "varchar(60)")]
        public string RecipientCompany { get; set; }
        [Column(TypeName = "varchar(30)")]
        public string RecipientCollege { get; set; }
        [Column(TypeName = "varchar(15)")]
        public string RecipientAppUserType { get; set; }

        public AppUser Recipient { get; set; }
        public string Content { get; set; }

        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.Now;
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}