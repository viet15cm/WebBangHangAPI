using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using WebBanHangAPI.Controllers;

namespace WebBanHangAPI.Models
{
    public class MatHang
    {
        [Key]
        [StringLength(10)]
        public string IDMH { get; set; }
        [Required]
        [MaxLength(30)]
        public string TenMH { get; set; }
       
        public virtual ICollection<SanPham> SanPhams { get;set;}

    }
}