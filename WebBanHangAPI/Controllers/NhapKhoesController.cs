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
        
        [Route("GetPhieuNhapsSanPhams/{ID}")]
        [ResponseType(typeof(PhieuNhap))]
        public IHttpActionResult GetPhieuNhapsSanPhams(string ID)
        {
            PhieuNhap phieuNhap = db.phieuNhaps.Find(ID);
            if (phieuNhap == null)
            {
                return NotFound();
            }

            var listNK = phieuNhap.NhapKhos.ToList();


            var join = from nk in listNK
                       join sp in db.sanPhams on nk.IDSP equals sp.IDSP
                       select new
                       {
                           IDNK = nk.IDNK,
                           Anh = sp.Anh,
                           IDSP = sp.IDSP,
                           TenSP = sp.TenSP,
                           SoLuong = nk.SoLuong,
                           DonGia = sp.DonGia,
                           ThanhTien = sp.DonGia * nk.SoLuong,

                       };
            return Ok(join);
        }
        
        [Route("getJoinSanPhamsNhapKhosNhanViensPhieuNhaps/{ID}")]
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult getJoinSanPhamsNhapKhosPhieuNhaps(string ID)
        {

            if(ID == null)
            {
                return NotFound();
            }

            var slnv = db.nhanViens.ToList().Count;

            var findPhieuNhaps = from pn in db.phieuNhaps
                                where pn.IDPN == ID
                                select pn;

            if(findPhieuNhaps != null)
            {

                var pnsJoin = from nv in db.nhanViens
                              join pn in findPhieuNhaps on nv.IDNV equals pn.IDNV
                              join ncc in db.nhaCungCaps on pn.IDNCC equals ncc.IDNCC
                              select new
                              {
                                  IDNV = nv.IDNV,
                                  TenNV = nv.TenNV,
                                  IDPN = pn.IDPN,
                                  TenNCC = ncc.TenNCC,
                                  IDNCC = ncc.IDNCC,
                                  NgayNhap = pn.NgayNhap


                              };

                var pnJoin = from pn in pnsJoin
                             join nk in db.nhapKhos on pn.IDPN equals nk.IDPN
                             join sp in db.sanPhams on nk.IDSP equals sp.IDSP



                             select new
                             {
                                 IDPN = pn.IDPN,
                                 TenNCC = pn.TenNCC,
                                 TenNV = pn.TenNV,
                                 IDNV = pn.IDNV,
                                 IDNCC = pn.IDNCC,
                                 IDNK = nk.IDNK,
                                 IDSP = nk.IDSP,
                                 NgayNhap = pn.NgayNhap,
                                 SoLuong = nk.SoLuong,
                                 TenSP = sp.TenSP,
                                 DonGia = sp.DonGia,
                                 TongTienSP = nk.SoLuong * sp.DonGia,
                                 NgayCapNhat = sp.NgayCapNhat


                             };

                var pnGroup = from pn in pnJoin
                              group pn by new { pn.IDPN, pn.IDNV, pn.TenNV, pn.TenNCC, pn.IDNCC, pn.NgayNhap } into obGroup
                              orderby obGroup.Key.IDPN, obGroup.Key.IDNV, obGroup.Key.IDNCC, obGroup.Key.NgayNhap, obGroup.Key.TenNCC, obGroup.Key.TenNV

                              select new
                              {
                                  IDPN = obGroup.Key.IDPN,
                                  TenNV = obGroup.Key.TenNV,
                                  TenNCC = obGroup.Key.TenNCC,
                                  IDNV = obGroup.Key.IDNV,
                                  IDNCC = obGroup.Key.IDNCC,
                                  NgayNhap = obGroup.Key.NgayNhap,
                                  TongSoLuong = obGroup.Sum(x => x.SoLuong),
                                  TongTien = obGroup.Sum(x => x.TongTienSP),
                              };
                return Ok(pnGroup.ToList());
            }



            return NotFound();
            
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
           if(nhapKhos != null)
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
               
            
            return NotFound();
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