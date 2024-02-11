using Digital_Product_Catalogue.Models;

namespace Digital_Product_Catalogue.DTOs
{
    public class WishlistCreateDTO
    {
        //public int Id { get; set; }

        public int UserId { get; set; }

        public int ProductId { get; set; }

        //public virtual Product Product { get; set; } = null!;

        //public virtual User User { get; set; } = null!;

    }
}
