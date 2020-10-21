using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class PhieuNhap
    {
        [Key]
        
        [StringLength(10)]
        public string IDPN { get; set; }
        public string IDNV { get; set; }
        public string IDNCC { get; set; }
        [Required]
        public DateTime NgayNhap { get; set; }
        public virtual ICollection<NhapKho> NhapKhos { get; set; }
    }
}