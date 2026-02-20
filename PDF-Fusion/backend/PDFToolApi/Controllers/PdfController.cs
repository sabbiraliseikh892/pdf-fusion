using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using PDFToolApi.Facade;

namespace PDFToolApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PdfController : ControllerBase
    {
        private readonly PdfFacadeAsync _pdf = new PdfFacadeAsync();

        [HttpPost("merge")]
        public async Task<IActionResult> Merge(List<IFormFile> files)
        {
            var paths = await SaveFiles(files);
            string output = Path.GetTempFileName();

            await _pdf.MergeAsync(paths, output);
            return PhysicalFile(output, "application/pdf", "merged.pdf");
        }
        [HttpPost("images-to-pdf")]
        public async Task<IActionResult> ImagesToPdf(List<IFormFile> files)
        {
            var paths = await SaveFiles(files);
            string output = Path.GetTempFileName();

            await _pdf.ImagesToPdfAsync(paths, output);
            return PhysicalFile(output, "application/pdf", "images.pdf");
        }
        [HttpPost("compress")]
        public async Task<IActionResult> Compress(IFormFile file)
        {
            string input = Path.GetTempFileName();
            string output = Path.GetTempFileName();

            await using var fs = new FileStream(input, FileMode.Create);
            await file.CopyToAsync(fs);

            await _pdf.CompressAsync(input, output);
            return PhysicalFile(output, "application/pdf", "compressed.pdf");
        }
        private async Task<List<string>> SaveFiles(List<IFormFile> files)
        {
            var list = new List<string>();
            foreach (var file in files)
            {
                string path = Path.GetTempFileName();
                await using var fs = new FileStream(path, FileMode.Create);
                await file.CopyToAsync(fs);
                list.Add(path);
            }
            return list;
        }
    }
}
