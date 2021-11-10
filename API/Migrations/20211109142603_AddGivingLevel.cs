using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class AddGivingLevel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "GivingLevel",
                table: "Users",
                type: "varchar(30)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "GivingLevel",
                table: "Users");
        }
    }
}
