using PDFToolApi.Services;

namespace PDFToolApi.Facade
{
    public class PdfFacadeAsync
    {
        public Task MergeAsync(List<string> files, string output)
       => new PdfMergeServiceAsync(files, output).ExecuteAsync();

        public Task ImagesToPdfAsync(List<string> images, string output)
            => new ImageToPdfServiceAsync(images, output).ExecuteAsync();

        public Task CompressAsync(string input, string output)
            => new PdfCompressServiceAsync(input, output).ExecuteAsync();
    }
}
