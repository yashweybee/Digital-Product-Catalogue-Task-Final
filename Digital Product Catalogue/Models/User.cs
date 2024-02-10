using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Digital_Product_Catalogue.Models;

public partial class User
{
    public int Id { get; set; }

    public string UserName { get; set; } = null!;

    public string Password { get; set; } = null!;

    [JsonIgnore]
    public virtual ICollection<WishList> WishLists { get; set; } = new List<WishList>();
}
