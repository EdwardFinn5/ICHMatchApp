using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Migrations
{
    public partial class BrandNewMigration : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Categories",
                columns: table => new
                {
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CategoryName = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Categories", x => x.CategoryId);
                });

            migrationBuilder.CreateTable(
                name: "Colleges",
                columns: table => new
                {
                    CollegeId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CollegeName = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    CollegeNickname = table.Column<string>(type: "nvarchar(60)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Colleges", x => x.CollegeId);
                });

            migrationBuilder.CreateTable(
                name: "CoLocations",
                columns: table => new
                {
                    CoLocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CoLocationName = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    CoLocationSortName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CoLocations", x => x.CoLocationId);
                });

            migrationBuilder.CreateTable(
                name: "EmpIndustries",
                columns: table => new
                {
                    EmpIndustryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpIndustryName = table.Column<string>(type: "nvarchar(60)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpIndustries", x => x.EmpIndustryId);
                });

            migrationBuilder.CreateTable(
                name: "Newses",
                columns: table => new
                {
                    NewsId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NewsTitle = table.Column<string>(type: "nvarchar(80)", nullable: true),
                    NewsContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Order = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Newses", x => x.NewsId);
                });

            migrationBuilder.CreateTable(
                name: "PosCategories",
                columns: table => new
                {
                    PosCategoryId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PosCategoryName = table.Column<string>(type: "nvarchar(100)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PosCategories", x => x.PosCategoryId);
                });

            migrationBuilder.CreateTable(
                name: "ProfileAdvices",
                columns: table => new
                {
                    ProfileAdviceId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProfileAdviceTitle = table.Column<string>(type: "nvarchar(50)", nullable: true),
                    ProfileAdviceContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Order = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProfileAdvices", x => x.ProfileAdviceId);
                });

            migrationBuilder.CreateTable(
                name: "RegisterCodes",
                columns: table => new
                {
                    RegisterCodeId = table.Column<int>(type: "int", nullable: false),
                    RegisterCodeName1 = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeName2 = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeName3 = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeName4 = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeName5 = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeName6 = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeName7 = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeNameStud = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeNameAdmin = table.Column<string>(type: "varchar(10)", nullable: true),
                    RegisterCodeNameOwner = table.Column<string>(type: "varchar(10)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RegisterCodes", x => x.RegisterCodeId);
                });

            migrationBuilder.CreateTable(
                name: "StempLocations",
                columns: table => new
                {
                    StempLocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StempLocationName = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    StempLocationSortName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StempLocations", x => x.StempLocationId);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    AppUserId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserName = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    PasswordHash = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    PasswordSalt = table.Column<byte[]>(type: "varbinary(max)", nullable: true),
                    FirstName = table.Column<string>(type: "nvarchar(30)", nullable: true),
                    LastName = table.Column<string>(type: "nvarchar(40)", nullable: true),
                    HrContactTitle = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    AppUserType = table.Column<string>(type: "varchar(12)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    CoLocation = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    StLocation = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    CiLocation = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    CiempLocation = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    StempLocation = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    ClassYear = table.Column<string>(type: "varchar(25)", nullable: true),
                    Category = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    Major = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    College = table.Column<string>(type: "varchar(30)", nullable: true),
                    EmpName = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    EmpIndustry = table.Column<string>(type: "varchar(60)", nullable: true),
                    EmployeeNum = table.Column<string>(type: "varchar(30)", nullable: true),
                    RegisterCode = table.Column<string>(type: "varchar(30)", nullable: true),
                    Created = table.Column<DateTime>(type: "datetime2", nullable: false),
                    LastActive = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.AppUserId);
                });

            migrationBuilder.CreateTable(
                name: "Majors",
                columns: table => new
                {
                    MajorId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    MajorName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    CategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Majors", x => x.MajorId);
                    table.ForeignKey(
                        name: "FK_Majors_Categories_CategoryId",
                        column: x => x.CategoryId,
                        principalTable: "Categories",
                        principalColumn: "CategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StLocations",
                columns: table => new
                {
                    StLocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StLocationName = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    StLocationSortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CoLocationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StLocations", x => x.StLocationId);
                    table.ForeignKey(
                        name: "FK_StLocations_CoLocations_CoLocationId",
                        column: x => x.CoLocationId,
                        principalTable: "CoLocations",
                        principalColumn: "CoLocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhotoNewses",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    NewsUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsMainNews = table.Column<bool>(type: "bit", nullable: false),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    NewsId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoNewses", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhotoNewses_Newses_NewsId",
                        column: x => x.NewsId,
                        principalTable: "Newses",
                        principalColumn: "NewsId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PositNames",
                columns: table => new
                {
                    PositNameId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PosName = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    PosCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PositNames", x => x.PositNameId);
                    table.ForeignKey(
                        name: "FK_PositNames_PosCategories_PosCategoryId",
                        column: x => x.PosCategoryId,
                        principalTable: "PosCategories",
                        principalColumn: "PosCategoryId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CiempLocations",
                columns: table => new
                {
                    CiempLocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CiempLocationName = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    CiempLocationSortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StempLocationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CiempLocations", x => x.CiempLocationId);
                    table.ForeignKey(
                        name: "FK_CiempLocations_StempLocations_StempLocationId",
                        column: x => x.StempLocationId,
                        principalTable: "StempLocations",
                        principalColumn: "StempLocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "EmpInfos",
                columns: table => new
                {
                    EmpInfoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    EmpWebsite = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    CompanyDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WhyWork = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UniqueTitle = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    UniqueContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    AppUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmpInfos", x => x.EmpInfoId);
                    table.ForeignKey(
                        name: "FK_EmpInfos_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Likes",
                columns: table => new
                {
                    SourceUserId = table.Column<int>(type: "int", nullable: false),
                    LikedUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Likes", x => new { x.SourceUserId, x.LikedUserId });
                    table.ForeignKey(
                        name: "FK_Likes_Users_LikedUserId",
                        column: x => x.LikedUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId");
                    table.ForeignKey(
                        name: "FK_Likes_Users_SourceUserId",
                        column: x => x.SourceUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId");
                });

            migrationBuilder.CreateTable(
                name: "Messages",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SenderId = table.Column<int>(type: "int", nullable: false),
                    SenderUsername = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SenderFirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SenderCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SenderCollege = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SenderAppUserType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecipientId = table.Column<int>(type: "int", nullable: false),
                    RecipientUsername = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecipientFirstName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecipientCompany = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecipientCollege = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RecipientAppUserType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateRead = table.Column<DateTime>(type: "datetime2", nullable: true),
                    MessageSent = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SenderDeleted = table.Column<bool>(type: "bit", nullable: false),
                    RecipientDeleted = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Messages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Messages_Users_RecipientId",
                        column: x => x.RecipientId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Messages_Users_SenderId",
                        column: x => x.SenderId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "PhotoHrs",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HrUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsMainHr = table.Column<bool>(type: "bit", nullable: false),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoHrs", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhotoHrs_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    StudentUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    LogoUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsMain = table.Column<bool>(type: "bit", nullable: false),
                    IsMainLogo = table.Column<bool>(type: "bit", nullable: false),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Positions",
                columns: table => new
                {
                    PositionId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RegisterCode = table.Column<string>(type: "nvarchar(10)", nullable: true),
                    PosName = table.Column<string>(type: "nvarchar(75)", nullable: true),
                    PosCategory = table.Column<string>(type: "nvarchar(75)", nullable: true),
                    PositionDescription = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PositionBenefits = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    CiempLocation = table.Column<string>(type: "varchar(60)", nullable: true),
                    StempLocation = table.Column<string>(type: "varchar(10)", nullable: true),
                    PositionType = table.Column<string>(type: "varchar(25)", nullable: true),
                    SalaryRange = table.Column<string>(type: "varchar(80)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: true),
                    StartDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    AppDeadline = table.Column<DateTime>(type: "datetime2", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    HowToApply = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    ApplyEmail = table.Column<string>(type: "nvarchar(255)", nullable: true),
                    ApplyLink = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    UniqueTitle = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    UniqueContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Positions", x => x.PositionId);
                    table.ForeignKey(
                        name: "FK_Positions_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "StudInfos",
                columns: table => new
                {
                    StudInfoId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    GPA = table.Column<string>(type: "varchar(10)", nullable: true),
                    GradDate = table.Column<DateTime>(type: "datetime2", nullable: true),
                    BestEmail = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    BestPhone = table.Column<string>(type: "varchar(30)", nullable: true),
                    Athletics = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Arts = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    ExtraCurricular = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AcademicPlus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkPlus = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DreamJob = table.Column<string>(type: "nvarchar(256)", nullable: true),
                    UniqueTitle = table.Column<string>(type: "nvarchar(100)", nullable: true),
                    UniqueContent = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AppUserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_StudInfos", x => x.StudInfoId);
                    table.ForeignKey(
                        name: "FK_StudInfos_Users_AppUserId",
                        column: x => x.AppUserId,
                        principalTable: "Users",
                        principalColumn: "AppUserId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CiLocations",
                columns: table => new
                {
                    CiLocationId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CiLocationName = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    CiLocationSortName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    StLocationId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CiLocations", x => x.CiLocationId);
                    table.ForeignKey(
                        name: "FK_CiLocations_StLocations_StLocationId",
                        column: x => x.StLocationId,
                        principalTable: "StLocations",
                        principalColumn: "StLocationId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "DutyBullets",
                columns: table => new
                {
                    DutyBulletId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DutyBulletText = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Order = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    PositionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_DutyBullets", x => x.DutyBulletId);
                    table.ForeignKey(
                        name: "FK_DutyBullets_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "PositionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhotoLogos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    LogoHrUrl = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    IsMainLogoHr = table.Column<bool>(type: "bit", nullable: false),
                    PublicId = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PositionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhotoLogos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhotoLogos_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "PositionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SkillsBullets",
                columns: table => new
                {
                    SkillsBulletId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillsBulletText = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Order = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    PositionId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SkillsBullets", x => x.SkillsBulletId);
                    table.ForeignKey(
                        name: "FK_SkillsBullets_Positions_PositionId",
                        column: x => x.PositionId,
                        principalTable: "Positions",
                        principalColumn: "PositionId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AcBullets",
                columns: table => new
                {
                    AcBulletId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    AcBulletText = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Order = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    StudInfoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AcBullets", x => x.AcBulletId);
                    table.ForeignKey(
                        name: "FK_AcBullets_StudInfos_StudInfoId",
                        column: x => x.StudInfoId,
                        principalTable: "StudInfos",
                        principalColumn: "StudInfoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WorkBullets",
                columns: table => new
                {
                    WorkBulletId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    WorkBulletText = table.Column<string>(type: "nvarchar(250)", nullable: true),
                    Order = table.Column<float>(type: "real", nullable: false),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    StudInfoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkBullets", x => x.WorkBulletId);
                    table.ForeignKey(
                        name: "FK_WorkBullets_StudInfos_StudInfoId",
                        column: x => x.StudInfoId,
                        principalTable: "StudInfos",
                        principalColumn: "StudInfoId",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AcBullets_StudInfoId",
                table: "AcBullets",
                column: "StudInfoId");

            migrationBuilder.CreateIndex(
                name: "IX_CiempLocations_StempLocationId",
                table: "CiempLocations",
                column: "StempLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_CiLocations_StLocationId",
                table: "CiLocations",
                column: "StLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_DutyBullets_PositionId",
                table: "DutyBullets",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_EmpInfos_AppUserId",
                table: "EmpInfos",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Likes_LikedUserId",
                table: "Likes",
                column: "LikedUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Majors_CategoryId",
                table: "Majors",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_RecipientId",
                table: "Messages",
                column: "RecipientId");

            migrationBuilder.CreateIndex(
                name: "IX_Messages_SenderId",
                table: "Messages",
                column: "SenderId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoHrs_AppUserId",
                table: "PhotoHrs",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoLogos_PositionId",
                table: "PhotoLogos",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_PhotoNewses_NewsId",
                table: "PhotoNewses",
                column: "NewsId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_AppUserId",
                table: "Photos",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_Positions_AppUserId",
                table: "Positions",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_PositNames_PosCategoryId",
                table: "PositNames",
                column: "PosCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_SkillsBullets_PositionId",
                table: "SkillsBullets",
                column: "PositionId");

            migrationBuilder.CreateIndex(
                name: "IX_StLocations_CoLocationId",
                table: "StLocations",
                column: "CoLocationId");

            migrationBuilder.CreateIndex(
                name: "IX_StudInfos_AppUserId",
                table: "StudInfos",
                column: "AppUserId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkBullets_StudInfoId",
                table: "WorkBullets",
                column: "StudInfoId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AcBullets");

            migrationBuilder.DropTable(
                name: "CiempLocations");

            migrationBuilder.DropTable(
                name: "CiLocations");

            migrationBuilder.DropTable(
                name: "Colleges");

            migrationBuilder.DropTable(
                name: "DutyBullets");

            migrationBuilder.DropTable(
                name: "EmpIndustries");

            migrationBuilder.DropTable(
                name: "EmpInfos");

            migrationBuilder.DropTable(
                name: "Likes");

            migrationBuilder.DropTable(
                name: "Majors");

            migrationBuilder.DropTable(
                name: "Messages");

            migrationBuilder.DropTable(
                name: "PhotoHrs");

            migrationBuilder.DropTable(
                name: "PhotoLogos");

            migrationBuilder.DropTable(
                name: "PhotoNewses");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "PositNames");

            migrationBuilder.DropTable(
                name: "ProfileAdvices");

            migrationBuilder.DropTable(
                name: "RegisterCodes");

            migrationBuilder.DropTable(
                name: "SkillsBullets");

            migrationBuilder.DropTable(
                name: "WorkBullets");

            migrationBuilder.DropTable(
                name: "StempLocations");

            migrationBuilder.DropTable(
                name: "StLocations");

            migrationBuilder.DropTable(
                name: "Categories");

            migrationBuilder.DropTable(
                name: "Newses");

            migrationBuilder.DropTable(
                name: "PosCategories");

            migrationBuilder.DropTable(
                name: "Positions");

            migrationBuilder.DropTable(
                name: "StudInfos");

            migrationBuilder.DropTable(
                name: "CoLocations");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
