namespace Digital_Product_Catalogue.DTOs
{
    public class ProductFeaturedImageCreateDTO
    {

        public int ProductId { get; set; }

        public IFormFile FeaturedImg { get; set; } = null!;

    }
}
