using PdfSharp.Pdf;
using PdfSharp.Pdf.IO;
using PDFToolApi.Interfaces;
using System.Reflection.PortableExecutable;

namespace PDFToolApi.Services
{
    public class PdfMergeServiceAsync : IPdfOperationAsync
    {
        private readonly List<string> _files;
        private readonly string _output;
        public PdfMergeServiceAsync(List<string> files, string output)
        {
            _files = files;
            _output = output;
        }
        public async Task ExecuteAsync()
        {
            await Task.Run(() =>
            {
                PdfDocument outputDoc = new PdfDocument();

                foreach (var file in _files)
                {
                    using var input = PdfReader.Open(file, PdfDocumentOpenMode.Import);
                    for (int i = 0; i < input.PageCount; i++)
                        outputDoc.AddPage(input.Pages[i]);
                }

                outputDoc.Save(_output);
            });
        }
    }
}
