using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebBanHangAPI.Controllers;

namespace WebBanHangAPI.Models
{
    public class SanPham 
    {
        [Key]
        [StringLength(10)]
        public string IDSP { get; set; }
        [Required]
        public string TenSP { get; set; }
        
        
        [Required]
        public decimal DonGia { get; set; }
       
        public string Anh { get; set; }
        public DateTime NgayCapNhat { get; set; }
       
        public string IDMH { get; set; }
        public virtual ICollection<NhapKho> NhapKhos { get; set; }
        public virtual ICollection<NhapHoaDon> NhapHoaDons { get; set; }
    }
}