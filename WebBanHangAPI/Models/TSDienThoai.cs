using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class TSDienThoai
    {
        [Key]
        public int IDDT { get; set; }
        public string MyProperty { get; set; }
        public string MangHinh { get; set; }
        public string HeDieuHanh { get; set; }

        public string CameraRaSau { get; set; }
        public string CaMeraTruoc { get; set; }

        public string CPU { get; set; }
        public int Gram { get; set; }
        public string TheNho { get; set; }
        public string DungLuongPin { get; set; }
        public string IDSP { get; set; }
        public virtual SanPham SanPham { get; set; }
    }
}