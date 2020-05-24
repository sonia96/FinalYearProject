/*File name:    TactilImageDrawingTool.cs
  Author:       Sonia
  Version:      1.0
  Description:  Drawing tool that transforms 2D image uploaded or drawn into a 30x30pin tactile image ready for rendering into the 3D printer
*/

using System.Drawing.Drawing2D;
using System.Windows.Forms;

namespace TactileDrawingTool
{
    public class PictureBoxWithoutInterpolation1:PictureBox
    {
        public InterpolationMode InterpolationMode { get; set; }

        protected override void OnPaint(PaintEventArgs pe)
        {
            pe.Graphics.InterpolationMode = InterpolationMode.NearestNeighbor;
            pe.Graphics.PixelOffsetMode = PixelOffsetMode.Half;
            base.OnPaint(pe);
        }
    }
}