using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Security.Claims;
using System.Threading.Tasks;

namespace WebBanHangAPI.Models.BasicAut
{
    public class MyAuthorizationServerProvider  : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {

            string strURLOld = HttpContext.Current.Request.UrlReferrer.ToString();
            string loginUser = "Home";
            string loginCustomer = "ShareOutSide";
            var c = 0;
            if (strURLOld.Contains(loginUser))
            {
                var b = 0;
                using (UserMasterRepository _repo = new UserMasterRepository())
                {
                    var user = _repo.ValidateUser(context.UserName, context.Password);
                    if (user == null)
                    {
                        context.SetError("invalid_grant", "Provided username and password is incorrect");
                        return;
                    }
                    var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                    identity.AddClaim(new Claim(ClaimTypes.Role, user.UserRoler));
                    identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
                    identity.AddClaim(new Claim("Email", user.UserEmail));
                    identity.AddClaim(new Claim("Name", user.Name));
                    context.Validated(identity);
                }
            }


            if (strURLOld.Contains(loginCustomer))
            {
                using (CustomerMasterRepository _repo = new CustomerMasterRepository())
                {
                    var b = 0;
                    var user = _repo.ValidateUserCustomer(context.UserName, context.Password);
                    if (user == null)
                    {
                        context.SetError("invalid_grant", "Provided username and password is incorrect");
                        return;
                    }
                    var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                    identity.AddClaim(new Claim(ClaimTypes.Role, user.UserRoler));
                    identity.AddClaim(new Claim(ClaimTypes.Name, user.UserName));
                    identity.AddClaim(new Claim("Email", user.UserEmail));
                    identity.AddClaim(new Claim("Name", user.Name));
                    context.Validated(identity);
                }
            }



        }
    }
}