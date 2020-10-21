using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebBanHangAPI.DataContextLayer;

namespace WebBanHangAPI.Models.BasicAut
{
    public class UserMasterRepository : IDisposable
    {

        BanHangDBContext context = new BanHangDBContext();
        //This method is used to check and validate the user credentials
        public User ValidateUser(string username, string password)
        {
            return context.users.FirstOrDefault(user =>
            user.UserName.Equals(username, StringComparison.OrdinalIgnoreCase)
            && user.UserPassWord == password);
        }
        public void Dispose()
        {
            context.Dispose();
        }

    }
}