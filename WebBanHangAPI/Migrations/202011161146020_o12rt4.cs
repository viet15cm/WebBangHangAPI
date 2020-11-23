namespace WebBanHangAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class o12rt4 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.HangSXes",
                c => new
                    {
                        IDHSX = c.String(nullable: false, maxLength: 10),
                        TenHSX = c.String(),
                    })
                .PrimaryKey(t => t.IDHSX);
            
            AddColumn("dbo.SanPhams", "IDHSX", c => c.String(maxLength: 10));
            CreateIndex("dbo.SanPhams", "IDHSX");
            AddForeignKey("dbo.SanPhams", "IDHSX", "dbo.HangSXes", "IDHSX");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.SanPhams", "IDHSX", "dbo.HangSXes");
            DropIndex("dbo.SanPhams", new[] { "IDHSX" });
            DropColumn("dbo.SanPhams", "IDHSX");
            DropTable("dbo.HangSXes");
        }
    }
}
