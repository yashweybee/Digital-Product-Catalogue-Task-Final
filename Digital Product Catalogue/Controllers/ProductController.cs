using Microsoft.AspNetCore.Mvc;
using Digital_Product_Catalogue.Models;
using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Microsoft.EntityFrameworkCore;
using System.Text;
using Microsoft.CodeAnalysis;
using System.IO;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Authorization;


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
                Price = (Decimal)productCreateDTO.Price,
            };

            var productToAdd = _mapper.Map<Product>(product);
            _context.Products.Add(productToAdd);
            await _context.SaveChangesAsync();

            Product? lastEnteredProduct = await _context.Products.OrderByDescending(x => x.Id).FirstOrDefaultAsync();



            //Other Images
            var allImages = productCreateDTO.ProductImages;
            foreach (IFormFile imgFile in allImages)
            {
                var filePath2 = (ObjectResult)await handleImages(imgFile);
                string fp2 = filePath2.Value.ToString();


                var productImage = new ProductImage
                {

                    IsFeatured = false,
                    ProductId = lastEnteredProduct.Id,
                    Path = fp2
                };

                _context.ProductImages.Add(productImage);
            }

            await _context.SaveChangesAsync();



            //Featured Image

            var filePath = (ObjectResult)await handleImages(productCreateDTO.FeaturedImage);
            string fp = filePath.Value.ToString();


            var productFeaturedImg = new ProductImage
            {
                IsFeatured = true,
                ProductId = lastEnteredProduct.Id,
                Path = fp
            };

            _context.ProductImages.Add(productFeaturedImg);
            await _context.SaveChangesAsync();


            //Product-Tags
            //string[] productTags = productCreateDTO.ProductTags;
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

            return Ok("Product Added");
        }


        [HttpPut("{Id}")]
        public async Task<ActionResult> Put(int Id, [FromForm] ProductEditDTO productEditDTO)
        {

            if (productEditDTO == null)
            {
                return BadRequest("Invalid product data.");
            }


            var existingProduct = await _context.Products.FindAsync(Id);


            if (existingProduct == null)
            {
                return NotFound("Product not found.");
            }

            existingProduct.Name = productEditDTO.Name;
            existingProduct.Description = productEditDTO.Description;
            existingProduct.Price = (decimal)productEditDTO.Price;

            try
            {

                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "Concurrency error occurred.");
            }
            catch (DbUpdateException)
            {
                return StatusCode(500, "Error updating the product.");
            }
        }

        [HttpGet("{fileName}")]
        public IActionResult GetFile(string fileName)
        {
            string absolutePath = @"D:\Digital Product Catalogue Task\Digital Product Catalogue - frontend\public\Uploads\";
            var filePath = Path.Combine(absolutePath, fileName);

            if (!System.IO.File.Exists(filePath))
            {
                return NotFound(); // File not found
            }

            var fileStream = new FileStream(filePath, FileMode.Open, FileAccess.Read);
            return File(fileStream, "application/octet-stream");
        }


        [HttpGet("image")]
        public async Task<ActionResult> handleImages(IFormFile imgFile)
        {

            if (imgFile == null || imgFile.Length <= 0)
            {
                //return "No file was uploaded.";
                return BadRequest("No file was uploaded.");

            }

            // Define the folder where you want to save the uploaded files
            string uploadsFolder = @"D:\Digital Product Catalogue Task\Digital Product Catalogue - frontend\public\Uploads";

            // Create the folder if it doesn't exist
            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            // Generate a unique filename for the uploaded file
            //string uniqueFileName = Path.GetRandomFileName();

            string uniqueFileName = Path.GetRandomFileName();

            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            // Save the uploaded file to the specified path
            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await imgFile.CopyToAsync(fileStream);
            }

            //using (var stream = System.IO.File.Create(filePath))
            //{
            //    await imgFile.CopyToAsync(stream);
            //}

            return Ok(filePath);
        }


        [HttpDelete("{Id}")]
        public async Task<ActionResult> Delete(int Id)
        {

            var product = await _context.Products.FindAsync(Id);

            if (product == null)
            {
                return NotFound();
            }

            var wishListEntriesToDelete = _context.WishLists.Where(wl => wl.ProductId == Id);
            _context.WishLists.RemoveRange(wishListEntriesToDelete);

            var productTagsData = _context.ProductTags.Where(tag => tag.ProductId == Id);
            var productImagesToDelete = _context.ProductImages.Where(pi => pi.ProductId == Id);

            _context.ProductImages.RemoveRange(productImagesToDelete);
            _context.ProductTags.RemoveRange(productTagsData);
            _context.Products.Remove(product);

            await _context.SaveChangesAsync();
            return NoContent();
        }


        //[HttpDelete("{Id}", Name = "EditDelete")]
        //public async Task<ActionResult> EditDelete(int Id)
        //{

        //    var product = await _context.Products.FindAsync(Id);

        //    if (product == null)
        //    {
        //        return NotFound();
        //    }

        //    var wishListEntriesToDelete = _context.WishLists.Where(wl => wl.ProductId == Id);
        //    _context.WishLists.RemoveRange(wishListEntriesToDelete);

        //    var productTagsData = _context.ProductTags.Where(tag => tag.ProductId == Id);
        //    var productImagesToDelete = _context.ProductImages.Where(pi => pi.ProductId == Id);

        //    _context.ProductImages.RemoveRange(productImagesToDelete);
        //    _context.ProductTags.RemoveRange(productTagsData);
        //    _context.Products.Remove(product);

        //    await _context.SaveChangesAsync();
        //    return NoContent();

        //    //var productTagsData = _context.ProductTags.Where(tag => tag.ProductId == Id);
        //    //var productImagesToDelete = _context.ProductImages.Where(pi => pi.ProductId == Id);
        //    //_context.ProductImages.RemoveRange(productImagesToDelete);
        //    //_context.ProductTags.RemoveRange(productTagsData);
        //    //_context.Products.Remove(product);
        //    //await _context.SaveChangesAsync();
        //    //return NoContent();
        //}
    }
}
