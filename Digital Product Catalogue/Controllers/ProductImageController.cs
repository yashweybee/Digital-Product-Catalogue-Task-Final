using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Digital_Product_Catalogue.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Text.RegularExpressions;

namespace Digital_Product_Catalogue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductImageController : ControllerBase
    {
        public DigitalProductCatalogueContext _context { get; }
        public IMapper _mapper { get; }

        public ProductImageController(DigitalProductCatalogueContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }


        [HttpPost("FeaturedImage")]
        public async Task<ActionResult> PostFeaturedImg([FromForm] ProductFeaturedImageCreateDTO productFeaturedImageCreateDTO)
        {

            var filePath = (ObjectResult)await handleImages(productFeaturedImageCreateDTO.FeaturedImg);
            string fp = filePath.Value.ToString();


            var productFeaturedImg = new ProductImage
            {
                IsFeatured = true,
                ProductId = productFeaturedImageCreateDTO.ProductId,
                Path = fp
            };

            _context.ProductImages.Add(productFeaturedImg);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPost("OtherImages")]
        public async Task<ActionResult> PostOtherImages([FromForm] ProductOtherImagesCreateDTO productOtherImagesCreateDTO)
        {

            var allImages = productOtherImagesCreateDTO.OtherImages;
            List<ProductImage> responseOtherImages = new List<ProductImage>();

            foreach (IFormFile imgFile in allImages)
            {
                var imgFilePath = (ObjectResult)await handleImages(imgFile);
                string fp2 = imgFilePath.Value.ToString();


                var productImage = new ProductImage
                {

                    IsFeatured = false,
                    ProductId = productOtherImagesCreateDTO.ProductId,
                    Path = fp2
                };
                responseOtherImages.Add(productImage);

                _context.ProductImages.Add(productImage);
            }

            await _context.SaveChangesAsync();
            return Ok(responseOtherImages);
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

            return Ok(filePath);
        }

        [HttpDelete("{Id}")]
        public async Task<ActionResult> DeleteImage(int Id)
        {
            var productImg = await _context.ProductImages.FindAsync(Id);
            if (productImg == null)
            {
                return NotFound();
            }
            _context.ProductImages.Remove(productImg);
            await _context.SaveChangesAsync();
            return NoContent();
        }





    }
}
