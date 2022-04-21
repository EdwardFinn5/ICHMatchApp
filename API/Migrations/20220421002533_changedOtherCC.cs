using Microsoft.EntityFrameworkCore.Migrations;

namespace API.Migrations
{
    public partial class changedOtherCC : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_CiLocations_OtherCCs_OtherCCId",
                table: "CiLocations");

            migrationBuilder.DropIndex(
                name: "IX_CiLocations_OtherCCId",
                table: "CiLocations");

            migrationBuilder.DropColumn(
                name: "OtherCCId",
                table: "CiLocations");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OtherCCId",
                table: "CiLocations",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_CiLocations_OtherCCId",
                table: "CiLocations",
                column: "OtherCCId");

            migrationBuilder.AddForeignKey(
                name: "FK_CiLocations_OtherCCs_OtherCCId",
                table: "CiLocations",
                column: "OtherCCId",
                principalTable: "OtherCCs",
                principalColumn: "OtherCCId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
