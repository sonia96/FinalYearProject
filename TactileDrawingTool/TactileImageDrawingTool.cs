/*File name:    TactilImageDrawingTool.cs
  Author:       Sonia
  Version:      1.0
  Description:  Drawing tool that transforms 2D image uploaded or drawn into a 30x30pin tactile image ready for rendering into the 3D printer
*/

using ImageMagick;
using Kaliko.ImageLibrary;
using Kaliko.ImageLibrary.Filters;
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
using System.IO;
using Emgu.CV;
using Emgu.CV.Structure;
using System.Drawing.Imaging;
using Kaliko.ImageLibrary.Scaling;

namespace TactileDrawingTool
{
    public partial class Form1 : Form
    {
        /*Variables declaration*/
        //int width = 30;
        //int height = 30;
        int currentmousex = -1;
        int currentmousey = -1;
        bool moving = false;
        int wid = 30;
        int heigh = 30;
        Pen pen;
        String imageLocation = "";
        String saveLocation = "";
        private Bitmap bmp_pb = null;
        Graphics g;

        public Form1()
        {
            InitializeComponent();
            g = pictureBoxWithoutInterpolation12.CreateGraphics();
            g.SmoothingMode = System.Drawing.Drawing2D.SmoothingMode.AntiAlias;
            pen = new Pen(Color.Black,5);
            pen.StartCap = pen.EndCap = System.Drawing.Drawing2D.LineCap.Round;
        }

        private void Image_click(object sender, EventArgs e)
        {
            PictureBoxWithoutInterpolation1 pb = (PictureBoxWithoutInterpolation1)sender;
            this.pictureBoxWithoutInterpolation11.Image = pb.Image;
            this.bmp_pb = new Bitmap(pb.Image);
        }

 
        private void Label1_Click(object sender, EventArgs e)
        {
        }


        private void Button1_Click(object sender, EventArgs e)
        {
            var imageres = new KalikoImage(saveLocation);
            imageres.BackgroundColor = Color.White;
           // imageres.Scale(new PadScaling(128, 128));
            imageres.Color = Color.FromArgb(64, Color.Gray);
            imageres.VerticalResolution = 1f;
            imageres.HorizontalResolution = 1f;
            //imageres.SetResolution(10, 10);
            imageres.Resize(wid,heigh);
            //imageres.SaveJpg(saveLocation, 99, true);
            imageres.SavePng(saveLocation);
           // PictureBoxWithoutInterpolation1 pb = new PictureBoxWithoutInterpolation1();
            
            pictureBoxWithoutInterpolation11.ImageLocation = saveLocation;
        }


        private void button2_Click(object sender, EventArgs e)
        {
            try
            {
                OpenFileDialog open = new OpenFileDialog();
                open.Filter = "Image Files(*.jpg; *.jpeg; *.png; *.gif; *.bmp;)|*.jpg; *.jpeg; *.png; *.gif; *.bmp;";
                if (open.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                {
                    imageLocation = open.FileName;
                    pictureBoxWithoutInterpolation11.Image = new Bitmap(imageLocation);
                    //PictureBoxWithoutInterpolation1 pb = new PictureBoxWithoutInterpolation1();
                    //pb.Click += Image_click;
                    pictureBoxWithoutInterpolation11.SizeMode = PictureBoxSizeMode.StretchImage;
                    Image img = pictureBoxWithoutInterpolation11.Image;
                    Resize(img, wid,heigh);
                    pictureBoxWithoutInterpolation11.Image = ConvertoGrayscale(new Bitmap(img));


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

        private void button3_Click(object sender, EventArgs e)
        {
           
        }


        //monochrome button
        private void button5_Click(object sender, EventArgs e)
        {
            //grayscale image upon opening open file dialog
            OpenFileDialog Openfile = new OpenFileDialog();
            if (Openfile.ShowDialog() == DialogResult.OK)
            {
                Image<Bgr, Byte> My_Image = new Image<Bgr, byte>(Openfile.FileName);
                pictureBoxWithoutInterpolation11.Image = My_Image.ToBitmap();
                Image<Gray, double> gray_image = My_Image.Convert<Gray, byte>().Convert<Gray, double>();
                pictureBoxWithoutInterpolation11.SizeMode = PictureBoxSizeMode.StretchImage;
                pictureBoxWithoutInterpolation11.Image = gray_image.ToBitmap();

            }
        }

        //upload background image in auto rendering
        private void button6_Click_1(object sender, EventArgs e)
        {
            try
            {
                OpenFileDialog open = new OpenFileDialog();
                open.Filter = "Image Files(*.jpg; *.jpeg; *.png; *.gif; *.bmp;)|*.jpg; *.jpeg; *.png; *.gif; *.bmp;";
                if (open.ShowDialog() == System.Windows.Forms.DialogResult.OK)
                {
                    imageLocation = open.FileName;
                    pictureBoxWithoutInterpolation11.Image = new Bitmap(imageLocation);
                    //PictureBoxWithoutInterpolation1 pb = new PictureBoxWithoutInterpolation1();
                    //pb.Click += Image_click;
                    pictureBoxWithoutInterpolation11.SizeMode = PictureBoxSizeMode.StretchImage;
                    Image img = pictureBoxWithoutInterpolation11.Image;
                    Resize(img, wid, heigh);
                    ConvertoGrayscale(new Bitmap(img));
                    
                    //pictureBoxWithoutInterpolation11.Image = Resize(img,30,30);

                    saveLocation = imageLocation + ".png";
                    pictureBoxWithoutInterpolation11.Image.Save(saveLocation);
                }
            }
            catch (Exception)
            {
                MessageBox.Show("An error occured", "Error", MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
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
            int width = 30;
            int height = 30;
            Random rand = new Random();

            Bitmap bmp = new Bitmap(width, height);

            for (int y=0; y<height; y++)
            {
                for (int x=0; x<width; x++)
                {
                    int a = rand.Next(256);
                    int r = rand.Next(256);
                    int b = rand.Next(256);
                    int g = rand.Next(256);
                    bmp.SetPixel(x, y, Color.FromArgb(a,r,g,b));
                }
            }

            pictureBoxWithoutInterpolation12.Image = bmp;
            //bmp.Save(imageLocation+".png");

        }

        private void pictureBoxWithoutInterpolation12_Click(object sender, EventArgs e)
        {

        }


        private void pictureBoxWithoutInterpolation12_MouseDown(object sender, MouseEventArgs e)
        {
            moving = true;
            currentmousex = e.X;
            currentmousey = e.Y;
        }


        private void pictureBox2_255_Click(object sender, EventArgs e)
        {
            PictureBox p = (PictureBox)sender;
            pen.Color = p.BackColor;
        }

        private void pictureBoxWithoutInterpolation12_MouseMove(object sender, MouseEventArgs e)
        {
            if (moving && currentmousex != -1 && currentmousey != -1)
            {
                g.DrawLine(pen, new Point(currentmousex, currentmousey), e.Location);
                currentmousex = e.X;
                currentmousey = e.Y;
            }
        }

        private void pictureBoxWithoutInterpolation12_MouseUp(object sender, MouseEventArgs e)
        {
            moving = false;
            currentmousex = -1;
            currentmousey = -1;
        }
    }
}
