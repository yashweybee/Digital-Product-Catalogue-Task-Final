using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Digital_Product_Catalogue.Models;
using System.IO;

namespace Digital_Product_Catalogue.Helpers
{
    public class ApplicationMappers : Profile
    {
        public ApplicationMappers()
        {
            CreateMap<Product, ProductDTO>().ReverseMap();
            CreateMap<ProductCreateDTO, Product>();

            CreateMap<ProductEditDTO, Product>();


            CreateMap<ProductImage, ProductImageDTO>().ReverseMap();
            CreateMap<ProductImageCreateDTO, ProductImage>();

            CreateMap<ProductTag, ProductTagDTO>().ReverseMap();
            CreateMap<ProductTagCreateDTO, ProductTag>();

            CreateMap<WishList, WishlistDTO>().ReverseMap();
            CreateMap<WishlistCreateDTO, WishList>();

        }
    }
}
