using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Permissions;
using System.Web;
using System.Xml.Linq;

namespace WebBanHangAPI.Models
{
    public class NhanVien
    {
        [Key]
        [StringLength(10)]
        public string IDNV { get; set; }
        [Required]
        public string TenNV { get; set; }
        [Required]
        public DateTime NgaySinh { get; set; }
        [MaxLength(50)]
        public string DiaChi { get; set; }
        [MaxLength(30)]
        public string Email { get; set; }

        [Required]
        [MaxLength(10)]
        public string SoDienThoai { get; set; }

        public virtual ICollection<PhieuNhap> PhieuNhaps { get; set; }
        public virtual ICollection<HoaDon> HoaDons { get; set; }




    }
}