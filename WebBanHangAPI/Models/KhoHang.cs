using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class KhoHang
    {
        [Key]
        [StringLength(5)]
        public string IDNK { get; set; }
        [Required]
        public string IDHH { get; set; }
        [Required]
        public string IDNCC { get; set; }
        [Required]
        public string IDNV { get; set; }
        [Required]
        public int SoLuong { get; set; }

        public DateTime NgayNhap { get; set; }

       


    }
}