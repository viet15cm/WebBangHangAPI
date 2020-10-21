using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class NhapHoaDon
    {
        [Key]
        [StringLength(10)]
        public string IDNHD { get; set; }
        public string IDHD { get; set; }
        public string IDSP { get; set; }
        public int SoLuongNhap { get; set; }
    }
}