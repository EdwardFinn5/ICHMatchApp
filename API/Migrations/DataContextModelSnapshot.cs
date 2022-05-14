﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Migrations
{
    [DbContext(typeof(DataContext))]
    partial class DataContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("ProductVersion", "5.0.9")
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Property<int>("AppUserId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AppUserType")
                        .HasColumnType("varchar(12)");

                    b.Property<string>("Category")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("CiLocation")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("ClassYear")
                        .HasColumnType("varchar(12)");

                    b.Property<string>("CoLocation")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("College")
                        .HasColumnType("varchar(30)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmpIndustry")
                        .HasColumnType("varchar(60)");

                    b.Property<string>("EmpName")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("EmployeeNum")
                        .HasColumnType("varchar(30)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(30)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<bool>("IsMainLogo")
                        .HasColumnType("bit");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(40)");

                    b.Property<string>("LogoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Major")
                        .HasColumnType("nvarchar(60)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("RegisterCode")
                        .HasColumnType("varchar(30)");

                    b.Property<string>("StLocation")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("AppUserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.Category", b =>
                {
                    b.Property<int>("CategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CategoryName")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("CategoryId");

                    b.ToTable("Categories");
                });

            modelBuilder.Entity("API.Entities.CiLocation", b =>
                {
                    b.Property<int>("CiLocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CiLocationName")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("CiLocationSortName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("StLocationId")
                        .HasColumnType("int");

                    b.HasKey("CiLocationId");

                    b.HasIndex("StLocationId");

                    b.ToTable("CiLocations");
                });

            modelBuilder.Entity("API.Entities.CoLocation", b =>
                {
                    b.Property<int>("CoLocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CoLocationName")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("CoLocationSortName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("CoLocationId");

                    b.ToTable("CoLocations");
                });

            modelBuilder.Entity("API.Entities.College", b =>
                {
                    b.Property<int>("CollegeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CollegeName")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("CollegeNickname")
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("CollegeId");

                    b.ToTable("Colleges");
                });

            modelBuilder.Entity("API.Entities.DutyBullet", b =>
                {
                    b.Property<int>("DutyBulletId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("DutyBulletText")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<float>("Order")
                        .HasColumnType("real");

                    b.Property<int>("PositionId")
                        .HasColumnType("int");

                    b.HasKey("DutyBulletId");

                    b.HasIndex("PositionId");

                    b.ToTable("DutyBullets");
                });

            modelBuilder.Entity("API.Entities.EmpIndustry", b =>
                {
                    b.Property<int>("EmpIndustryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("EmpIndustryName")
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("EmpIndustryId");

                    b.ToTable("EmpIndustries");
                });

            modelBuilder.Entity("API.Entities.EmpInfo", b =>
                {
                    b.Property<int>("EmpInfoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AppUserId")
                        .HasColumnType("int");

                    b.Property<string>("CompanyDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("EmpWebsite")
                        .HasColumnType("nvarchar(255)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("UniqueContent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UniqueTitle")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("WhyWork")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmpInfoId");

                    b.HasIndex("AppUserId");

                    b.ToTable("EmpInfos");
                });

            modelBuilder.Entity("API.Entities.Major", b =>
                {
                    b.Property<int>("MajorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CategoryId")
                        .HasColumnType("int");

                    b.Property<string>("MajorName")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("MajorId");

                    b.HasIndex("CategoryId");

                    b.ToTable("Majors");
                });

            modelBuilder.Entity("API.Entities.Message", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("Content")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DateRead")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("MessageSent")
                        .HasColumnType("datetime2");

                    b.Property<string>("RecipientAppUserType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RecipientCollege")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RecipientCompany")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("RecipientDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("RecipientFirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("RecipientId")
                        .HasColumnType("int");

                    b.Property<string>("RecipientUsername")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderAppUserType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderCollege")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("SenderCompany")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("SenderDeleted")
                        .HasColumnType("bit");

                    b.Property<string>("SenderFirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("SenderId")
                        .HasColumnType("int");

                    b.Property<string>("SenderUsername")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("RecipientId");

                    b.HasIndex("SenderId");

                    b.ToTable("Messages");
                });

            modelBuilder.Entity("API.Entities.Photo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AppUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsMain")
                        .HasColumnType("bit");

                    b.Property<bool>("IsMainLogo")
                        .HasColumnType("bit");

                    b.Property<string>("LogoUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PublicId")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("StudentUrl")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("API.Entities.PhotoHr", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("AppUserId")
                        .HasColumnType("int");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("HrUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsMainHr")
                        .HasColumnType("bit");

                    b.Property<string>("PublicId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("AppUserId");

                    b.ToTable("PhotoHrs");
                });

            modelBuilder.Entity("API.Entities.PhotoLogo", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsMainLogo")
                        .HasColumnType("bit");

                    b.Property<string>("LogoHr")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("PositionId")
                        .HasColumnType("int");

                    b.Property<string>("PublicId")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PositionId");

                    b.ToTable("PhotoLogos");
                });

            modelBuilder.Entity("API.Entities.PosCategory", b =>
                {
                    b.Property<int>("PosCategoryId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("PosCategoryName")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("PosCategoryId");

                    b.ToTable("PosCategories");
                });

            modelBuilder.Entity("API.Entities.PositName", b =>
                {
                    b.Property<int>("PositNameId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("PosCategoryId")
                        .HasColumnType("int");

                    b.Property<string>("PosName")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("PositNameId");

                    b.HasIndex("PosCategoryId");

                    b.ToTable("PositNames");
                });

            modelBuilder.Entity("API.Entities.Position", b =>
                {
                    b.Property<int>("PositionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<DateTime?>("AppDeadline")
                        .HasColumnType("datetime2");

                    b.Property<int>("AppUserId")
                        .HasColumnType("int");

                    b.Property<string>("ApplyEmail")
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("ApplyLink")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("CiLocation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime?>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<string>("HowToApply")
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("HrContact")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("HrContactTitle")
                        .HasColumnType("nvarchar(100)");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("PosCategory")
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("PosName")
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("PositionBenefits")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PositionDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PositionType")
                        .HasColumnType("varchar(25)");

                    b.Property<string>("RegisterCode")
                        .HasColumnType("nvarchar(10)");

                    b.Property<DateTime?>("StartDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("UniqueContent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UniqueTitle")
                        .HasColumnType("nvarchar(100)");

                    b.HasKey("PositionId");

                    b.HasIndex("AppUserId");

                    b.ToTable("Positions");
                });

            modelBuilder.Entity("API.Entities.ProfileAdvice", b =>
                {
                    b.Property<int>("ProfileAdviceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<float>("Order")
                        .HasColumnType("real");

                    b.Property<string>("ProfileAdviceContent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ProfileAdviceTitle")
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("ProfileAdviceId");

                    b.ToTable("ProfileAdvices");
                });

            modelBuilder.Entity("API.Entities.SkillsBullet", b =>
                {
                    b.Property<int>("SkillsBulletId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<float>("Order")
                        .HasColumnType("real");

                    b.Property<int>("PositionId")
                        .HasColumnType("int");

                    b.Property<string>("SkillsBulletText")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("SkillsBulletId");

                    b.HasIndex("PositionId");

                    b.ToTable("SkillsBullets");
                });

            modelBuilder.Entity("API.Entities.StLocation", b =>
                {
                    b.Property<int>("StLocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<int>("CoLocationId")
                        .HasColumnType("int");

                    b.Property<string>("StLocationName")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("StLocationSortName")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StLocationId");

                    b.HasIndex("CoLocationId");

                    b.ToTable("StLocations");
                });

            modelBuilder.Entity("API.Entities.StudInfo", b =>
                {
                    b.Property<int>("StudInfoId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("AcademicPlus")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("AppUserId")
                        .HasColumnType("int");

                    b.Property<string>("Arts")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Athletics")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("BestEmail")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("BestPhone")
                        .HasColumnType("varchar(30)");

                    b.Property<string>("DreamJob")
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("ExtraCurricular")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GPA")
                        .HasColumnType("varchar(10)");

                    b.Property<DateTime?>("GradDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsActive")
                        .HasColumnType("bit");

                    b.Property<string>("UniqueContent")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UniqueTitle")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("WorkPlus")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StudInfoId");

                    b.HasIndex("AppUserId");

                    b.ToTable("StudInfos");
                });

            modelBuilder.Entity("API.Entities.UserLike", b =>
                {
                    b.Property<int>("SourceUserId")
                        .HasColumnType("int");

                    b.Property<int>("LikedUserId")
                        .HasColumnType("int");

                    b.HasKey("SourceUserId", "LikedUserId");

                    b.HasIndex("LikedUserId");

                    b.ToTable("Likes");
                });

            modelBuilder.Entity("API.Entities.CiLocation", b =>
                {
                    b.HasOne("API.Entities.StLocation", "stLocation")
                        .WithMany("CiLocations")
                        .HasForeignKey("StLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("stLocation");
                });

            modelBuilder.Entity("API.Entities.DutyBullet", b =>
                {
                    b.HasOne("API.Entities.Position", "Position")
                        .WithMany("DutyBullets")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Position");
                });

            modelBuilder.Entity("API.Entities.EmpInfo", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("EmpInfos")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.Major", b =>
                {
                    b.HasOne("API.Entities.Category", "Category")
                        .WithMany("Majors")
                        .HasForeignKey("CategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Category");
                });

            modelBuilder.Entity("API.Entities.Message", b =>
                {
                    b.HasOne("API.Entities.AppUser", "Recipient")
                        .WithMany("MessagesReceived")
                        .HasForeignKey("RecipientId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", "Sender")
                        .WithMany("MessagesSent")
                        .HasForeignKey("SenderId")
                        .OnDelete(DeleteBehavior.Restrict)
                        .IsRequired();

                    b.Navigation("Recipient");

                    b.Navigation("Sender");
                });

            modelBuilder.Entity("API.Entities.Photo", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Photos")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.PhotoHr", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("PhotoHrs")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.PhotoLogo", b =>
                {
                    b.HasOne("API.Entities.Position", "Position")
                        .WithMany("PhotoLogos")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Position");
                });

            modelBuilder.Entity("API.Entities.PositName", b =>
                {
                    b.HasOne("API.Entities.PosCategory", "PosCategory")
                        .WithMany("PositNames")
                        .HasForeignKey("PosCategoryId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("PosCategory");
                });

            modelBuilder.Entity("API.Entities.Position", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Positions")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.SkillsBullet", b =>
                {
                    b.HasOne("API.Entities.Position", "Position")
                        .WithMany("SkillsBullets")
                        .HasForeignKey("PositionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Position");
                });

            modelBuilder.Entity("API.Entities.StLocation", b =>
                {
                    b.HasOne("API.Entities.CoLocation", "coLocation")
                        .WithMany("StLocations")
                        .HasForeignKey("CoLocationId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("coLocation");
                });

            modelBuilder.Entity("API.Entities.StudInfo", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("StudInfos")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.UserLike", b =>
                {
                    b.HasOne("API.Entities.AppUser", "LikedUser")
                        .WithMany("LikedByUsers")
                        .HasForeignKey("LikedUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.HasOne("API.Entities.AppUser", "SourceUser")
                        .WithMany("LikedUsers")
                        .HasForeignKey("SourceUserId")
                        .OnDelete(DeleteBehavior.NoAction)
                        .IsRequired();

                    b.Navigation("LikedUser");

                    b.Navigation("SourceUser");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("EmpInfos");

                    b.Navigation("LikedByUsers");

                    b.Navigation("LikedUsers");

                    b.Navigation("MessagesReceived");

                    b.Navigation("MessagesSent");

                    b.Navigation("PhotoHrs");

                    b.Navigation("Photos");

                    b.Navigation("Positions");

                    b.Navigation("StudInfos");
                });

            modelBuilder.Entity("API.Entities.Category", b =>
                {
                    b.Navigation("Majors");
                });

            modelBuilder.Entity("API.Entities.CoLocation", b =>
                {
                    b.Navigation("StLocations");
                });

            modelBuilder.Entity("API.Entities.PosCategory", b =>
                {
                    b.Navigation("PositNames");
                });

            modelBuilder.Entity("API.Entities.Position", b =>
                {
                    b.Navigation("DutyBullets");

                    b.Navigation("PhotoLogos");

                    b.Navigation("SkillsBullets");
                });

            modelBuilder.Entity("API.Entities.StLocation", b =>
                {
                    b.Navigation("CiLocations");
                });
#pragma warning restore 612, 618
        }
    }
}
