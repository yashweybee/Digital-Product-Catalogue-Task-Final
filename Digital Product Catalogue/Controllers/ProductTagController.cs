using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Digital_Product_Catalogue.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace Digital_Product_Catalogue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductTagController : ControllerBase
    {
        public DigitalProductCatalogueContext _context { get; }
        public IMapper _mapper { get; }

        public ProductTagController(DigitalProductCatalogueContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpGet]
        public async Task<ActionResult<List<ProductTagDTO>>> Get()
        {

            var productTagQUery = _context.ProductTags.Select(p => p.TagName).Distinct();
            var productTags = await productTagQUery.ToListAsync();

            return Ok(productTags);
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




    }
}
