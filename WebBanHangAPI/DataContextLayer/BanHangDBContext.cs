using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Web;
using System.Web.WebPages.Instrumentation;
using WebBanHangAPI.Controllers;
using WebBanHangAPI.Models;

namespace WebBanHangAPI.DataContextLayer
{
    public class BanHangDBContext : DbContext
    {
        public BanHangDBContext() : base("name=QLBH")
        {
        }

       
        public DbSet<MatHang> matHangs { get; set; }
        public DbSet<NhaCungCap> nhaCungCaps { get; set; }
        
        public DbSet<KhoHang> khoHangs { get; set; }
        public DbSet<SanPham> sanPhams { get; set; }
        public DbSet<NhanVien> nhanViens { get; set; }
        public DbSet<NhapKho> nhapKhos { get; set; }
        public DbSet<PhieuNhap> phieuNhaps { get; set; }
        public DbSet<User> users { get; set; }

        public DbSet<UserCustomer> UserCustomers { get; set; }
        public DbSet<HoaDon> hoaDons { get; set; }
        public DbSet<KhachHang> khachHangs { get; set; }
        public DbSet<NhapHoaDon> nhapHoaDons { get; set; }
        public DbSet<HangSX> hangSXs { get; set; }
        
        public DbSet<TSDienThoai> tSDienThoais { get; set; }
        public DbSet<TSDongHo> tSDongHos { get; set; }

        public object User { get; internal set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<SanPham>().Property(x => x.DonGia).HasPrecision(16, 2);
        }
    }
}