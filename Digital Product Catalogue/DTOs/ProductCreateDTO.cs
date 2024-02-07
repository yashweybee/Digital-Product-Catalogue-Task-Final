using Digital_Product_Catalogue.Models;
using System.Text;
using System.Text.Json.Serialization;

namespace Digital_Product_Catalogue.DTOs
{
    public class ProductCreateDTO
    {
        public string Name { get; set; } = null!;

        public string Description { get; set; } = null!;

        public decimal Price { get; set; }


        //public List<string> ProductImages { get; set; } = new List<string>();
        //public byte[] FeaturedImage { get; set; } = null!;

        //public List<string> ProductTags { get; set; } = new List<string>();

        public string ProductTags { get; set; }



        //public List<ImageDTO> ProductImages { get; set; } = new List<ImageDTO>();
        //public List<ImageDTO> FeaturedImage { get; set; } = new List<ImageDTO>();

    }

    public class ImageDTO
    {
        public int ProductId { get; set; }

        public byte[] Path { get; set; } = null!;

        public bool IsFeatured { get; set; } = false;

    }
}
