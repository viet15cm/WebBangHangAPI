using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class KhachHang
    {
        [Key]
        [StringLength(10)]
        public string IDKH { get; set; }
        [Required]
        [MaxLength(50)]
        public string TenKH { get; set; }
        [Required]
        [MaxLength(50)]
        public string DiaChi { get; set; }
        [Required]
        [MaxLength(13)]
        public string SDT { get; set; }
        [MaxLength(30)]
        public string Email { get; set; }
        public DateTime NgaySinh { get; set; }
        public virtual ICollection<HoaDon> HoaDons { get; set; }
    }
}