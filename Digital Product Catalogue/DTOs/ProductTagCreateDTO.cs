using Digital_Product_Catalogue.Models;

namespace Digital_Product_Catalogue.DTOs
{
    public class ProductTagCreateDTO
    {

        public int ProductId { get; set; }

        public string TagName { get; set; } = null!;

    }
}
