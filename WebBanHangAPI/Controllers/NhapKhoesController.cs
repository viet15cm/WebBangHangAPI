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
    [RoutePrefix("NhapKhoes")]
    public class NhapKhoesController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();


       /* [Route("GetIdentity")]
        [ResponseType(typeof(string))]
        public IHttpActionResult GetIdentity()
        {
            string ID = "";
            using (var entity = new BanHangDBContext())
            {
                var list = entity.phieuNhaps.ToList();
                if (list.Count == 0)
                    ID = "NK000";
                else
                {
                    int temp;
                    ID = "NK";
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
        // GET: api/NhapKhoes
        [Route("")]
      
        public ICollection<NhapKho> GetnhapKhos()
        {
            return db.nhapKhos.ToList();
        }

        // GET: api/NhapKhoes/5
        [ResponseType(typeof(NhapKho))]
        public IHttpActionResult GetNhapKho(string id)
        {
            NhapKho nhapKho = db.nhapKhos.Find(id);
            if (nhapKho == null)
            {
                return NotFound();
            }

            return Ok(nhapKho);
        }

        // PUT: api/NhapKhoes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNhapKho(string id, NhapKho nhapKho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != nhapKho.IDNK)
            {
                return BadRequest();
            }

            db.Entry(nhapKho).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NhapKhoExists(id))
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

        [Route("PostListNhapKho")]
        [ResponseType(typeof(NhapKho[]))]
        public IHttpActionResult PostListNhapKho(NhapKho[] nhapKhos)
        {
            
                for (int i = 0; i < nhapKhos.Length; i++)
                {                    
                    using (var entity = new BanHangDBContext())
                    {                                              
                        nhapKhos[i].IDNK = GetIdentity();
                        entity.nhapKhos.Add(nhapKhos[i]);
                        entity.SaveChanges();
                    }

                }       
            
            return Ok(nhapKhos);
        }

        // POST: api/NhapKhoes
        [ResponseType(typeof(NhapKho))]
        public IHttpActionResult PostNhapKho(NhapKho nhapKho)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.nhapKhos.Add(nhapKho);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (NhapKhoExists(nhapKho.IDNK))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = nhapKho.IDNK }, nhapKho);
        }

        // DELETE: api/NhapKhoes/5
        [ResponseType(typeof(NhapKho))]
        public IHttpActionResult DeleteNhapKho(string id)
        {
            NhapKho nhapKho = db.nhapKhos.Find(id);
            if (nhapKho == null)
            {
                return NotFound();
            }

            db.nhapKhos.Remove(nhapKho);
            db.SaveChanges();

            return Ok(nhapKho);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NhapKhoExists(string id)
        {
            return db.nhapKhos.Count(e => e.IDNK == id) > 0;
        }

        public string GetIdentity()
        {
            string ID = "";
            using (var entity = new BanHangDBContext())
            {

                var list = entity.nhapKhos.ToList();
                if (list.Count == 0)
                    ID = "NK000";
                else
                {
                    int temp;
                    ID = "NK";
                    temp = Convert.ToInt32(list[list.Count - 1].IDNK.ToString().Substring(2, 3));
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