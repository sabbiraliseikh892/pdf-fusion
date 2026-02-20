using PDFToolApi.Interfaces;
using System.Diagnostics;

namespace PDFToolApi.Services
{
    public class PdfCompressServiceAsync : IPdfOperationAsync
    {
        private readonly string _input;
        private readonly string _output;
        public PdfCompressServiceAsync(string input, string output)
        {
            _input = input;
            _output = output;
        }
        public async Task ExecuteAsync()
        {
            var process = new Process
            {
                StartInfo = new ProcessStartInfo
                {
                    FileName = "gswin64c",
                    Arguments =
                        "-sDEVICE=pdfwrite -dCompatibilityLevel=1.4 " +
                        "-dPDFSETTINGS=/ebook -dNOPAUSE -dQUIET -dBATCH " +
                        $"-sOutputFile=\"{_output}\" \"{_input}\"",
                    UseShellExecute = false,
                    CreateNoWindow = true
                }
            };

            process.Start();
            await process.WaitForExitAsync();
        }
    }
}
