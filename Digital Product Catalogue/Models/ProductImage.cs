using System;
using System.Collections.Generic;

namespace Digital_Product_Catalogue.Models;

public partial class ProductImage
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string Path { get; set; } = null!;

    public bool IsFeatured { get; set; }

    public virtual Product Product { get; set; } = null!;
}
