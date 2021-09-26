﻿// <auto-generated />
using System;
using API.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace API.Data.Migrations
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

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<string>("AppUserType")
                        .HasColumnType("varchar(12)");

                    b.Property<string>("ClassYear")
                        .HasColumnType("varchar(12)");

                    b.Property<string>("College")
                        .HasColumnType("varchar(30)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("EmpIndustry")
                        .HasColumnType("varchar(30)");

                    b.Property<string>("EmpName")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("EmployeeNum")
                        .HasColumnType("varchar(30)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(30)");

                    b.Property<DateTime>("LastActive")
                        .HasColumnType("datetime2");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Location")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("Major")
                        .HasColumnType("nvarchar(60)");

                    b.Property<byte[]>("PasswordHash")
                        .HasColumnType("varbinary(max)");

                    b.Property<byte[]>("PasswordSalt")
                        .HasColumnType("varbinary(max)");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(255)");

                    b.HasKey("AppUserId");

                    b.ToTable("Users");
                });

            modelBuilder.Entity("API.Entities.College", b =>
                {
                    b.Property<int>("CollegeId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("CollegeName")
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("CollegeId");

                    b.ToTable("Colleges");
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

                    b.Property<string>("WhyWork")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("EmpInfoId");

                    b.HasIndex("AppUserId");

                    b.ToTable("EmpInfos");
                });

            modelBuilder.Entity("API.Entities.Location", b =>
                {
                    b.Property<int>("LocationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("LocationName")
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("LocationId");

                    b.ToTable("Locations");
                });

            modelBuilder.Entity("API.Entities.Major", b =>
                {
                    b.Property<int>("MajorId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("MajorName")
                        .HasColumnType("nvarchar(60)");

                    b.HasKey("MajorId");

                    b.ToTable("Majors");
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

                    b.Property<string>("HrUrl")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("IsMain")
                        .HasColumnType("bit");

                    b.Property<bool>("IsMainHr")
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

            modelBuilder.Entity("API.Entities.Position", b =>
                {
                    b.Property<int>("PositionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<bool>("Active")
                        .HasColumnType("bit");

                    b.Property<DateTime>("AppDeadline")
                        .HasColumnType("datetime2");

                    b.Property<int>("AppUserId")
                        .HasColumnType("int");

                    b.Property<string>("ApplyEmail")
                        .HasColumnType("nvarchar(255)");

                    b.Property<DateTime>("Created")
                        .HasColumnType("datetime2");

                    b.Property<string>("HowToApply")
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("HrContact")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("HrContactTitle")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("LookingFor")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PositionDescription")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PositionLocation")
                        .HasColumnType("nvarchar(60)");

                    b.Property<string>("PositionName")
                        .HasColumnType("nvarchar(100)");

                    b.Property<string>("PositionType")
                        .HasColumnType("varchar(25)");

                    b.Property<DateTime>("StartDate")
                        .HasColumnType("datetime2");

                    b.HasKey("PositionId");

                    b.HasIndex("AppUserId");

                    b.ToTable("Positions");
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
                        .HasColumnType("nvarchar(255)");

                    b.Property<string>("BestPhone")
                        .HasColumnType("varchar(30)");

                    b.Property<string>("DreamJob")
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("ExtraCurricular")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("GPA")
                        .HasColumnType("varchar(10)");

                    b.Property<DateTime>("GradDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("WorkPlus")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("StudInfoId");

                    b.HasIndex("AppUserId");

                    b.ToTable("StudInfos");
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

            modelBuilder.Entity("API.Entities.Photo", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("Photos")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
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

            modelBuilder.Entity("API.Entities.StudInfo", b =>
                {
                    b.HasOne("API.Entities.AppUser", "AppUser")
                        .WithMany("StudInfos")
                        .HasForeignKey("AppUserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AppUser");
                });

            modelBuilder.Entity("API.Entities.AppUser", b =>
                {
                    b.Navigation("EmpInfos");

                    b.Navigation("Photos");

                    b.Navigation("Positions");

                    b.Navigation("StudInfos");
                });
#pragma warning restore 612, 618
        }
    }
}
