using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Web;
using System.Web.Mvc;
using WebBanHangAPI.GlobalVariablesWeb;
using WebBanHangAPI.Models.CookieAccout;
using WebBanHangAPI.Models.mvcModels;

namespace WebBanHangAPI.Controllers
{
    public class ShareOutSideController : Controller
    {
        // GET: ShareOutSide
        public ActionResult LoginCustomer()
        {
            ViewBag.Title = "Login customer";
            return View();
        }

        public ActionResult TrangChu()
        {
            return View();
        }

        [HttpPost]
        public JsonResult SetMemory(TokenAccount tk)
        {

            if (tk != null)
            {
                if (tk.Flag.Equals("cookie"))
                {

                    Session.Abandon();
                    HttpCookie cookie = new HttpCookie("AccoutCustomer");
                    cookie.HttpOnly = true;
                    HttpContext.Response.Cookies.Remove("AccoutCustomer");
                    cookie.Value = tk.AccoutToken;
                    cookie.Expires = DateTime.Now.AddDays(2);
                    HttpContext.Response.SetCookie(cookie);

                    TokenAccount tokenAccount = new TokenAccount()
                    {
                        AccoutToken = Request.Cookies.Get("AccoutCustomer").Value,
                        Flag = "cookie"
                    };
                    return Json(tokenAccount);
                }
                else if (tk.Flag.Equals("session"))
                {
                    Response.Cookies["Accout"].Expires = DateTime.Now.AddDays(-1);

                    Session["Accouts"] = tk.AccoutToken;
                    TokenAccount tokenAccount = new TokenAccount()
                    {
                        AccoutToken = Session["AccoutCustomer"].ToString(),
                        Flag = "sesstion"
                    };
                    return Json(tokenAccount);
                }

            }

            return Json(tk);

        }

        [HttpGet]
        public string GetTooken()
        {
            if (Session["AccoutCustomer"] != null)
                return Session["AccoutCustomer"].ToString();
            if (Request.Cookies["AccoutCustomer"] != null)
            {
                var value = Request.Cookies["Accout"].Value.ToString();
                return value;
            }
            return null;
        }

        [HttpGet]
        public string ResetTooken()
        {
            Session.Abandon();
            Response.Cookies["AccoutCustomer"].Expires = DateTime.Now.AddDays(-1);

            return "Thang Cong";

        }

        public ActionResult SanPham(string id)
        {
            if (id != null)
            {
                IEnumerable<mvcSanPhamHangSanXuat> sanPhamList;
                IEnumerable<mvcMathang> matHangList;
               
                HttpResponseMessage reponse = GlobalVariables.WebApiClient.GetAsync("SanPhams/GetFindMatHang/" + id).Result;
                HttpResponseMessage reponse2 = GlobalVariables.WebApiClient.GetAsync("MatHangs").Result;
                sanPhamList = reponse.Content.ReadAsAsync<IEnumerable<mvcSanPhamHangSanXuat>>().Result;
                matHangList = reponse2.Content.ReadAsAsync<IEnumerable<mvcMathang>>().Result;

                var hsxList = new List<mvcHangSanXuat>();
                foreach (var item in sanPhamList)
                {
                    hsxList.Add(new mvcHangSanXuat() { IDHSX = item.IDHSX, TenHSX = item.TenHSX });
                }
                var join = from pn in hsxList
                           group pn by new { pn.IDHSX, pn.TenHSX } into obGroup
                           orderby obGroup.Key.IDHSX, obGroup.Key.TenHSX
                           select new
                           {
                               IDHSX = obGroup.Key.IDHSX,
                               TenHSX = obGroup.Key.TenHSX,

                           };

                var hsxListJion = new List<mvcHangSanXuat>();
                foreach (var item in join.ToList())
                {
                    hsxListJion.Add(new mvcHangSanXuat() { IDHSX = item.IDHSX, TenHSX = item.TenHSX });
                }
                var objMultipleModels = Tuple.Create<IEnumerable<mvcSanPhamHangSanXuat>, IEnumerable<mvcMathang>, IEnumerable<mvcHangSanXuat>>
                    (sanPhamList, matHangList, hsxListJion);
                return View(objMultipleModels);
            }
            else
            {
                IEnumerable<mvcSanPhamHangSanXuat> sanPhamList;
                IEnumerable<mvcMathang> matHangList;
                HttpResponseMessage reponse = GlobalVariables.WebApiClient.GetAsync("SanPhams/GetJonSanPhamHangSanXuat").Result;
                HttpResponseMessage reponse2 = GlobalVariables.WebApiClient.GetAsync("MatHangs").Result;
                sanPhamList = reponse.Content.ReadAsAsync<IEnumerable<mvcSanPhamHangSanXuat>>().Result;
                matHangList = reponse2.Content.ReadAsAsync<IEnumerable<mvcMathang>>().Result;

                var hsxList = new List<mvcHangSanXuat>();
                foreach (var item in sanPhamList)
                {
                    hsxList.Add(new mvcHangSanXuat() { IDHSX = item.IDHSX, TenHSX = item.TenHSX });
                }
                var join = from pn in hsxList
                              group pn by new { pn.IDHSX, pn.TenHSX} into obGroup
                              orderby obGroup.Key.IDHSX, obGroup.Key.TenHSX
                              select new
                              {
                                  IDHSX = obGroup.Key.IDHSX,
                                  TenHSX = obGroup.Key.TenHSX,
                                 
                              };

                var hsxListJion = new List<mvcHangSanXuat>();
                foreach (var item in join.ToList())
                {
                    hsxListJion.Add(new mvcHangSanXuat() { IDHSX = item.IDHSX, TenHSX = item.TenHSX });
                }



                var objMultipleModels = Tuple.Create<IEnumerable<mvcSanPhamHangSanXuat>, IEnumerable<mvcMathang>, IEnumerable<mvcHangSanXuat>>
                    (sanPhamList, matHangList, hsxListJion);
                return View(objMultipleModels);
            }
        }

        

        public ActionResult ShowSanPham(string id)
        {
            
            return View();
        }

        public ActionResult DisPlayCart()
        {

            return View();
        }

        public ActionResult ShowProduct(string id , string idmh)
        {
          
            if (idmh == "DT000")
            {
                mvcSanPhamMatHangHSX item = null;
                mvcTSDienThoai item2 = null;
                mvcTSDongHo item3 = null;
                HttpResponseMessage reponse = GlobalVariables.WebApiClient.GetAsync("SanPhams/GetFindSanPhamMatHangHangSX/" + id).Result;

                HttpResponseMessage reponse1 = GlobalVariables.WebApiClient.GetAsync("TSDienThoais/GetFindIDSanPham/" + id).Result;
                item = reponse.Content.ReadAsAsync<mvcSanPhamMatHangHSX>().Result;
                item2 = reponse1.Content.ReadAsAsync<mvcTSDienThoai>().Result;
                var objMultipleModels = Tuple.Create<mvcSanPhamMatHangHSX, mvcTSDienThoai, mvcTSDongHo>(
                item, item2, item3
                );
                return View(objMultipleModels);
            }
            if(idmh == "ML000")
            {
                mvcSanPhamMatHangHSX item = null;
                mvcTSDienThoai item2 = null;
                mvcTSDongHo item3 = null;
                HttpResponseMessage reponse = GlobalVariables.WebApiClient.GetAsync("SanPhams/GetFindSanPhamMatHangHangSX/" + id).Result;

                HttpResponseMessage reponse1 = GlobalVariables.WebApiClient.GetAsync("TSDongHos/GetFindIDSanPham/" + id).Result;
                item = reponse.Content.ReadAsAsync<mvcSanPhamMatHangHSX>().Result;
                item3 = reponse1.Content.ReadAsAsync<mvcTSDongHo>().Result;
                var objMultipleModels = Tuple.Create<mvcSanPhamMatHangHSX, mvcTSDienThoai, mvcTSDongHo>(
                item, item2, item3
                );
                return View(objMultipleModels);

            }
           
            return View();

        }

    }
}