/*File name:    TactilImageDrawingTool.cs
  Author:       Sonia
  Version:      1.0
  Description:  Drawing tool that transforms 2D image uploaded or drawn into a 30x30pin tactile image ready for rendering into the 3D printer
*/


using Kaliko.ImageLibrary;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using System.Xml;
using System.IO.Ports;
using Emgu.CV.Structure;
using Kaliko.ImageLibrary.Scaling;
using Emgu.CV;
using System.Diagnostics;
using System.IO;
using System.Text.RegularExpressions;
using System.Threading;

namespace TactileDrawingTool
{
    public partial class TactileImageDrawingTool : Form
    {
        /*Variables declaration*/
        static SerialPort port; //connection
        static Semaphore sem;
        static Thread r;  
        int currentmousex = -1;  
        int currentmousey = -1;
        bool moving = false;
        int wid = 30;
        int heigh = 30;
        Pen pen;
        SolidBrush brush;
        String imageLocation = "";
        String saveLocation = "";
        private Bitmap bmp_pb = null;
        Graphics g;
        Color greyscalecolor;
        bool choose = false;
        int x, y, z, ix, iy = 0;

        private int pixelCount = 0;
        private double totalYMovement = 0.0;
        private Dictionary<int, Point> positionLookup = new Dictionary<int, Point>();
        private Bitmap sourceimg;

        public TactileImageDrawingTool()
        {
            InitializeComponent();
            this.SetWindow();
            g = pictureBoxWithoutInterpolation11.CreateGraphics();
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
            pen = new Pen(Color.White,1);
            brush = new SolidBrush(Color.Black);
            pen.StartCap = pen.EndCap = System.Drawing.Drawing2D.LineCap.Round;
        }

        public void OpenConnection()
        {
            bool realtimeprocess = false;
            string portname = Properties.Settings.Default.COMport;
            int baudrate = Properties.Settings.Default.Baudrate;

            if (realtimeprocess)
                using (Process p = Process.GetCurrentProcess())
                    p.PriorityClass = ProcessPriorityClass.RealTime;

            try
            {
                port = new SerialPort(portname, baudrate);
                port.Open();
                port.DtrEnable = true;
                port.RtsEnable = true;
            }
            catch (Exception ex)
            {
                MessageBox.Show("Could not connect to the port", "Connection Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
            Thread.Sleep(2000);
        }


        private void startPrinting()
        {
            pushvalues(sourceimg);
            this.RenderImageToGcode(this.sourceimg);
            //implement algorithm here that takes in the pixel intensity and calculates the height
            
        }

        int[] pusharray;
        int push;
        private int[] pushvalues(Bitmap source)
        {
            int push_max = 12;
            Bitmap bmp = new Bitmap(source.Width, source.Height);
            int i = 0;
            for (int y = 0; y < bmp.Height; y++)
            {
                for (int x = 0; x < bmp.Width; x++)
                {
                    Color c = source.GetPixel(x, y);
                    int a = c.A/255; 
                    push = push_max - (push_max * a);
                    pusharray[i] = push;
                    i++;
                }
            }
            return pusharray;
        }


        double X = 15.8;
        double Y = 50;
        double Z = 105.50;
        public string RenderImageToGcode(Bitmap bmp)
        {
           
            //double startZ = 0;
            double minZ = 0;
            double maxZ = 0;
            double leftX = 0;
            double rightX = 0;
            double topY = 0;
            double bottomY = 0;

            double rangeZ = maxZ - minZ;
            double rangeX = rightX - leftX;
            double rangeY = bottomY - topY;

            this.pixelCount = 0;
            this.totalYMovement = 0.0;

            StringBuilder sb = new StringBuilder();

            BitmapData bmdata = bmp.LockBits(new System.Drawing.Rectangle(0, 0, bmp.Width, bmp.Height), ImageLockMode.ReadOnly, System.Drawing.Imaging.PixelFormat.Format32bppArgb);
            const int bytesPerPixel = 4;
            ConstructG0(x,y,z);
            unsafe
            {
                byte* scan0 = (byte*)bmdata.Scan0.ToPointer();
                for (int imagey = 0; imagey < bmp.Height; ++imagey)
                {
                    string stringline = "";
                    byte* line = scan0 + imagey * bmdata.Stride;

                    for (int u = 0; u < bmp.Width; ++u)
                    {
                        int imagex = u;
                        if (imagey % 2 == 1)
                        {
                            imagex = bmp.Width - 1 - u;
                        }
                        byte* pixel = line + bytesPerPixel * imagex;
                        double grayScale = ((int)((pixel[0] * 0.3) + (pixel[1] * 0.59) + (pixel[2] * 0.11))) / 255.0;
                        string ch = "";
                        if (grayScale == 0) ch = "-"; else ch = "@";
                        if (imagey % 2 == 1) stringline = ch + stringline; else stringline = stringline + ch;

                    }
                }
            }
            ConstructG0(x,y,z);
            return sb.ToString();
        }

        private string ConstructG0(double x = -1.0, double y = -1.0, double z = -1.0)
        {
            string gcode = "G0";

            if (x != -1.0)
            {
                gcode = gcode + " X" + x.ToString("0.0");
            }

            if (y != -1.0)
            {
                gcode = gcode + " Y" + y.ToString("0.0");
            }

            if (z != -1.0)
            {
                gcode = gcode + " Z" + z.ToString("0.0");
            }
            return gcode;
        }

        private static int CountLines(string str)
        {
            if (str == null)
                throw new ArgumentNullException("str");
            if (str == string.Empty)
                return 0;
            int index = -1;
            int count = 0;
            while (-1 != (index = str.IndexOf(Environment.NewLine, index + 1)))
                count++;

            return count + 1;
        }

        private void SetWindow()
        {
            //this.WindowState = FormWindowState.Maximized;
            //this.FormBorderStyle = FormBorderStyle.Sizable;
            pictureBoxWithoutInterpolation11.SizeMode = PictureBoxSizeMode.StretchImage;
            pictureBoxWithoutInterpolation11.Size = new Size(450, 450);
            pictureBoxWithoutInterpolation11.ClientSize = new Size(450, 450);

            sourceimg = new Bitmap(wid, heigh);

        }
 
        private void Label1_Click(object sender, EventArgs e)
        {
        }


        private void Button1_Click(object sender, EventArgs e)
        {
            //automatic ressize the bitmap to 30x30
            var imageres = new KalikoImage(saveLocation);
            imageres.BackgroundColor = Color.White;
            imageres.Color = Color.FromArgb(64, Color.Gray);
            imageres.VerticalResolution = 1f;
            imageres.HorizontalResolution = 1f;
            imageres.Resize(wid, heigh);
            imageres.SavePng(saveLocation);           
            sourceimg = new Bitmap(saveLocation);


            pictureBoxWithoutInterpolation11.ImageLocation = saveLocation;


        }


        private void button2_Click(object sender, EventArgs e)
        {
            //upload image and greyscale it
            try
            {
                OpenFileDialog open = new OpenFileDialog();
                open.Filter = "Image Files(*.jpg; *.jpeg; *.png; *.gif; *.bmp;)|*.jpg; *.jpeg; *.png; *.gif; *.bmp;";
                if (open.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                {
                    imageLocation = open.FileName;                
                    sourceimg = new Bitmap(imageLocation);
                    pictureBox2.Image = sourceimg;
                    pictureBoxWithoutInterpolation11.Image = ConvertoGrayscale(sourceimg);

                    saveLocation = imageLocation + ".png";
                    pictureBoxWithoutInterpolation11.Image.Save(saveLocation);
                }
            }
            catch (Exception)
            {
                MessageBox.Show("An error occured", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
        }

        private static Bitmap ConvertoGrayscale(Bitmap source)
        {

            Bitmap bmp = new Bitmap(source.Width, source.Height);

            for (int y = 0; y < bmp.Height; y++)
            {
                for (int x = 0; x < bmp.Width; x++)
                {
                    Color c = source.GetPixel(x, y);
                    int avergae = (Convert.ToInt32(c.R) + Convert.ToInt32(c.G) + Convert.ToInt32(c.B)) / 3;
                    bmp.SetPixel(x, y, Color.FromArgb(avergae, avergae, avergae));

                }
            }
            return bmp;
        }

        private static Bitmap invertimage(Bitmap source)
        {

            Bitmap bmp = new Bitmap(source.Width, source.Height);

            for (int y = 0; y < bmp.Height; y++)
            {
                for (int x = 0; x < bmp.Width; x++)
                {
                    Color c = source.GetPixel(x, y);
                    int avergae = (Convert.ToInt32(c.R) + Convert.ToInt32(c.G) + Convert.ToInt32(c.B)) / 3;
                    bmp.SetPixel(x, y, Color.FromArgb(255-avergae, 255-avergae, 255-avergae));

                }
            }
            return bmp;
        }

        private static Bitmap monochromeimage(Bitmap source)
        {
            int avergae;
            Bitmap bmp = new Bitmap(source.Width, source.Height);

            for (int y = 0; y < bmp.Height; y++)
            {
                for (int x = 0; x < bmp.Width; x++)
                {
                    Color c = source.GetPixel(x, y);
                    avergae = (Convert.ToInt32(c.R) + Convert.ToInt32(c.G) + Convert.ToInt32(c.B)) / 3;
                        if (avergae<127) {
                            bmp.SetPixel(x, y, Color.Black);
                        }
                        else
                        {
                            bmp.SetPixel(x, y, Color.White);
                        }
                }
            }
            return bmp;
        }


        private void save_Click(object sender, EventArgs e)
        {
            try
            {
                sourceimg.Save(saveLocation + ".png", ImageFormat.Png);
                //saveLocation = imageLocation + ".png";
                //ictureBoxWithoutInterpolation11.Image.Save(saveLocation, ImageFormat.Png);
            }
            catch (Exception ex)
            {
                MessageBox.Show("An error occured: Couldn't save file", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                Debug.WriteLine(ex);
            }
        }


        //monochrome button
        private void button5_Click(object sender, EventArgs e)
        {
            pictureBoxWithoutInterpolation11.Image = monochromeimage(sourceimg);
            saveLocation = imageLocation + ".png";
            pictureBoxWithoutInterpolation11.Image.Save(saveLocation);
        }

        //upload background image in auto rendering
        private void button6_Click_1(object sender, EventArgs e)
        {

            Random rand = new Random();

            sourceimg = new Bitmap(wid, heigh);

            for (int y = 0; y < heigh; y++)
            {
                for (int x = 0; x < wid; x++)
                {
                    int a = rand.Next(256);
                    int r = rand.Next(256);
                    int b = rand.Next(256);
                    int g = rand.Next(256);

                    //Color c = sourceimg.GetPixel(x, y);
                    int avergae = (Convert.ToInt32(r) + Convert.ToInt32(g) + Convert.ToInt32(b)) / 3;
                    sourceimg.SetPixel(x, y, Color.FromArgb(avergae, avergae, avergae));
                }
            }

            pictureBoxWithoutInterpolation11.Image = sourceimg;
            //g = Graphics.FromImage(sourceimg);

            sourceimg.Save(imageLocation + ".png");
        }


        Image Resize(Image img, int w, int h)
        {
            Bitmap bmp = new Bitmap(w, h);
            Graphics graphics = Graphics.FromImage(bmp);
            graphics.DrawImage(img, 0, 0, w, h);
            graphics.Dispose();
            return bmp;
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            //int width = 30;
            //int height = 30;
            //Random rand = new Random();

            //Bitmap bmp = new Bitmap(width, height);

            //for (int y=0; y<height; y++)
            //{
            //    for (int x=0; x<width; x++)
            //    {
            //        int a = rand.Next(256);
            //        int r = rand.Next(256);
            //        int b = rand.Next(256);
            //        int g = rand.Next(256);
            //        bmp.SetPixel(x, y, Color.FromArgb(a,r,g,b));
            //    }
            //}

            //pictureBoxWithoutInterpolation11.Image = bmp;
            //bmp.Save(imageLocation+".png");

        }

        //private Bitmap manualdraw(int width, int height)
        //{

        //    Bitmap bmp = new Bitmap(width, height);
        //    return bmp;

        //}


        private void pictureBox2_255_Click(object sender, EventArgs e)
        {
            PictureBox p = (PictureBox)sender;
            //pen.Color = p.BackColor;
            brush.Color = p.BackColor;
            Debug.WriteLine("constructor fired: {0}\n", brush.Color);

        }


        private void pictureBoxWithoutInterpolation11_MouseMove(object sender, MouseEventArgs e)
        {
            if (moving && currentmousex != -1 && currentmousey != -1)
            {
                //int scalefactor = 20;
                int sfheight = pictureBoxWithoutInterpolation11.Size.Height / heigh;
                int sfwidth = pictureBoxWithoutInterpolation11.Size.Width / wid;
                int newx = (currentmousex / sfwidth) * sfwidth;
                int newy = (currentmousey / sfheight) * sfheight;

                //g.DrawLine(pen, new Point(currentmousex, currentmousey), e.Location);
                g.FillRectangle(brush, newx, newy, sfwidth, sfheight);
                g.DrawRectangle(pen, newx, newy, sfwidth, sfheight);
                Debug.WriteLine("constructor fired: {0}, {1}\n", sfheight, sfwidth);
                Debug.WriteLine("constructor fired: {0}, {1}\n", pictureBoxWithoutInterpolation11.Size.Height, pictureBoxWithoutInterpolation11.Size.Width);
                Debug.WriteLine("constructor fired: {0}\n", brush.Color);
                Debug.WriteLine("constructor fired: {0}\n", brush);

                currentmousex = e.X;
                currentmousey = e.Y;

                int oldx = newx / sfwidth;
                int oldy = newy / sfheight;

                sourceimg.SetPixel(oldx, oldy, brush.Color);

            }
        }

        private void pictureBoxWithoutInterpolation11_MouseDown(object sender, MouseEventArgs e)
        {
            moving = true;
            currentmousex = e.X;
            currentmousey = e.Y;
        }

        private void pictureBoxWithoutInterpolation11_MouseUp(object sender, MouseEventArgs e)
        {
            moving = false;
            currentmousex = -1;
            currentmousey = -1;
        }

        private void pictureBoxWithoutInterpolation11_Layout(object sender, LayoutEventArgs e)
        {
            

        }

        private void pictureBox2_Click(object sender, EventArgs e)
        {

        }

        private void button7_Click_1(object sender, EventArgs e)
        {
            pictureBoxWithoutInterpolation11.Image = invertimage(sourceimg);
            saveLocation = imageLocation + ".png";
            pictureBoxWithoutInterpolation11.Image.Save(saveLocation);
        }

        private void pictureBox4_Click(object sender, EventArgs e)
        {
            PictureBox p = (PictureBox)sender;
            //pen.Color = p.BackColor;
            brush.Color = p.BackColor;
        }

        private void pictureBox4_MouseDown(object sender, MouseEventArgs e)
        {
            choose = true;
        }

        private void pictureBox4_MouseUp(object sender, MouseEventArgs e)
        {
            choose = false;
        }

        private void button4_Click(object sender, EventArgs e)
        {
            pictureBoxWithoutInterpolation11.Image = null;
            pictureBoxWithoutInterpolation11.Update();
        }

        private void button8_Click_1(object sender, EventArgs e)
        {

        }

        private void button9_Click(object sender, EventArgs e)
        {

        }

        private void pictureBoxWithoutInterpolation11_Paint(object sender, PaintEventArgs e)
        {
            //e.Graphics.FillRectangle(brush, Rectangle(30,30,30,30);
            
            //g = Graphics.FromImage(sourceimg);
            sourceimg.SetPixel(x, y, Color.Red);

        }

        private void pictureBox4_MouseMove(object sender, MouseEventArgs e)
        {
            if (choose)
            {
                Bitmap bmp = (Bitmap)pictureBox4.Image.Clone();
                greyscalecolor = bmp.GetPixel(e.X, e.Y);
                pictureBox4.BackColor = greyscalecolor;
            }
        }

        private void pictureBoxWithoutInterpolation11_Click(object sender, EventArgs e)
        {

        }

        private void button7_Click(object sender, EventArgs e)
        {
            this.button_7.Enabled = false;
            this.button_8.Visible = true;
            this.OpenConnection();
            this.startPrinting();        
        }

        private void button8_Click(object sender, EventArgs e)
        {
            this.button_7.Enabled = true;
            this.button_8.Visible = false;
            port.Close();
            r.Abort();
        }
    }
}

