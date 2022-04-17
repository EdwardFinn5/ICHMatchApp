using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedcollegenickname : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PosCategory",
                table: "Positions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "CollegeNickname",
                table: "Colleges",
                type: "nvarchar(60)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosCategory",
                table: "Positions");

            migrationBuilder.DropColumn(
                name: "CollegeNickname",
                table: "Colleges");
        }
    }
}
