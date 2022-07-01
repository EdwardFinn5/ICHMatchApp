namespace API.DTOs
{
    public class PhotoNewsDto
    {
        public int Id { get; set; }
        public string NewsUrl { get; set; }
        public string Description { get; set; }
        public DateTime DateAdded { get; set; }
        public bool IsMainNews { get; set; } = true;
        public string PublicId { get; set; }

    }
}