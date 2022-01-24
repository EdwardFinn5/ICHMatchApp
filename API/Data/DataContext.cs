using API.Entities;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }
        public DbSet<AppUser> Users { get; set; }
        public DbSet<College> Colleges { get; set; }
        public DbSet<EmpIndustry> EmpIndustries { get; set; }
        public DbSet<EmpInfo> EmpInfos { get; set; }
        public DbSet<Location> Locations { get; set; }
        public DbSet<Major> Majors { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Photo> Photos { get; set; }
        public DbSet<Position> Positions { get; set; }
        public DbSet<StudInfo> StudInfos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // modelBuilder.Entity<Position>()
            //     .HasMany(e => e.Photos)
            //     .WithOne(e => e.Position)
            //     .OnDelete(DeleteBehavior.ClientCascade);

            // modelBuilder.Entity<AppUser>()
            //     .HasMany(ur => ur.UserRoles)
            //     .WithOne(u => u.User)
            //     .HasForeignKey(ur => ur.UserId)
            //     .IsRequired();

            // modelBuilder.Entity<AppRole>()
            //   .HasMany(ur => ur.UserRoles)
            //   .WithOne(u => u.Role)
            //   .HasForeignKey(ur => ur.RoleId)
            //   .IsRequired();

            // modelBuilder.Entity<CollegeMajor>()
            //     .HasKey(cm => new { cm.CollegeNum, cm.MajorId });

            // modelBuilder.Entity<CollegeMajor>()
            //     .HasOne(cm => cm.ColUser)
            //     .WithMany(c => c.CollegeMajors)
            //     .HasForeignKey(cm => cm.CollegeNum)
            //     .OnDelete(DeleteBehavior.Cascade);

            // modelBuilder.Entity<CollegeMajor>()
            //     .HasOne(cm => cm.Major)
            //     .WithMany(m => m.CollegeMajors)
            //     .HasForeignKey(cm => cm.MajorId)
            //     .OnDelete(DeleteBehavior.Cascade);

            // modelBuilder.Entity<Major>()
            //     .HasOne(m => m.MajorCat)
            //     .WithMany(mc => mc.Majors)
            //     .HasForeignKey(m => m.MajorCatId)
            //     .OnDelete(DeleteBehavior.Cascade);

            // modelBuilder.Entity<FactFeature>()
            //     .HasOne(ff => ff.ColUser)
            //     .WithMany(c => c.FactFeatures)
            //     .HasForeignKey(ff => ff.CollegeNum)
            //     .OnDelete(DeleteBehavior.Cascade);

            // modelBuilder.Entity<ColUserLike>()
            //     .HasKey(k => new { k.SourceColUserId, k.LikedColUserId });

            // modelBuilder.Entity<ColUserLike>()
            //     .HasOne(s => s.SourceColUser)
            //     .WithMany(l => l.LikedColUsers)
            //     .HasForeignKey(s => s.SourceColUserId)
            //     .OnDelete(DeleteBehavior.NoAction);

            // modelBuilder.Entity<ColUserLike>()
            //     .HasOne(s => s.LikedColUser)
            //     .WithMany(l => l.LikedByColUsers)
            //     .HasForeignKey(s => s.LikedColUserId)
            //     .OnDelete(DeleteBehavior.NoAction);

            // modelBuilder.Entity<Message>()
            //     .HasOne(u => u.Recipient)
            //     .WithMany(m => m.MessagesReceived)
            //     .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.Entity<Message>()
            //     .HasOne(u => u.Sender)
            //     .WithMany(m => m.MessagesSent)
            //     .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.ApplyUtcDateTimeConverter();
        }
    }
}
