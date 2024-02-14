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


        [HttpGet("{Id}", Name = "GetTag")]
        public async Task<ActionResult<ProductTagDTO>> Get(int Id)
        {

            var tag = await _context.ProductTags.FirstOrDefaultAsync(x => x.Id == Id);
            var tagDTO = _mapper.Map<ProductTagDTO>(tag);
            return tagDTO;
        }


        [HttpPost]
        public async Task<ActionResult> PostTag([FromBody] ProductTagCreateDTO productTagCreateDTO)
        {

            var productTag = new ProductTag
            {
                ProductId = productTagCreateDTO.ProductId,
                TagName = productTagCreateDTO.TagName,
            };

            var productTagToAdd = _mapper.Map<ProductTag>(productTag);
            _context.ProductTags.Add(productTagToAdd);
            await _context.SaveChangesAsync();
            var tagDTO = _mapper.Map<ProductTagDTO>(productTagToAdd);
            return new CreatedAtRouteResult("GetTag", new { productTagToAdd.Id }, tagDTO);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {
            var productTag = await _context.ProductTags.FindAsync(Id);
            if (productTag == null)
            {
                return NotFound();
            }
            _context.ProductTags.Remove(productTag);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
