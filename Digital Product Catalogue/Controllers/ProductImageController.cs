using AutoMapper;
using Digital_Product_Catalogue.DTOs;
using Digital_Product_Catalogue.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

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


        //[HttpPost]
        //public async Task<ActionResult> Post([FromForm] IFormFile imgFile)
        //{

        //    var filePath = (ObjectResult)await handleImages(imgFile);
        //    string fp = filePath.Value.ToString();


        //    var productFeaturedImg = new ProductImage
        //    {
        //        IsFeatured = true,
        //        ProductId = lastEnteredProduct.Id,
        //        Path = fp
        //    };

        //    _context.ProductImages.Add(productFeaturedImg);
        //    await _context.SaveChangesAsync();

        //    return Ok();    
        //}


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





    }
}
