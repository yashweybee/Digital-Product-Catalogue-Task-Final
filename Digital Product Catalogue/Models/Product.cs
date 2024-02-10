using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Digital_Product_Catalogue.Models;

public partial class Product
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;

    public string Description { get; set; } = null!;

    public decimal Price { get; set; }


    [JsonIgnore]
    public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

    [JsonIgnore]
    public virtual ICollection<ProductTag> ProductTags { get; set; } = new List<ProductTag>();

    [JsonIgnore]
    public virtual ICollection<WishList> WishLists { get; set; } = new List<WishList>();
}
