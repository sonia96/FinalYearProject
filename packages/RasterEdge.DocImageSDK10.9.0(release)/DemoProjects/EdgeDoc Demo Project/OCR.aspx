<%@ Page Language="C#" AutoEventWireup="true" CodeFile="OCR.aspx.cs" Inherits="OCR" %>

<!DOCTYPE html>


<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <title></title>
    <style>

    </style>
</head>
<script src="RasterEdge_Resource_Files/javascript/jquery.js" type="text/javascript"></script>
<script>
    var templocation = null;
    var ocrarea = function (l) {
        templocation = l;
    }
   var doOCR= function () {
        var lang = $("#language").val();//"English";
        var jsondata = { RECommand: "OCR", fid: templocation.fid, pageindex: templocation.pageIndex, x: templocation.x, y: templocation.y, w: templocation.w, h: templocation.h, lang: lang, filename: templocation.filename };
        $.ajax({
            url: "/OCR.aspx", type: "get", data: jsondata, success: function (result) {
                $("#ocrtext").val(result);
            }
        });
    };
</script>
<body>
    <div id="files" style="float:left;margin:10px;" >

        <a href="#" onclick="openfile('')">Open</a><br />
        <a href="#" onclick="openfile('')">Open</a><br />
        <a href="#" onclick="openfile('')">Open</a><br />
    </div>
    <div id="wdp_app" style="float: left;">
        <div>
            <div style="float:left">RasterEdge</div>
            <div style="float:right">
                <button id="maxicon" style=" width: 20px; height: 20px;" onclick="changesize()">A</button>
                <button id="closeicon" style="width: 20px; height: 20px; " onclick="closepop()">X</button>
                
            </div>
        </div>
        <iframe id="wdp_container" src="index.html" height="700" width="800"></iframe>
        <div>

        </div>
    </div>
    <div >
        <select id="language">
            <option value="English">English</option>
            <option value="Chinese">Chinese</option>
        </select>
        <button id="ocrbutton" onclick="doOCR()">OCR</button>
        <br>
        <textarea   id="ocrtext" style="width:200px;height:500px;"></textarea>
    </div>
    <script>
        window.onresize = function () {
            if (ismax) {
                $("#wdp_container").attr("height", $(window).height() - 40);
                $("#wdp_container").attr("width", $(window).width() - 20);
                $("#wdp_app").css("width", $(window).width());

                $("#wdp_app").css("top", "0px");
                $("#wdp_app").css("left", "0px");
            }
        }
        function wdpOpenPopupForm(filesrc, height, width) {
            if (filesrc != '')
                $("#wdp_container").attr("src", "index.html?src=" + filesrc);
            $("#wdp_container").attr("height", height + "px");
            $("#wdp_container").attr("width", width + "px");
            $("#wdp_app").css("width", width + "px");


        }
        var ismax = false;
        var preheight;
        var prewidth;
        function changesize() {
            if (ismax) {
                $("#wdp_container").attr("height", preheight);
                $("#wdp_container").attr("width", prewidth);
                $("#wdp_app").css("width", prewidth);
                ismax = false;
                $("#maxicon").text("A");
                $("#files").show();
            } else {
                ismax = true;
                preheight = $("#wdp_container").attr("height");
                prewidth = $("#wdp_container").attr("width");
                $("#wdp_container").attr("height", $(window).height() - 40);
                $("#wdp_container").attr("width", $(window).width() - 20);
                $("#wdp_app").css("width", $(window).width());
                $("#maxicon").text("N");
                $("#files").hide();
            }
        }
        function closepop() {
            $("#wdp_container").attr("src", "index.html");

        }
        function filesrc(filesrc) {
            if (filesrc != '')
                $("#wdp_container").attr("src", "index.html?src=" + filesrc);
        }
    </script>
</body>
</html>
