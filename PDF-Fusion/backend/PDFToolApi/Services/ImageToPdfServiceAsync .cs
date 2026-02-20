using PdfSharp.Drawing;
using PdfSharp.Pdf;
using PDFToolApi.Interfaces;

namespace PDFToolApi.Services
{
    public class ImageToPdfServiceAsync : IPdfOperationAsync
    {
        private readonly List<string> _images;
        private readonly string _output;
        public ImageToPdfServiceAsync(List<string> images, string output)
        {
            _images = images;
            _output = output;
        }
        public async Task ExecuteAsync()
        {
            await Task.Run(() =>
            {
                PdfDocument doc = new PdfDocument();

                foreach (var img in _images)
                {
                    PdfPage page = doc.AddPage();
                    using XImage image = XImage.FromFile(img);

                    page.Width = image.PixelWidth;
                    page.Height = image.PixelHeight;

                    using XGraphics gfx = XGraphics.FromPdfPage(page);
                    gfx.DrawImage(image, 0, 0);
                }

                doc.Save(_output);
            });
        }
    }
}
