namespace API.DTOs
{
    public class UserDto
    {
        public int AppUserId { get; set; }
        public string Username { get; set; }
        public string FirstName { get; set; }
        public string Major { get; set; }
        public string Location { get; set; }
        public string ClassYear { get; set; }
        public string Position { get; set; }
        public string PositionType { get; set; }
        public string PositionLocation { get; set; }

        public string RegisterCode { get; set; }
        public string Token { get; set; }
        public string AppUserType { get; set; }
        public string StudentUrl { get; set; }
        public string LogoUrl { get; set; }
        public string HrUrl { get; set; }
        public string EmpName { get; set; }
    }
}