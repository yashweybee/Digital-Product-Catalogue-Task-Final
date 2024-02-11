using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Digital_Product_Catalogue.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using Microsoft.EntityFrameworkCore;
using System.IO;

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


            return Ok(productGetQuery);
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] WishlistCreateDTO wishlistCreateDTO)
        {
            var wishlistItem = _mapper.Map<WishList>(wishlistCreateDTO);
            _context.Add(wishlistItem);
            await _context.SaveChangesAsync();
            //var partyDTO = _mapper.Map<WishlistDTO>(wishlistItem);
            return Ok("Wishlist Added");
        }


        [HttpDelete("{userId}/{productId}")]
        public async Task<ActionResult> Delete(int userId, int productId)
        {
            var wishlistItemToDelete = _context.WishLists.FirstOrDefault(w => w.ProductId == productId && w.UserId == userId);

            if (wishlistItemToDelete == null)
            {
                return NotFound();
            }

            _context.WishLists.Remove(wishlistItemToDelete);
            _context.SaveChanges();

            return NoContent();
        }

    }
}
