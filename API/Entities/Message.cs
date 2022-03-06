using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Entities
{
    public class Message
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderCompany { get; set; }
        public string SenderCollege { get; set; }

        public string SenderAppUserType { get; set; }

        public AppUser Sender { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientFirstName { get; set; }
        public string RecipientCompany { get; set; }
        public string RecipientCollege { get; set; }

        public string RecipientAppUserType { get; set; }

        public AppUser Recipient { get; set; }
        public string Content { get; set; }

        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.Now;
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }
    }
}