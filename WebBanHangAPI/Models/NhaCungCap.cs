using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Security.Permissions;
using System.Web;
using WebBanHangAPI.Controllers;

namespace WebBanHangAPI.Models
{
    public class NhaCungCap
    {
        [Key]
        [StringLength(10)]
        public string IDNCC { get; set; }
        [MaxLength(30)]
        [Required]
        public string TenNCC { get; set; }
        [MaxLength(30)]
        public string DiaChi { get; set; }
        [MaxLength(30)]
        public string Email { get; set; }
        [MaxLength(10)]
        public string SoDienThoai { get; set; }

        public ICollection<PhieuNhap> PhieuNhaps { get; set; }


    }
}