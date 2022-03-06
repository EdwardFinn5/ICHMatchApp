using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class MessageDto
    {
        public int Id { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; }
        public string SenderFirstName { get; set; }
        public string SenderCollege { get; set; }
        public string SenderAppUserType { get; set; }
        public string StudentSenderUrl { get; set; }
        public string SenderCompany { get; set; }

        public string CompanySenderUrl { get; set; }
        public int RecipientId { get; set; }
        public string RecipientUsername { get; set; }
        public string RecipientFirstName { get; set; }
        public string RecipientCollege { get; set; }
        public string RecipientCompany { get; set; }
        public string RecipientAppUserType { get; set; }

        public string StudentRecipientUrl { get; set; }
        public string CompanyRecipientUrl { get; set; }
        public string Content { get; set; }
        public DateTime? DateRead { get; set; }
        public DateTime MessageSent { get; set; }

        // [JsonIgnore]
        // public bool SenderDeleted { get; set; }

        // [JsonIgnore]
        // public bool RecipientDeleted { get; set; }
    }
}