using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class HangSX
    {
        [Key]
        [StringLength(10)]
        public string IDHSX { get; set; }
        public string TenHSX { get; set; }

        public virtual ICollection<SanPham> SanPhams { get; set; }
    }
}