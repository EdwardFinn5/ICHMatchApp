using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedCoLocationDisplayName : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CoLocationDisplayName",
                table: "CoLocations",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CoLocationDisplayName",
                table: "CoLocations");
        }
    }
}
