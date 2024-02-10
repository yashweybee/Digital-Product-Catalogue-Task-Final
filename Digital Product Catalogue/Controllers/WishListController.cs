using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Digital_Product_Catalogue.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Digital_Product_Catalogue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    //[Authorize]
    public class WishListController : ControllerBase
    {
        public DigitalProductCatalogueContext _context { get; }
        public IMapper _mapper { get; }
        public WishListController(DigitalProductCatalogueContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("{Id}")]
        public async Task<ActionResult<List<ProductDTO>>> Get(int Id)
        {
            var productGetQuery = from wishlist in _context.WishLists
                                  join products in _context.Products on wishlist.ProductId equals products.Id into productWishlistGroup
                                  where wishlist.UserId == Id
                                  from product in productWishlistGroup
                                  select new
                                  {
                                      Product = product,
                                      ProductTags = _context.ProductTags.Where(pt => pt.ProductId == product.Id).ToList(),
                                      ProductImages = _context.ProductImages.Where(pi => pi.ProductId == product.Id).ToList(),
                                  };

            //var products2 = await productGetQuery.ToListAsync();

            //var mappedProducts = products2.Select(pr => new
            //{
            //    id = pr.Product.Id,
            //    name = pr.Product.Name,
            //    description = pr.Product.Description,
            //    price = pr.Product.Price,
            //    tags = _mapper.Map<List<ProductTagDTO>>(pr.ProductTags),
            //    images = _mapper.Map<List<ProductImageDTO>>(pr.ProductImages),
            //}).ToList();

            return Ok(productGetQuery);
        }


        //[HttpDelete("{ Id}")]
        //public async Task<ActionResult> Delete(int Id)
        //{

        //    var product = await _context.WishLists.FindAsync(p => );

        //    if (product == null)
        //    {
        //        return NotFound();
        //    }
        //    var productTagsData = _context.ProductTags.Where(tag => tag.ProductId == Id);
        //    var productImagesToDelete = _context.ProductImages.Where(pi => pi.ProductId == Id);
        //    _context.ProductImages.RemoveRange(productImagesToDelete);
        //    _context.ProductTags.RemoveRange(productTagsData);
        //    _context.Products.Remove(product);
        //    await _context.SaveChangesAsync();
        //    return NoContent();
        //}


    }
}
