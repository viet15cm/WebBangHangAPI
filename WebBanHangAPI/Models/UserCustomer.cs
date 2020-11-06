using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace WebBanHangAPI.Models
{
    public class UserCustomer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string UserID { get; set; }

        public string UserName { get; set; }
        public string UserPassWord { get; set; }
        public string UserRoler { get; set; }
        public string UserEmail { get; set; }
        public string Name { get; set; }
    }
}