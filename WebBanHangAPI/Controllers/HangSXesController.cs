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
    [RoutePrefix("HangSXs")]
    public class HangSXesController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        // GET: api/HangSXes
        [Route("")]
        public IQueryable<HangSX> GethangSXs()
        {
            return db.hangSXs;
        }

        // GET: api/HangSXes/5
        [Route("GetHangSX/{id}")]
        [ResponseType(typeof(HangSX))]
        public IHttpActionResult GetHangSX(string id)
        {
            HangSX hangSX = db.hangSXs.Find(id);
            if (hangSX == null)
            {
                return NotFound();
            }

            return Ok(hangSX);
        }

        [Route("GetAutoCompleteID/{key}")]
        public ICollection<HangSX> GetAutoCompleteID(string key)
        {
            var lisID = from hsx in db.hangSXs
                        where hsx.TenHSX.ToLower().StartsWith(key.ToLower())
                        select hsx;
            return lisID.ToList();
        }

        // PUT: api/HangSXes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHangSX(string id, HangSX hangSX)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hangSX.IDHSX)
            {
                return BadRequest();
            }

            db.Entry(hangSX).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HangSXExists(id))
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

        // POST: api/HangSXes
        [ResponseType(typeof(HangSX))]
        public IHttpActionResult PostHangSX(HangSX hangSX)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.hangSXs.Add(hangSX);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (HangSXExists(hangSX.IDHSX))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = hangSX.IDHSX }, hangSX);
        }

        // DELETE: api/HangSXes/5
        [ResponseType(typeof(HangSX))]
        public IHttpActionResult DeleteHangSX(string id)
        {
            HangSX hangSX = db.hangSXs.Find(id);
            if (hangSX == null)
            {
                return NotFound();
            }

            db.hangSXs.Remove(hangSX);
            db.SaveChanges();

            return Ok(hangSX);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HangSXExists(string id)
        {
            return db.hangSXs.Count(e => e.IDHSX == id) > 0;
        }
    }
}