namespace WebBanHangAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class aass3 : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.SanPhams", "Anh", c => c.String(nullable: false));
            DropColumn("dbo.SanPhams", "GiaBan");
        }
        
        public override void Down()
        {
            AddColumn("dbo.SanPhams", "GiaBan", c => c.Single(nullable: false));
            AlterColumn("dbo.SanPhams", "Anh", c => c.String());
        }
    }
}
