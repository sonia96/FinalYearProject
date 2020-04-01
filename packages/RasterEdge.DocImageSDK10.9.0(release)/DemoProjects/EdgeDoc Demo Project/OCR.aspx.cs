using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using RasterEdge.XImage.OCR;
using RasterEdge.Imaging.Basic;
using RasterEdge.Imaging.Drawing;
using RasterEdge.Imaging.Raster.Core;
using System.Drawing;

public partial class OCR : System.Web.UI.Page
{
    protected void Page_Load(object sender, EventArgs e)
    {
        string command = Request.Params["RECommand"];
        if ("OCR".Equals(command))
        {
            doOCR(Request.Params["fid"]);
        }
    }

    public bool doOCR(string fid)
    {
        Response.ContentType = "text/plain";
        Response.Clear();
        try
        {
            int pageIndex = Convert.ToInt32(Request.Params["pageindex"].ToString());
            string language = Request.Params["lang"];
            string filename = Request.Params["filename"]; 
            string projectName = HttpContext.Current.Request.PhysicalApplicationPath.Replace("\\", "/");
            int x = (int)Convert.ToDouble(Request.Params["x"].ToString());
            int y = (int)Convert.ToDouble(Request.Params["y"].ToString());
            int width = (int)Convert.ToDouble(Request.Params["w"].ToString());
            int height = (int)Convert.ToDouble(Request.Params["h"].ToString());
            string resourcepath = projectName + "/OCRSource/";
            OCRHandler.SetTrainResourcePath(resourcepath);
            List<Language> langs = new List<Language>();
            if (language.Equals("English"))
                langs.Add(Language.Eng);
            else if (language.Equals("German"))
                langs.Add(Language.Deu);
            else if (language.Equals("French"))
                langs.Add(Language.Fra);
            else if (language.Equals("Dutch"))
                langs.Add(Language.Nld);
            else if (language.Equals("Italian"))
                langs.Add(Language.Ita);
            else if (language.Equals("Portuguese"))
                langs.Add(Language.Por);
            else if (language.Equals("Spanish"))
                langs.Add(Language.Spa);
            else if (language.Equals("Arabic"))
                langs.Add(Language.Ara);
            Object fileObject = RasterEdge.WDP.Handler.FileinfoHandler.LoadFile(fid, filename, "");
            OCRHandler.Settings.LanguagesEnabled = langs;
            OCRPage ocrPage = null;
            Bitmap image = null;
            if (fileObject is BaseDocument)
            {
                BaseDocument doc = (BaseDocument)fileObject;
                BasePage page = doc.GetPage(pageIndex);
                image = page.ConvertToImage(1.0f);
                ocrPage = OCRHandler.Import(image);
            }
            else if (fileObject is REImage)
            {
                image = ((REImage)fileObject).Bitmap;

            }
            if (image != null)
            {
                Bitmap newImg = new Bitmap(width, height);
                Graphics g = Graphics.FromImage(newImg);
                g.DrawImage(image, 0, 0, new Rectangle(x, y, newImg.Width, newImg.Height), GraphicsUnit.Pixel);
                ocrPage = OCRHandler.Import(newImg);
                ocrPage.Recognize();
                g.Dispose();
                newImg.Dispose();
                image.Dispose();
                string text = ocrPage.GetText();
                text = text.Replace("\r\n", "<br/>");
                text = text.Replace("\"", "\\" + "\"");
                Response.Write(text);
            }
            else {
           
                Response.Write("None");
            }
        }
        catch (System.Exception ex)
        {
            Response.Write("None");
        }
        Response.End();
        return true;
    }
}