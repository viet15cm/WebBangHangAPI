using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models.JoinModel
{
    public class SanPhamHangSanXuat
    {
        public string IDSP { get; set; }

        public string TenSP { get; set; }

        public decimal DonGia { get; set; }

        public string Anh { get; set; }
        public DateTime NgayCapNhat { get; set; }

        public string IDMH { get; set; }
        public string IDHSX { get; set; }
        public string TenHSX { get; set; }
        
    }
}