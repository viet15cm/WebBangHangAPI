using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Web;
using System.Web.Mvc;
using WebBanHangAPI.Models.BasicAut;
using WebBanHangAPI.Models.CookieAccout;

namespace WebBanHangAPI.Controllers
{
    public class HomeController : Controller
    {
     

        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }

        public ActionResult Login()
        {
            ViewBag.Title = "Login Page";
            
                return View();
           
        }

        public ActionResult Comein()
        {
            ViewBag.Title = "Conme Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }


        public ActionResult SanPham()
        {
            ViewBag.Title = "Conme Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"]!= null)
                return View();

            return  RedirectToAction("Login");
        }

        public ActionResult MatHang()
        {
          
            ViewBag.Title = "MatHang Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }

        public ActionResult NhaCungCap()
        {

            ViewBag.Title = "NhaCungCap Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }
        public ActionResult NhanVien()
        {
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                ViewBag.Title = "NhanVien Page";
          
                return View();
          
        }

        public ActionResult NhapKho()
        {

            ViewBag.Title = "NhapKho Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");

        }

        public ActionResult KhoHang()
        {
            ViewBag.Title = "NhapKho Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }

        public ActionResult HoaDon()
        {
            ViewBag.Title = "HoaDon Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }

        public ActionResult KhachHang()
        {
            ViewBag.Title = "HoaDon Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }

        public ActionResult NhapHoaDon()
        {
            ViewBag.Title = "NhapHoaDon Page";
            if (Request.Cookies["Accout"] != null || Session["Accouts"] != null)
                return View();
            return RedirectToAction("Login");
        }
  
        [HttpPost]
        public JsonResult SetMemory(TokenAccount tk)
        {
           
           if(tk != null)
            {
                if (tk.Flag.Equals("cookie"))
                {
                 
                    Session.Abandon();
                    HttpCookie cookie = new HttpCookie("Accout");
                    cookie.HttpOnly = true;
                    HttpContext.Response.Cookies.Remove("Accout");
                    cookie.Value = tk.AccoutToken;
                    cookie.Expires = DateTime.Now.AddDays(2);
                    HttpContext.Response.SetCookie(cookie);
                    
                    TokenAccount tokenAccount = new TokenAccount()
                    {
                        AccoutToken = Request.Cookies.Get("Accout").Value,
                        Flag = "cookie"
                    };
                    return Json(tokenAccount);
                }else if (tk.Flag.Equals("session"))
                {
                    Response.Cookies["Accout"].Expires = DateTime.Now.AddDays(-1);

                    Session["Accouts"] = tk.AccoutToken;
                    TokenAccount tokenAccount = new TokenAccount()
                    {
                        AccoutToken = Session["Accouts"].ToString(),
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
            if(Session["Accouts"] != null)
               return Session["Accouts"].ToString();
            if (Request.Cookies["Accout"] != null)
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
            Response.Cookies["Accout"].Expires = DateTime.Now.AddDays(-1);
           
            return "Thang Cong";

        }


    }
}
