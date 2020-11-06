using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebBanHangAPI.DataContextLayer;

namespace WebBanHangAPI.Models.BasicAut
{
    public class CustomerMasterRepository : IDisposable
    {
        BanHangDBContext context = new BanHangDBContext();
        //This method is used to check and validate the user credentials
        public UserCustomer ValidateUserCustomer(string username, string password)
        {
            return context.UserCustomers.FirstOrDefault(user =>
            user.UserName.Equals(username, StringComparison.OrdinalIgnoreCase)
            && user.UserPassWord == password);
        }
        public void Dispose()
        {
            context.Dispose();
        }
    }
}