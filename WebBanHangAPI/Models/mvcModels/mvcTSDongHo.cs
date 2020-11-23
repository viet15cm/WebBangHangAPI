using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models.mvcModels
{
    public class mvcTSDongHo
    {
        public int IDDH { get; set; }
        public int DuongKinh { get; set; }
        public string ChatLieuMat { get; set; }
        public string ChatLieuDay { get; set; }
        public int DoRongDay { get; set; }
        public string ChongNuoc { get; set; }

        public string ThoiGianPin { get; set; }

        public int GoiTinh { get; set; }
        public string IDSP { get; set; }
    }
}