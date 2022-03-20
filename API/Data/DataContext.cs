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
        public DbSet<DutyBullet> DutyBullets { get; set; }
        public DbSet<PositionDutyBullet> PositionDutyBullets { get; set; }
        public DbSet<StudInfo> StudInfos { get; set; }
        public DbSet<RegisterCode> RegisterCodes { get; set; }
        public DbSet<UserLike> Likes { get; set; }
        public DbSet<Message> Messages { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PositionDutyBullet>()
                .HasKey(cm => new { cm.PositionId, cm.DutyBulletId });

            modelBuilder.Entity<PositionDutyBullet>()
                .HasOne(cm => cm.Position)
                .WithMany(c => c.PositionDutyBullets)
                .HasForeignKey(cm => cm.DutyBulletId)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<PositionDutyBullet>()
                .HasOne(cm => cm.DutyBullet)
                .WithMany(m => m.PositionDutyBullets)
                .HasForeignKey(cm => cm.PositionId)
                .OnDelete(DeleteBehavior.Cascade);

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

            modelBuilder.Entity<UserLike>()
                .HasKey(k => new { k.SourceUserId, k.LikedUserId });

            modelBuilder.Entity<UserLike>()
                .HasOne(s => s.SourceUser)
                .WithMany(l => l.LikedUsers)
                .HasForeignKey(s => s.SourceUserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<UserLike>()
                .HasOne(s => s.LikedUser)
                .WithMany(l => l.LikedByUsers)
                .HasForeignKey(s => s.LikedUserId)
                .OnDelete(DeleteBehavior.NoAction);

            modelBuilder.Entity<Message>()
                .HasOne(u => u.Recipient)
                .WithMany(m => m.MessagesReceived)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<Message>()
                .HasOne(u => u.Sender)
                .WithMany(m => m.MessagesSent)
                .OnDelete(DeleteBehavior.Restrict);

            // modelBuilder.ApplyUtcDateTimeConverter();
        }
    }
}
