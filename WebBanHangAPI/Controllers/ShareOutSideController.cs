using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebBanHangAPI.Models.CookieAccout;

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
            ViewBag.Title = "Trang Chu";
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
    }
}