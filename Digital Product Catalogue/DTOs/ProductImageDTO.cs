namespace Digital_Product_Catalogue.DTOs
{
    public class ProductImageDTO
    {

        public int Id { get; set; }

        public int ProductId { get; set; }

        public string Path { get; set; } = null!;

        public bool IsFeatured { get; set; }
    }
}
