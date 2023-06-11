using System;
using System.Collections.Generic;

#nullable disable

namespace WebApi.Models
{
    public partial class User
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string SecondName { get; set; }
        public int? Age { get; set; }
        public string Email { get; set; }
    }
}
