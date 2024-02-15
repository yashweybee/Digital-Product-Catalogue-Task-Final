using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Syncfusion.Pdf;
using Syncfusion.Pdf.Graphics;
using System.IO;
using Syncfusion.Drawing;
using Digital_Product_Catalogue.Models;
using AutoMapper;

namespace Digital_Product_Catalogue.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PDFController : ControllerBase
    {
        public DigitalProductCatalogueContext _context { get; }
        public IMapper _mapper { get; }

        public PDFController(DigitalProductCatalogueContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpPost("{Id}")]
        public IActionResult CreateDocument(int Id)
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

            // Create a new PDF document.
            PdfDocument document = new PdfDocument();

            // Add a page to the document.
            PdfPage page = document.Pages.Add();

            // Create PDF graphics for the page.
            PdfGraphics graphics = page.Graphics;

            // Set the standard font.
            PdfFont font = new PdfStandardFont(PdfFontFamily.Helvetica, 12);

            // Set initial position
            PointF position = new PointF(10, 10);

            // Iterate through the query results and add information to the PDF
            foreach (var item in productGetQuery)
            {
                // Draw product information
                graphics.DrawString($"Product Name: {item.Product.Name}", font, PdfBrushes.Black, position);
                position.Y += 20;


                graphics.DrawString($"Price: {item.Product.Price}$", font, PdfBrushes.Black, position);
                position.Y += 20;

                // Draw other product details as needed
                // ...

                // Draw product tags
                foreach (var tag in item.ProductTags)
                {
                    graphics.DrawString($"{tag.TagName}", font, PdfBrushes.Black, position);
                    position.Y += 20;
                }

                // Draw product images
                //foreach (var imagePath in item.ProductImages)
                //{
                //    //FileStream imageStream = new FileStream(image, FileMode.Open, FileAccess.Read);
                //    //PdfBitmap image = new PdfBitmap(imageStream);
                //    ////Draw the image
                //    //graphics.DrawImage(image, 0, 0);
                //}

                // Add some space between products
                position.Y += 20;
            }

            // Saving the PDF to the MemoryStream.
            MemoryStream stream = new MemoryStream();
            document.Save(stream);

            //Set the position as '0'.
            stream.Position = 0;

            //Download the PDF document in the browser
            FileStreamResult fileStreamResult = new FileStreamResult(stream, "application/pdf");

            fileStreamResult.FileDownloadName = "Invoice.pdf";
            return fileStreamResult;

        }
    }

}
