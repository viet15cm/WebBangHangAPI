using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using WebBanHangAPI.DataContextLayer;
using WebBanHangAPI.Models;

namespace WebBanHangAPI.Controllers
{
    public class KhachHangsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        // GET: api/KhachHangs
        public ICollection<KhachHang> GetkhachHangs()
        {
            return db.khachHangs.ToList();
        }

        // GET: api/KhachHangs/5
        [ResponseType(typeof(KhachHang))]
        public IHttpActionResult GetKhachHang(string id)
        {
            KhachHang khachHang = db.khachHangs.Find(id);
            if (khachHang == null)
            {
                return NotFound();
            }

            return Ok(khachHang);
        }

        // PUT: api/KhachHangs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKhachHang(string id, KhachHang khachHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != khachHang.IDKH)
            {
                return BadRequest();
            }

            db.Entry(khachHang).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KhachHangExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/KhachHangs
        [ResponseType(typeof(KhachHang))]
        public IHttpActionResult PostKhachHang(KhachHang khachHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.khachHangs.Add(khachHang);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (KhachHangExists(khachHang.IDKH))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = khachHang.IDKH }, khachHang);
        }

        // DELETE: api/KhachHangs/5
        [ResponseType(typeof(KhachHang))]
        public IHttpActionResult DeleteKhachHang(string id)
        {
            KhachHang khachHang = db.khachHangs.Find(id);
            if (khachHang == null)
            {
                return NotFound();
            }

            db.khachHangs.Remove(khachHang);
            db.SaveChanges();

            return Ok(khachHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KhachHangExists(string id)
        {
            return db.khachHangs.Count(e => e.IDKH == id) > 0;
        }
    }
}