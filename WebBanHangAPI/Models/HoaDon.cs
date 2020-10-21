using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;
using WebBanHangAPI.Controllers;

namespace WebBanHangAPI.Models
{
    public class HoaDon
    {
        [Key]
        [StringLength(10)]
        public string IDHD { get; set; }
        public string IDNV { get; set; }
        public string IDKH { get; set; }
        public DateTime NgayNhap { get; set; }
        public virtual ICollection<NhapHoaDon> NhapHoaDons { get; set; }
    }
}