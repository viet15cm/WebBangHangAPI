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
    [RoutePrefix("NhapHoaDons")]
    public class NhapHoaDonsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        // GET: api/NhapHoaDons
        
        [Route("")]
        public ICollection<NhapHoaDon> GetnhapHoaDons()
        {
            return db.nhapHoaDons.ToList();
        }

        // GET: api/NhapHoaDons/5
        
        [ResponseType(typeof(NhapHoaDon))]
        public IHttpActionResult GetNhapHoaDon(string id)
        {
            NhapHoaDon nhapHoaDon = db.nhapHoaDons.Find(id);
            if (nhapHoaDon == null)
            {
                return NotFound();
            }

            return Ok(nhapHoaDon);
        }

        // PUT: api/NhapHoaDons/5
        
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNhapHoaDon(string id, NhapHoaDon nhapHoaDon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhapHoaDon.IDNHD)
            {
                return BadRequest();
            }

            db.Entry(nhapHoaDon).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhapHoaDonExists(id))
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


        //API them phieu nhap tu sinh code
        
        [Route("PostNhapHoaDonGetIdentity")]
        [ResponseType(typeof(PhieuNhap))]
        public IHttpActionResult PostNhapHoaDonGetIdentity(NhapHoaDon nhapHoaDon)
        {
            using (var entity = new BanHangDBContext())
            {
                nhapHoaDon.IDNHD = GetIdentity();
                entity.nhapHoaDons.Add(nhapHoaDon);

                entity.SaveChanges();
            }

            return Ok(nhapHoaDon);
        }

        // POST: api/NhapHoaDons
        
        [ResponseType(typeof(NhapHoaDon))]
        public IHttpActionResult PostNhapHoaDon(NhapHoaDon nhapHoaDon)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.nhapHoaDons.Add(nhapHoaDon);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NhapHoaDonExists(nhapHoaDon.IDNHD))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = nhapHoaDon.IDNHD }, nhapHoaDon);
        }

        // DELETE: api/NhapHoaDons/5
        
        [ResponseType(typeof(NhapHoaDon))]
        public IHttpActionResult DeleteNhapHoaDon(string id)
        {
            NhapHoaDon nhapHoaDon = db.nhapHoaDons.Find(id);
            if (nhapHoaDon == null)
            {
                return NotFound();
            }

            db.nhapHoaDons.Remove(nhapHoaDon);
            db.SaveChanges();

            return Ok(nhapHoaDon);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhapHoaDonExists(string id)
        {
            return db.nhapHoaDons.Count(e => e.IDNHD == id) > 0;
        }

        public string GetIdentity()
        {
            string ID = "";
            using (var entity = new BanHangDBContext())
            {

                var list = entity.nhapHoaDons.ToList();
                if (list.Count == 0)
                    ID = "NHD000";
                else
                {
                    int temp;
                    ID = "NHD";
                    temp = Convert.ToInt32(list[list.Count - 1].IDNHD.ToString().Substring(3, 3));
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