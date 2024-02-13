namespace Digital_Product_Catalogue.DTOs
{
    public class ProductEditDTO
    {
        public string? Name { get; set; } = null!;

        public string? Description { get; set; } = null!;

        public decimal? Price { get; set; }


        public string[] ProductImages { get; set; } = null!;

        public string FeaturedImage { get; set; } = null!;

        public string ProductTags { get; set; }

    }
}
