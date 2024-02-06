using Digital_Product_Catalogue.Models;

namespace Digital_Product_Catalogue.DTOs
{
    public class ProductTagCreateDTO
    {

        public int ProductId { get; set; }

        public string TagName { get; set; } = null!;

        //public virtual Product Product { get; set; } = null!;

        //public virtual Tag Tag { get; set; } = null!;
    }
}
