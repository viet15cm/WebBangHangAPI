namespace WebBanHangAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class saaaaaj111 : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.KhachHangs", "Email", c => c.String(maxLength: 30));
        }
        
        public override void Down()
        {
            DropColumn("dbo.KhachHangs", "Email");
        }
    }
}
