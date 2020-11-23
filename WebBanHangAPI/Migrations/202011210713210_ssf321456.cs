namespace WebBanHangAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ssf321456 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TSDienThoais",
                c => new
                    {
                        IDDT = c.Int(nullable: false, identity: true),
                        MyProperty = c.String(),
                        MangHinh = c.String(),
                        HeDieuHanh = c.String(),
                        CameraRaSau = c.String(),
                        CaMeraTruoc = c.String(),
                        CPU = c.String(),
                        Gram = c.Int(nullable: false),
                        TheNho = c.String(),
                        DungLuongPin = c.String(),
                        IDSP = c.String(maxLength: 10),
                    })
                .PrimaryKey(t => t.IDDT)
                .ForeignKey("dbo.SanPhams", t => t.IDSP)
                .Index(t => t.IDSP);
            
            CreateTable(
                "dbo.TSDongHoes",
                c => new
                    {
                        IDDH = c.Int(nullable: false, identity: true),
                        DuongKinh = c.Int(nullable: false),
                        ChatLieuMat = c.String(),
                        ChatLieuDay = c.String(),
                        DoRongDay = c.Int(nullable: false),
                        ChongNuoc = c.String(),
                        ThoiGianPin = c.String(),
                        GoiTinh = c.Int(nullable: false),
                        IDSP = c.String(maxLength: 10),
                    })
                .PrimaryKey(t => t.IDDH)
                .ForeignKey("dbo.SanPhams", t => t.IDSP)
                .Index(t => t.IDSP);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TSDongHoes", "IDSP", "dbo.SanPhams");
            DropForeignKey("dbo.TSDienThoais", "IDSP", "dbo.SanPhams");
            DropIndex("dbo.TSDongHoes", new[] { "IDSP" });
            DropIndex("dbo.TSDienThoais", new[] { "IDSP" });
            DropTable("dbo.TSDongHoes");
            DropTable("dbo.TSDienThoais");
        }
    }
}
