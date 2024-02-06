using System;
using System.Collections.Generic;

namespace Digital_Product_Catalogue.Models;

public partial class ProductTag
{
    public int Id { get; set; }

    public int ProductId { get; set; }

    public string TagName { get; set; } = null!;

    public virtual Product Product { get; set; } = null!;
}
