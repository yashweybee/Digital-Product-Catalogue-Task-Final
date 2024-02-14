namespace Digital_Product_Catalogue.DTOs
{
    public class ProductOtherImagesCreateDTO
    {

        public int ProductId { get; set; }

        public List<IFormFile> OtherImages { get; set; } = new List<IFormFile>();
    }
}
