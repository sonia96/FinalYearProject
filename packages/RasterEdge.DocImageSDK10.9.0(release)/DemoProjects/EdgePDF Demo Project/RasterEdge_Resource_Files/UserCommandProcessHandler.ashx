<%@ WebHandler Language="C#" Class="UserCommandProcessHandler" %>

using System;
using System.Web;
using RasterEdge.XDoc.PDF.HTML5Editor;
using RasterEdge.WDP;

public class UserCommandProcessHandler : RasterEdge.XDoc.PDF.HTML5Editor.ProcessHandler
{
    public override void FileProcess()
    {

        HttpRequest request = this.Context.Request;
        HttpResponse response = this.Context.Response;
      
        string command = request.Form["RECommand"];
        if (command == null || command.Equals(""))
        {
            REProcessControl.GetConfig();
            PDFWebDocument webDoc = null;
            if (request.Files.Count > 0 || request.Form.Count > 0)
            {
                // load from upload (new file or add file)
                webDoc = REProcessControl.PageLoadFile(request);
            }
            else if (!string.IsNullOrEmpty(request.QueryString["src"]))
            {
                // load file from Url ,the "src" is the paramter of the path value (start with http,https,ftp)
                webDoc = REProcessControl.PageLoadFile(request, "src", LoadType.Url);
            }
            else if (!string.IsNullOrEmpty(request.QueryString["filepath"]))
            {
                // load file from server ,the "filepath" is the paramter of the path value on server
                webDoc = REProcessControl.PageLoadFile(request, "filepath", LoadType.Server);
            }
            else if (!string.IsNullOrEmpty(request.QueryString["restful"]))
            {
                // load file from server ,the "filepath" is the paramter of the path value on server
                webDoc = REProcessControl.PageLoadFile(request, "restful", LoadType.Restful);
            }
            else if (!string.IsNullOrEmpty(request.QueryString["yourtarget"]))
            {
                // load file from your target
                string targetkey = request.QueryString["yourtarget"];

	RasterEdge.Imaging.Basic.BaseDocument pdf =
                                              new RasterEdge.XDoc.PDF.PDFDocument(@"C:\\temp\" + targetkey);

                webDoc = REProcessControl.PageLoadFile(request, pdf, targetkey); // object can be PDFDocument,File bytes or File Stream
            }
            else
            {
                // load default file. defined in Web.config
                webDoc = REProcessControl.PageLoadFile(request, "", LoadType.Server);
            }
            // first time to load the page add the pre open document information.
            string mtc = "";
            if (webDoc != null)
            {
                mtc = webDoc.MsgToClient;
            }
            response.Write(mtc);
        }
    }
    
    
    public void SaveFileOnServer()
    {
         string fid = _httpRequest["fid"];
        // you can process saved pdf document here, like add watermark, ...
        string documentpath = this.SaveFile();
        RasterEdge.Imaging.Basic.BaseDocument document = null;
        if (!string.IsNullOrEmpty(documentpath) && documentpath.EndsWith(".pdf"))
            document = new RasterEdge.XDoc.PDF.PDFDocument(documentpath);
        if (document !=null)
        {
            RasterEdge.XDoc.PDF.PDFDocument pdfDoc = document as RasterEdge.XDoc.PDF.PDFDocument;
            // get the upload information of the file
            RasterEdge.WDP.DocUploadInfo docinfo = RasterEdge.WDP.Manager.FileManager.getUploadinfoByFid(fid);

            string filename = docinfo.FileName;
            // get your file open url parameters value, if needed.
            string paraFilepathValue = docinfo.GetRequestParameters("yourtarget");

            RasterEdge.XDoc.PDF.PDFMetadata metadata = pdfDoc.GetDescription();
            metadata.Producer = "RasterEdge EdgePDF ASP.NET PDF Editor";
            pdfDoc.SetDescription(metadata);

            try
            {
	pdfDoc.Save(@"C:\\temp\" + paraFilepathValue);
            }
            catch (Exception e)
            {
                // process error code, and return error information here
            }
        }
    }
}
