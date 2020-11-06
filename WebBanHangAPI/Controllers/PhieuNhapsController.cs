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
using WebBanHangAPI.Models.JoinModel;

namespace WebBanHangAPI.Controllers
{
    [RoutePrefix("PhieuNhaps")]
    public class PhieuNhapsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();


        /*
        [Route("GetIdentity")]
        [ResponseType(typeof(string))]
        public IHttpActionResult GetIdentity()
        {
            string ID = "";
            using(var entity = new BanHangDBContext())
            {
                var list = entity.phieuNhaps.ToList();
                if (list.Count == 0)               
                    ID = "PN000";
                else
                {
                    int temp;
                    ID = "PN";
                    temp = Convert.ToInt32(list[list.Count - 1].IDPN.ToString().Substring(2, 3));
                    temp = temp + 1;
                    if (temp < 10)

                        ID = ID + "00";
                    else if (temp < 100)
                        ID = ID + "0";
                    ID = ID + temp.ToString();
                }

                
            }
            return Ok(ID);
        }
        */
        [Route("")]
        
        public ICollection<PhieuNhap> GetphieuNhaps()
        {
            return db.phieuNhaps.ToList();
        }

        // GET: api/PhieuNhaps/5
        [ResponseType(typeof(PhieuNhap))]
        
        public IHttpActionResult GetPhieuNhap(string id)
        {
            PhieuNhap phieuNhap = db.phieuNhaps.Find(id);
            if (phieuNhap == null)
            {
                return NotFound();
            }

            return Ok(phieuNhap);
        }

        // PUT: api/PhieuNhaps/5
       
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPhieuNhap(string id, PhieuNhap phieuNhap)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != phieuNhap.IDPN)
            {
                return BadRequest();
            }

            db.Entry(phieuNhap).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PhieuNhapExists(id))
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
       
        [Route("PostPhieuNhapGetIdentity")]
        [ResponseType(typeof(PhieuNhap))]
        public IHttpActionResult PostPhieuNhapGetIdentity(PhieuNhap phieuNhap)
        {                            
                using (var entity = new BanHangDBContext())
                {                   
                    phieuNhap.IDPN = GetIdentity();
                    entity.phieuNhaps.Add(phieuNhap);

                    entity.SaveChanges();
                }
           
            return Ok(phieuNhap);
        }

        // POST: api/PhieuNhaps
        
        [ResponseType(typeof(PhieuNhap))]
        public IHttpActionResult PostPhieuNhap(PhieuNhap phieuNhap)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.phieuNhaps.Add(phieuNhap);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (PhieuNhapExists(phieuNhap.IDPN))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = phieuNhap.IDPN }, phieuNhap);
        }

        // DELETE: api/PhieuNhaps/5
        
        [ResponseType(typeof(PhieuNhap))]
        public IHttpActionResult DeletePhieuNhap(string id)
        {
            PhieuNhap phieuNhap = db.phieuNhaps.Find(id);
            if (phieuNhap == null)
            {
                return NotFound();
            }

            db.phieuNhaps.Remove(phieuNhap);
            db.SaveChanges();

            return Ok(phieuNhap);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PhieuNhapExists(string id)
        {
            return db.phieuNhaps.Count(e => e.IDPN == id) > 0;
        }

        public string GetIdentity()
        {
            string ID = "";
            using (var entity = new BanHangDBContext())
            {

                var list = entity.phieuNhaps.ToList();
                if (list.Count == 0)
                    ID = "PN000";
                else
                {
                    int temp;
                    ID = "PN";
                    temp = Convert.ToInt32(list[list.Count - 1].IDPN.ToString().Substring(2, 3));
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