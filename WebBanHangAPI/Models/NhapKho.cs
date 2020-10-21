using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class NhapKho
    {
        [Key]
        [StringLength(10)]
        public string IDNK { get; set; }
        public string IDPN { get; set; }
        public string IDSP { get; set; }
        public int SoLuong { get; set; }
    }
}