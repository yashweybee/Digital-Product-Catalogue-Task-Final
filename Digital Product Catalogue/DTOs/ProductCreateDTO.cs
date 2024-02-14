using Digital_Product_Catalogue.Models;
using System.Text;
using System.Text.Json.Serialization;

namespace Digital_Product_Catalogue.DTOs
{
    public class ProductCreateDTO
    {
        public string? Name { get; set; } = null!;

        public string? Description { get; set; } = null!;

        public decimal? Price { get; set; }

        public List<IFormFile>? ProductImages { get; set; } = new List<IFormFile>();

        public IFormFile? FeaturedImage { get; set; } = null!;

        public string ProductTags { get; set; }

    }

    //public class ImageDTO
    //{
    //    public int ProductId { get; set; }

    //    public byte[] Path { get; set; } = null!;

    //    public bool IsFeatured { get; set; } = false;

    //}
}
