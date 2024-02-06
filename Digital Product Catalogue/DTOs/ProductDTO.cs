using Digital_Product_Catalogue.Models;

namespace Digital_Product_Catalogue.DTOs
{
    public class ProductDTO
    {

        public int Id { get; set; }

        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }

        public List<ProductTagDTO> Tags { get; set; }
        public List<ProductImageDTO> images { get; set; }

        //public virtual ICollection<ProductImage> ProductImages { get; set; } = new List<ProductImage>();

        //public virtual ICollection<ProductTag> ProductTags { get; set; } = new List<ProductTag>();

    }
}
