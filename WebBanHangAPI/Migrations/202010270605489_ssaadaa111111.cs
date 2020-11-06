namespace WebBanHangAPI.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ssaadaa111111 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.UserCustomers",
                c => new
                    {
                        UserID = c.String(nullable: false, maxLength: 128),
                        UserName = c.String(),
                        UserPassWord = c.String(),
                        UserRoler = c.String(),
                        UserEmail = c.String(),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.UserID);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.UserCustomers");
        }
    }
}
