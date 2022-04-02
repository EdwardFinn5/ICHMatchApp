using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class skillsBullets : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "SkillsBullets",
                columns: table => new
                {
                    SkillsBulletId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    SkillsBulletText = table.Column<string>(type: "nvarchar(max)", nullable: true),
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

            migrationBuilder.CreateIndex(
                name: "IX_SkillsBullets_PositionId",
                table: "SkillsBullets",
                column: "PositionId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "SkillsBullets");
        }
    }
}
