using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addedSalaryRange : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "SalaryRange",
                table: "Positions",
                type: "varchar(80)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SalaryRange",
                table: "Positions");
        }
    }
}
