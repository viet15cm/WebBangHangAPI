using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Web.Http;
using System.Web.Http.Description;
using WebBanHangAPI.DataContextLayer;
using WebBanHangAPI.Models;

namespace WebBanHangAPI.Controllers
{
    [RoutePrefix("UsersCustomer")]
    public class UserCustomersController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        // GET: api/UserCustomers
        public ICollection<UserCustomer> GetUserCustomers()
        {
            return db.UserCustomers.ToList();
        }

        [Authorize(Roles = "Customer")]
        [HttpGet]
        [Route("GetUserName")]
        public IHttpActionResult GetUserName()
        {
            var identity = (ClaimsIdentity)User.Identity;
            var Name = identity.Claims
                      .FirstOrDefault(c => c.Type == "Name").Value;

            //var UserName = identity.Name;

            return Ok(Name);
        }

        // GET: api/UserCustomers/5
        [ResponseType(typeof(UserCustomer))]
        public IHttpActionResult GetUserCustomer(string id)
        {
            UserCustomer userCustomer = db.UserCustomers.Find(id);
            if (userCustomer == null)
            {
                return NotFound();
            }

            return Ok(userCustomer);
        }

        // PUT: api/UserCustomers/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUserCustomer(string id, UserCustomer userCustomer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != userCustomer.UserID)
            {
                return BadRequest();
            }

            db.Entry(userCustomer).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserCustomerExists(id))
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

        // POST: api/UserCustomers
        [ResponseType(typeof(UserCustomer))]
        public IHttpActionResult PostUserCustomer(UserCustomer userCustomer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.UserCustomers.Add(userCustomer);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = userCustomer.UserID }, userCustomer);
        }

        // DELETE: api/UserCustomers/5
        [ResponseType(typeof(UserCustomer))]
        public IHttpActionResult DeleteUserCustomer(string id)
        {
            UserCustomer userCustomer = db.UserCustomers.Find(id);
            if (userCustomer == null)
            {
                return NotFound();
            }

            db.UserCustomers.Remove(userCustomer);
            db.SaveChanges();

            return Ok(userCustomer);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserCustomerExists(string id)
        {
            return db.UserCustomers.Count(e => e.UserID == id) > 0;
        }
    }
}