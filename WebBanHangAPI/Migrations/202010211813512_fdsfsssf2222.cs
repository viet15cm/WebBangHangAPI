namespace WebBanHangAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fdsfsssf2222 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.SanPhams", "DonGia", c => c.Decimal(nullable: false, precision: 16, scale: 2));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.SanPhams", "DonGia", c => c.Single(nullable: false));
        }
    }
}
