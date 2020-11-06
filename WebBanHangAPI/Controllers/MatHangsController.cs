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
    
    public class MatHangsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        // GET: api/MatHangs
       
        [Route("getMatHangID/{key}")]
        public ICollection<MatHang> getMatHangID(string key)
        {
            var matHangs = from mh in db.matHangs
                           where mh.TenMH.ToLower().StartsWith(key.ToLower())
                           select mh;
            return matHangs.ToList();
        }
        
        
        public IHttpActionResult GetMatHang()
        {
            return Ok(db.matHangs.ToList());
        }

        // GET: api/MatHangs/5
       
        [ResponseType(typeof(MatHang))]
        public IHttpActionResult GetMatHang(string id)
        {
            MatHang matHang = db.matHangs.Find(id);
            if (matHang == null)
            {
                return NotFound();
            }

            return Ok(matHang);
        }

        // PUT: api/MatHangs/5
       
        [ResponseType(typeof(void))]
        public IHttpActionResult PutMatHang(string id, MatHang matHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != matHang.IDMH)
            {
                return BadRequest();
            }

            db.Entry(matHang).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MatHangExists(id))
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

        // POST: api/MatHangs
        
        [ResponseType(typeof(MatHang))]
        public IHttpActionResult PostMatHang(MatHang matHang)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.matHangs.Add(matHang);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (MatHangExists(matHang.IDMH))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = matHang.IDMH }, matHang);
        }

        // DELETE: api/MatHangs/5
        
        [ResponseType(typeof(MatHang))]
        public IHttpActionResult DeleteMatHang(string id)
        {
            MatHang matHang = db.matHangs.Find(id);
            if (matHang == null)
            {
                return NotFound();
            }

            db.matHangs.Remove(matHang);
            db.SaveChanges();

            return Ok(matHang);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool MatHangExists(string id)
        {
            return db.matHangs.Count(e => e.IDMH == id) > 0;
        }
    }
}