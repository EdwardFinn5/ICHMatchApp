using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class addPositionBenefits : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "PositionBenefits",
                table: "Positions",
                type: "nvarchar(max)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PositionBenefits",
                table: "Positions");
        }
    }
}
