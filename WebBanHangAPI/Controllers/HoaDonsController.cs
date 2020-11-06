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
    [RoutePrefix("HoaDons")]
    public class HoaDonsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        
        [Route("")]
        public ICollection<HoaDon> GethoaDons()
        {
            return db.hoaDons.ToList();
        }

        // Thêm Hóa Đơn Tự Sinh Code
      
        [Route("PostHoaDonGetIdentity")]
        [ResponseType(typeof(HoaDon))]
        public IHttpActionResult PostHoaDonGetIdentity(HoaDon hoaDon)
        {
            using (var entity = new BanHangDBContext())
            {
                hoaDon.IDHD = GetIdentity();
                entity.hoaDons.Add(hoaDon);

                entity.SaveChanges();
            }

            return Ok(hoaDon);
        }
       
        // GET: api/HoaDons/5
        [ResponseType(typeof(HoaDon))]
        public IHttpActionResult GetHoaDon(string id)
        {
            HoaDon hoaDon = db.hoaDons.Find(id);
            if (hoaDon == null)
            {
                return NotFound();
            }

            return Ok(hoaDon);
        }

        // PUT: api/HoaDons/5
        
        [ResponseType(typeof(void))]
        public IHttpActionResult PutHoaDon(string id, HoaDon hoaDon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != hoaDon.IDHD)
            {
                return BadRequest();
            }

            db.Entry(hoaDon).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!HoaDonExists(id))
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

        // POST: api/HoaDons
       
        [ResponseType(typeof(HoaDon))]
        public IHttpActionResult PostHoaDon(HoaDon hoaDon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.hoaDons.Add(hoaDon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (HoaDonExists(hoaDon.IDHD))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = hoaDon.IDHD }, hoaDon);
        }

        // DELETE: api/HoaDons/5
       
        [ResponseType(typeof(HoaDon))]
        public IHttpActionResult DeleteHoaDon(string id)
        {
            HoaDon hoaDon = db.hoaDons.Find(id);
            if (hoaDon == null)
            {
                return NotFound();
            }

            db.hoaDons.Remove(hoaDon);
            db.SaveChanges();

            return Ok(hoaDon);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool HoaDonExists(string id)
        {
            return db.hoaDons.Count(e => e.IDHD == id) > 0;
        }

        public string GetIdentity()
        {
            string ID = "";
            using (var entity = new BanHangDBContext())
            {

                var list = entity.hoaDons.ToList();
                if (list.Count == 0)
                    ID = "HD000";
                else
                {
                    int temp;
                    ID = "HD";
                    temp = Convert.ToInt32(list[list.Count - 1].IDHD.ToString().Substring(2, 3));
                    temp = temp + 1;
                    if (temp < 10)

                        ID = ID + "00";
                    else if (temp < 100)
                        ID = ID + "0";
                    ID = ID + temp.ToString();
                }
                return ID;

            }
        }

    }
}