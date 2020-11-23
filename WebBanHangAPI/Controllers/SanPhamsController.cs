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
using WebBanHangAPI.Models.JoinModel;
using WebBanHangAPI.Models.mvcModels;

namespace WebBanHangAPI.Controllers
{
    [RoutePrefix("SanPhams")]
    public class SanPhamsController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        
        [Route("getSanPhamsID/{key}")]
        public ICollection<SanPham> GetSanPhamsID(string key)
        {
            var matches = from m in db.sanPhams
                          where m.TenSP.ToLower().StartsWith(key.ToLower())
                          select m;

            return matches.ToList();
        }

        [Route("GetJonSanPhamHangSanXuat")]
        public IHttpActionResult GetFindMatHang()
        {
            var join = from hsx in db.hangSXs
                       join sp in db.sanPhams on hsx.IDHSX equals sp.IDHSX
                       
                       select new
                       {
                           IDSP = sp.IDSP,
                           TenSP = sp.TenSP,
                           NgayCapNhat = sp.NgayCapNhat,
                           DonGia = sp.DonGia,
                           Anh = sp.Anh,
                           IDMH = sp.IDMH,
                           IDHSX = sp.IDHSX,
                           TenHSX = hsx.TenHSX

                       };


            return Ok(join.ToList());
        }

        [Route("GetFindMatHang/{id}")]
        public IHttpActionResult GetFindMatHang(string id)
        {
            var join = from hsx in db.hangSXs
                       join sp in db.sanPhams on hsx.IDHSX equals sp.IDHSX
                       where sp.IDMH == id
                       select new
                       {
                           IDSP = sp.IDSP,
                           TenSP = sp.TenSP,
                           NgayCapNhat = sp.NgayCapNhat,
                           DonGia = sp.DonGia,
                           Anh = sp.Anh,
                           IDMH = sp.IDMH,
                           IDHSX = sp.IDHSX,
                           TenHSX = hsx.TenHSX

                       };
           

            return  Ok(join.ToList());
        }
       
        [Route("getJoinSanPhamsNhapKhosPhieuNhaps")]
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult getJoinSanPhamsNhapKhosPhieuNhaps()
        {
            var pnJoin = from pn in db.phieuNhaps
                                     join nk in db.nhapKhos on pn.IDPN equals nk.IDPN
                                     join sp in db.sanPhams on nk.IDSP equals sp.IDSP  
                                     select new
                                     {
                                         IDPN = pn.IDPN,
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

            var pnGroup = from pn in pnJoin.ToList()
                          group pn by new { pn.IDPN, pn.IDNV, pn.IDNCC, pn.NgayNhap } into obGroup
                          orderby obGroup.Key.IDPN, obGroup.Key.IDNV, obGroup.Key.IDNCC, obGroup.Key.NgayNhap
                          select new
                          {
                              IDPN = obGroup.Key.IDPN,
                              IDNV = obGroup.Key.IDNV,
                              IDNCC = obGroup.Key.IDNCC,
                              NgayNhap = obGroup.Key.NgayNhap,
                              TongSoLuong = obGroup.Sum(x=> x.SoLuong),
                              TongTien = obGroup.Sum(x => x.TongTienSP),
                          };
            return Ok(pnGroup.ToList());
        }
        
        [Route("getJoinSanPhamsNhapKhos")]
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult getJoinSanPhamsNhapKhos()
        {

            var pnJoin = from mh in db.matHangs
                         join sp in db.sanPhams on mh.IDMH equals sp.IDMH
                         join nk in db.nhapKhos on sp.IDSP equals nk.IDSP



                         select new
                         {
                             IDMH = sp.IDMH,
                             IDSP = sp.IDSP,
                             TenSP = sp.TenSP,
                             DonGia = sp.DonGia,
                             Anh = sp.Anh,

                             NgayCapNhat = sp.NgayCapNhat,
                             SoLuong = nk.SoLuong,
                             TenMH = mh.TenMH


                         };

            var pnGroup = from sp in pnJoin.ToList()
                          group sp by new { sp.IDMH, sp.IDSP, sp.Anh, sp.TenSP, sp.TenMH, sp.NgayCapNhat, sp.DonGia } into obGroup
                          orderby obGroup.Key.IDSP, obGroup.Key.TenSP, obGroup.Key.TenMH, obGroup.Key.NgayCapNhat, obGroup.Key.DonGia, obGroup.Key.Anh
                          select new
                          {
                              IDMH = obGroup.Key.IDMH,
                              IDSP = obGroup.Key.IDSP,
                              TenSP = obGroup.Key.TenSP,

                              TenMH = obGroup.Key.TenMH,
                              DonGia = obGroup.Key.DonGia,
                              NgayCapNhat = obGroup.Key.NgayCapNhat,
                              Anh = obGroup.Key.Anh,
                              TongSoLuong = obGroup.Sum(x => x.SoLuong),
                              TongTien = obGroup.Sum(x => x.DonGia),
                          };


            return Ok(pnGroup.ToList());
        }

        
        [Route("getJoinSanPhamsMatHangs/{id}")]
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult GetJoinSanPhamsMatHangs(string id)
        {
            
            var joinSanPhams = new List<SanPhamMatHang>();
            using (var db = new BanHangDBContext())
            {
                var sp = db.sanPhams.ToList();
                var mh = db.matHangs.ToList();
                joinSanPhams = sp.Join(// outer sequence 
                      mh,  // inner sequence 
                      sanpham => sanpham.IDMH,  // outerKeySelector
                      mathang => mathang.IDMH,  // innerKeySelector
                      (sanpham, mathang) => new SanPhamMatHang() // result selector
                      {
                          IDSP = sanpham.IDSP,
                          TenSP = sanpham.TenSP,
                          IDHSX = sanpham.IDHSX,
                          DonGia = sanpham.DonGia,
                          NgayCapNhat = sanpham.NgayCapNhat,
                          IDMH = mathang.IDMH,
                          TenMH = mathang.TenMH
                      })
                      .Where(x=>x.IDSP == id)
                      .ToList();

                //sanPhamMatHang = joinSanPhams.Find(x => x.IDSP == id);
            }
           
            return Ok(joinSanPhams);

        }

        
        [Route("getJoinSanPhamsMatHangs")]

        public IHttpActionResult GetJoinSanPhamsMatHangs()
        {

            var slnv = db.nhanViens.ToList().Count;

            var join = from sp in db.sanPhams
                       join mh in db.matHangs on sp.IDMH equals mh.IDMH
                       select new
                       {
                           IDSP = sp.IDSP,
                           TenSP = sp.TenSP,
                           DonGia = sp.DonGia,
                           Anh = sp.Anh,
                           IDHSX = sp.IDHSX,
                           GiaBan = sp.DonGia + (sp.DonGia * 10 / 100) + (sp.DonGia * 30 / 100) + (sp.DonGia *  (slnv * 1.2m * 10/100)),
                           NgayCapNhat = sp.NgayCapNhat,
                           TenMH = mh.TenMH
                       };
            return Ok(join.ToList());
        }
       
        [Route("")]
        public ICollection<SanPham> GetsanPhams()
        {
            return db.sanPhams.ToList();
        }

        // GET: api/SanPhams/5
        [Route("GetFindSanPhamMatHangHangSX/{id}")]
        [ResponseType(typeof(mvcSanPhamMatHangHSX))]
        public IHttpActionResult GetFindSanPhamMatHangHangSX(string id)
        {


            mvcSanPhamMatHangHSX join = (from mh in db.matHangs
                                         join sp in db.sanPhams on mh.IDMH equals sp.IDMH
                                         join hsx in db.hangSXs on sp.IDHSX equals hsx.IDHSX
                                         where (sp.IDSP == id)
                                         select new mvcSanPhamMatHangHSX()
                                         {
                                             IDSP = sp.IDSP,
                                             TenSP = sp.TenSP,
                                             DonGia = sp.DonGia,
                                             Anh = sp.Anh,

                                             NgayCapNhat = sp.NgayCapNhat,
                                             IDMH = mh.IDMH,
                                             TenMH = mh.TenMH,
                                             IDHSX = hsx.IDHSX,
                                             TenHSX = hsx.TenHSX
                                         }).FirstOrDefault(); ;
               
                return Ok(join);
 
        }

        
        [Route("GetSanPham/{id}")]
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult GetSanPham(string id)
        {
            SanPham sanPham = db.sanPhams.Find(id);
            if (sanPham == null)
            {
                return NotFound();
            }

            return Ok(sanPham);
        }

        // PUT: api/SanPhams/5
       
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSanPham(string id, SanPham sanPham)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != sanPham.IDSP)
            {
                return BadRequest();
            }

            db.Entry(sanPham).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SanPhamExists(id))
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

        // POST: api/SanPhams
        
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult PostSanPham(SanPham sanPham)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.sanPhams.Add(sanPham);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (SanPhamExists(sanPham.IDSP))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = sanPham.IDSP }, sanPham);
        }

        // DELETE: api/SanPhams/5
        
        [Route("Delete/{id}")]
        [ResponseType(typeof(SanPham))]
        public IHttpActionResult DeleteSanPham(string id)
        {
            SanPham sanPham = db.sanPhams.Find(id);
            if (sanPham == null)
            {
                return NotFound();
            }

            db.sanPhams.Remove(sanPham);
            db.SaveChanges();

            return Ok(sanPham);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
        private bool SanPhamExists(string id)
        {
            return db.sanPhams.Count(e => e.IDSP == id) > 0;
        }
    }
}