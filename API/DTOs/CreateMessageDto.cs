using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.DTOs
{
    public class CreateMessageDto
    {
        public string RecipientUsername { get; set; }
        public string RecipientFirstName { get; set; }
        public string RecipientCollege { get; set; }
        public string Content { get; set; }
    }
}