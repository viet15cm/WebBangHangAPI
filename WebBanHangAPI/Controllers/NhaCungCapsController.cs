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
    [RoutePrefix("NhaCungCaps")]
    public class NhaCungCapsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        
        [Route("GetNhaCungCapID/{key}")]
        public ICollection<NhaCungCap> GetNhaCungCapID(string key)
        {
            var matches = from m in db.nhaCungCaps
                          where m.TenNCC.ToLower().StartsWith(key.ToLower())
                          select m;

            return matches.ToList();
        }
        // GET: api/NhaCungCaps
        
        public ICollection<NhaCungCap> GetnhaCungCaps()
        {
            return db.nhaCungCaps.ToList();
        }

        // GET: api/NhaCungCaps/5
       
        [ResponseType(typeof(NhaCungCap))]
        public IHttpActionResult GetNhaCungCap(string id)
        {
            NhaCungCap nhaCungCap = db.nhaCungCaps.Find(id);
            if (nhaCungCap == null)
            {
                return NotFound();
            }

            return Ok(nhaCungCap);
        }

        // PUT: api/NhaCungCaps/5
       
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNhaCungCap(string id, NhaCungCap nhaCungCap)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhaCungCap.IDNCC)
            {
                return BadRequest();
            }

            db.Entry(nhaCungCap).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhaCungCapExists(id))
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

        // POST: api/NhaCungCaps
        
        [ResponseType(typeof(NhaCungCap))]
        public IHttpActionResult PostNhaCungCap(NhaCungCap nhaCungCap)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.nhaCungCaps.Add(nhaCungCap);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NhaCungCapExists(nhaCungCap.IDNCC))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = nhaCungCap.IDNCC }, nhaCungCap);
        }

        // DELETE: api/NhaCungCaps/5
       
        [ResponseType(typeof(NhaCungCap))]
        public IHttpActionResult DeleteNhaCungCap(string id)
        {
            NhaCungCap nhaCungCap = db.nhaCungCaps.Find(id);
            if (nhaCungCap == null)
            {
                return NotFound();
            }

            db.nhaCungCaps.Remove(nhaCungCap);
            db.SaveChanges();

            return Ok(nhaCungCap);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhaCungCapExists(string id)
        {
            return db.nhaCungCaps.Count(e => e.IDNCC == id) > 0;
        }
    }
}