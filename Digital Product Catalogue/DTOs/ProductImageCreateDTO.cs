namespace Digital_Product_Catalogue.DTOs
{
    public class ProductImageCreateDTO
    {
        public int ProductId { get; set; }

        public byte[] Path { get; set; } = null!;

        public bool IsFeatured { get; set; }

    }
}
