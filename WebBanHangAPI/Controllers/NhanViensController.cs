using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Description;
using WebBanHangAPI.DataContextLayer;
using WebBanHangAPI.Models;
using WebBanHangAPI.Models.BasicAut;

namespace WebBanHangAPI.Controllers
{
    [RoutePrefix("NhanViens")]
    public class NhanViensController : ApiController

    {
       
        private BanHangDBContext db = new BanHangDBContext();
       
        [Route("GetNhanVienID/{key}")]
        public ICollection<NhanVien> GetNhanVienID(string key)
        {
            var matches = from m in db.nhanViens
                          where m.TenNV.ToLower().StartsWith(key.ToLower())
                          select m;

            return matches.ToList();
        }

        // GET: api/NhanViens
        
        [ResponseType(typeof(int))]
        [Route("GetSoLuongNV")]
        public IHttpActionResult GetSoLuongNV()
        {
           
            var sl = db.nhanViens.ToList();
            if(sl.Count > 0)
                return Ok(sl.Count);
            return Ok(0);
        }
       
        public ICollection<NhanVien> GetnhanViens()
        {
            return db.nhanViens.ToList();
        }

        // GET: api/NhanViens/5
        
        [ResponseType(typeof(NhanVien))]
        public IHttpActionResult GetNhanVien(string id)
        {
            NhanVien nhanVien = db.nhanViens.Find(id);
            if (nhanVien == null)
            {
                return NotFound();
            }

            return Ok(nhanVien);
        }

        // PUT: api/NhanViens/5
        
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNhanVien(string id, NhanVien nhanVien)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhanVien.IDNV)
            {
                return BadRequest();
            }

            db.Entry(nhanVien).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhanVienExists(id))
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

        // POST: api/NhanViens
        
        [ResponseType(typeof(NhanVien))]
        public IHttpActionResult PostNhanVien(NhanVien nhanVien)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.nhanViens.Add(nhanVien);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NhanVienExists(nhanVien.IDNV))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = nhanVien.IDNV }, nhanVien);
        }

        // DELETE: api/NhanViens/5
        
        [ResponseType(typeof(NhanVien))]
        public IHttpActionResult DeleteNhanVien(string id)
        {
            NhanVien nhanVien = db.nhanViens.Find(id);
            if (nhanVien == null)
            {
                return NotFound();
            }

            db.nhanViens.Remove(nhanVien);
            db.SaveChanges();

            return Ok(nhanVien);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhanVienExists(string id)
        {
            return db.nhanViens.Count(e => e.IDNV == id) > 0;
        }
    }
}