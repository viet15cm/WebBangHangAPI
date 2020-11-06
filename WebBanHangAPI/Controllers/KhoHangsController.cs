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
using WebBanHangAPI.Models.BasicAut;

namespace WebBanHangAPI.Controllers
{
    public class KhoHangsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        // GET: api/KhoHangs
       
        public ICollection<KhoHang> GetkhoHangs()
        {
            return db.khoHangs.ToList();
        }

        // GET: api/KhoHangs/5
       
        [ResponseType(typeof(KhoHang))]
        public IHttpActionResult GetKhoHang(string id)
        {
            KhoHang khoHang = db.khoHangs.Find(id);
            if (khoHang == null)
            {
                return NotFound();
            }

            return Ok(khoHang);
        }

        // PUT: api/KhoHangs/5
       
        [ResponseType(typeof(void))]
        public IHttpActionResult PutKhoHang(string id, KhoHang khoHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != khoHang.IDNK)
            {
                return BadRequest();
            }

            db.Entry(khoHang).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!KhoHangExists(id))
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

        // POST: api/KhoHangs
        
        [ResponseType(typeof(KhoHang))]
        public IHttpActionResult PostKhoHang(KhoHang khoHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.khoHangs.Add(khoHang);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = khoHang.IDNK }, khoHang);
        }

        // DELETE: api/KhoHangs/5
        [ResponseType(typeof(KhoHang))]
       
        public IHttpActionResult DeleteKhoHang(string id)
        {
            KhoHang khoHang = db.khoHangs.Find(id);
            if (khoHang == null)
            {
                return NotFound();
            }

            db.khoHangs.Remove(khoHang);
            db.SaveChanges();

            return Ok(khoHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool KhoHangExists(string id)
        {
            return db.khoHangs.Count(e => e.IDNK == id) > 0;
        }
    }
}