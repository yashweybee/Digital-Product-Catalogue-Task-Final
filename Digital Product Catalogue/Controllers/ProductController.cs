using Microsoft.AspNetCore.Mvc;
using Digital_Product_Catalogue.Models;
using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.CodeAnalysis;


namespace Digital_Product_Catalogue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        public DigitalProductCatalogueContext _context { get; }
        public IMapper _mapper { get; }

        public ProductController(DigitalProductCatalogueContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<List<ProductDTO>>> Get()
        {

            var productGetQuery = from product in _context.Products
                                  select new
                                  {
                                      Product = product,
                                      ProductTags = _context.ProductTags.Where(pt => pt.ProductId == product.Id).ToList(),
                                      ProductImages = _context.ProductImages.Where(pi => pi.ProductId == product.Id).ToList(),
                                  };


            var products = await productGetQuery.ToListAsync();

            var mappedProducts = products.Select(pr =>
            {
                var productDTO = _mapper.Map<ProductDTO>(pr.Product);
                productDTO.Tags = _mapper.Map<List<ProductTagDTO>>(pr.ProductTags);
                productDTO.images = _mapper.Map<List<ProductImageDTO>>(pr.ProductImages);
                return productDTO;
            }).ToList();

            return Ok(mappedProducts);
        }


        [HttpGet("{Id}", Name = "GetProduct")]
        public async Task<ActionResult<ProductDTO>> Get(int Id)
        {
            var productGetQuery = from product2 in _context.Products
                                  join productTags in _context.ProductTags on product2.Id equals productTags.ProductId into productTagsGroup
                                  where product2.Id == Id
                                  select new
                                  {
                                      Product = product2,
                                      ProductTags = productTagsGroup.ToList()
                                  };


            var products = await productGetQuery.ToListAsync();

            var mappedProduct = products.Select(pr =>
            {
                var productDTO = _mapper.Map<ProductDTO>(pr.Product);
                productDTO.Tags = _mapper.Map<List<ProductTagDTO>>(pr.ProductTags);
                return productDTO;
            }).ToList();

            return Ok(mappedProduct);

        }

        [HttpPost]
        public async Task<ActionResult> Post([FromForm] ProductCreateDTO productCreateDTO)
        {

            var product = new Product
            {
                Name = productCreateDTO.Name,
                Description = productCreateDTO.Description,
                Price = productCreateDTO.Price,
            };

            var productToAdd = _mapper.Map<Product>(product);
            _context.Products.Add(productToAdd);
            await _context.SaveChangesAsync();

            Product? lastEnteredProduct = await _context.Products.OrderByDescending(x => x.Id).FirstOrDefaultAsync();




            //var productTags = productCreateDTO.ProductTags;

            string[] productTags = productCreateDTO.ProductTags.Split(',');

            foreach (string tag in productTags)
            {
                var tagItem = new ProductTag
                {
                    ProductId = lastEnteredProduct.Id,
                    TagName = tag
                };

                _context.ProductTags.Add(tagItem);
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {

            var product = await _context.Products.FindAsync(Id);

            if (product == null)
            {
                return NotFound();
            }
            var productTagsData = _context.ProductTags.Where(tag => tag.ProductId == Id);
            var productImagesToDelete = _context.ProductImages.Where(pi => pi.ProductId == Id);
            _context.ProductImages.RemoveRange(productImagesToDelete);
            _context.ProductTags.RemoveRange(productTagsData);
            _context.Products.Remove(product);
            await _context.SaveChangesAsync();
            return NoContent();
        }

    }
}
