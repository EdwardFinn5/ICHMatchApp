using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.Helpers
{
    public class MessageParams : PaginationParams
    {
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string AppUserType { get; set; }
        public string Container { get; set; } = "Unread";
    }
}