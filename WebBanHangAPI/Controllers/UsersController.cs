using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Security.Claims;
using System.Threading;
using System.Web.Http;
using System.Web.Http.Description;
using WebBanHangAPI.DataContextLayer;
using WebBanHangAPI.Models;
using WebBanHangAPI.Models.BasicAut;

namespace WebBanHangAPI.Controllers
{

    [RoutePrefix("Users")]
    public class UsersController : ApiController
    {
        private BanHangDBContext db = new BanHangDBContext();

        // GET: api/Users
        [Authorize(Roles = "Admin")]
        [HttpGet]
     
        [Route("")]
       
        public ICollection<User> Getusers()
        {
            return db.users.ToList();        
        }

        [Authorize(Roles = "Admin, SuperAdmin")]
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

        // GET: api/Users/5

        [ResponseType(typeof(User))]
        public IHttpActionResult GetUser(string id)
        {
            string username = Thread.CurrentPrincipal.Identity.Name;
            User user = db.users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        // PUT: api/Users/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutUser(string id, User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != user.UserName)
            {
                return BadRequest();
            }

            db.Entry(user).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
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

        // POST: api/Users
        
        [ResponseType(typeof(User))]
        public IHttpActionResult PostUser(User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.users.Add(user);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (UserExists(user.UserName))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = user.UserName }, user);
        }

        // DELETE: api/Users/5
        [ResponseType(typeof(User))]
        public IHttpActionResult DeleteUser(string id)
        {
            User user = db.users.Find(id);
            if (user == null)
            {
                return NotFound();
            }

            db.users.Remove(user);
            db.SaveChanges();

            return Ok(user);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool UserExists(string id)
        {
            return db.users.Count(e => e.UserName == id) > 0;
        }
    }
}