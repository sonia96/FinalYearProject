var setWebConfiguration = function () {
    setAppType("docviewer");
    setDialog("DOC");
    setLanguage();
}
var initWebApplication = function () {
    
    setWebTitle(i18n['web']['ViwerTitle'], true);
    setApplicationTitle(i18n['web']['AppViewerTitle']);
    initFileToolbar();
    initViewToolbar();
    initCommentsToolbar();
    initDefaultViewToolbar();
    initRedactToolbar();
    setCommentsStyle();
    setComtentDefaultAuthor("RasterEdge");
    setCustomFileFormat();
    setCookieExpires(7);//day
    //setDefaultSearchText(["Edge"], false, false);
}

function setLanguage() {
    // add the language that supported
    addLanguage("en-US", "English");
    addLanguage("zh-CN", "中文");
}

function initFileToolbar() {

    var tabFile = new CToolbar({ id: "files", name: i18n['tabtitle']['File'], reqDoc: false });
    // File upload
    var fileUpIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['FileOpen'] });

    var uploadFile = new CToolbarIcon({ id: "re_func_upload", title: i18n['tabicon']['UploadFile'], event: 'ShowUploadDialog("uploadPDF");', cssClass: "" });
    fileUpIconGroup.addIcon(uploadFile);
    var onlineFile = new CToolbarIcon({ id: "re_func_online", title: i18n['tabicon']['OpenFile'], event: 'ShowOnlineDialog("onlinefile");', cssClass: "" });
    fileUpIconGroup.addIcon(onlineFile);


    tabFile.addIconGroup(fileUpIconGroup);
    // Save File
    var saveIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Save'] });

    var saveFile = new CToolbarIcon({ id: "re_func_save", title: i18n['tabicon']['Save'], event: 'ShowDialog("save");', cssClass: "toolSaveIconDis" });
    saveIconGroup.addIcon(saveFile);

    tabFile.addIconGroup(saveIconGroup);
    // Save As
    var saveAsIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['SaveAs'] });

    var exportFile = new CToolbarIcon({ id: "re_func_export", title: i18n['tabicon']['SaveAsOther'], event: '', cssClass: "toolExportIconDis" });
    saveAsIconGroup.addIcon(exportFile);

    tabFile.addIconGroup(saveAsIconGroup);
    // Print
    var printIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Print'] });

    var printFile = new CToolbarIcon({ id: "re_func_print", title: i18n['tabicon']['Print'], event: '', cssClass: "toolPrintIconDis" });
    printIconGroup.addIcon(printFile);

    tabFile.addIconGroup(printIconGroup);
    // setting
    var settingsIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Setting'] });

    var settings = new CToolbarIcon({ id: "re_func_settings", title: i18n['tabicon']['Setting'], event: 'ShowSettings();', cssClass: "" });
    settingsIconGroup.addIcon(settings);

    tabFile.addIconGroup(settingsIconGroup);

    addToolbarTab(tabFile);
}

function initViewToolbar() {
    var tabView = new CToolbar({ id: "view", name: i18n['tabtitle']['View'], reqDoc: true });
    // Tools
    var toolIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Tools'] });

    var cursorIcon = new CToolbarIcon({ id: "re_func_arrowCur", title: i18n['tabicon']['ArrowCur'], event: 'ArrowEvent();', cssClass: "re_func_arrowCur " });
    toolIconGroup.addIcon(cursorIcon);
    var hand = new CToolbarIcon({ id: "re_func_handCur", title: i18n['tabicon']['Hand'], event: 'HandleEvent();', cssClass: "re_func_handCur " });
    toolIconGroup.addIcon(hand);

    //var selectarea = new CToolbarIcon({ id: "re_func_selectarea", title: i18n['tabicon']['SelectArea'], event: 'SelectAreaEvent("getsize");', cssClass: "toolMarkZoomIconEn" });
    //toolIconGroup.addIcon(selectarea);

    tabView.addIconGroup(toolIconGroup);
    // page navigation
    var pageIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Navigate'] });

    var firPage = new CToolbarIcon({ id: "", title: i18n['tabicon']['FirstPage'], event: '', cssClass: "navi_first" });
    pageIconGroup.addIcon(firPage);
    var prePage = new CToolbarIcon({ id: "", title: i18n['tabicon']['PreviousPage'], event: '', cssClass: "navi_pre" });
    pageIconGroup.addIcon(prePage);

    var pageselect = new CToolbarIcon();
    pageselect.innerHtml = "<div style='background:#efefef;float:left;'><select class='pageIdList' style='width:85px;height:24px;'></select></div>";
    pageIconGroup.addIcon(pageselect);

    var nextPage = new CToolbarIcon({ id: "", title: i18n['tabicon']['NextPage'], event: '', cssClass: "navi_ne" });
    pageIconGroup.addIcon(nextPage);
    var lastPage = new CToolbarIcon({ id: "", title: i18n['tabicon']['LastPage'], event: '', cssClass: "navi_last" });
    pageIconGroup.addIcon(lastPage);

    tabView.addIconGroup(pageIconGroup);
    // zoom
    var zoomIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Zoom'] });

    var zoomItems = new CToolbarIcon();
    zoomItems.innerHtml = "<div style='margin-left:0px;background:#efefef;float:left;'><select class='zoomList' style='width:85px;height:24px;'></select></div>";
    zoomIconGroup.addIcon(zoomItems);

    var zoomIn = new CToolbarIcon({ id: "", title: i18n['tabicon']['ZoomIn'], event: 'btnZoomIn();', cssClass: "navi_zoomIn" });
    zoomIconGroup.addIcon(zoomIn);
    var zoomOut = new CToolbarIcon({ id: "", title: i18n['tabicon']['ZoomOut'], event: 'btnZoomOut();', cssClass: "navi_zoomOut" });
    zoomIconGroup.addIcon(zoomOut);
    var zoomMark = new CToolbarIcon({ id: "re_func_markzoom", title: i18n['tabicon']['MarqueeZoom'], event: 'markZoom();', cssClass: "toolMarkZoomIconEn" });
    zoomIconGroup.addIcon(zoomMark);

    tabView.addIconGroup(zoomIconGroup);

    // page display
    var pageDisplayIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Display'] });

    var single = new CToolbarIcon({ id: "", title: i18n['tabicon']['SinglePage'], event: 'btnSinglePage();', cssClass: "navi_single" });
    pageDisplayIconGroup.addIcon(single);
    var multi = new CToolbarIcon({ id: "", title: i18n['tabicon']['ContinuesPage'], event: 'btnContinuesPage();', cssClass: "navi_multi" });
    pageDisplayIconGroup.addIcon(multi);

    tabView.addIconGroup(pageDisplayIconGroup);
    // page rotate
    var rotateIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Rotate'] });

    var rotate = new CToolbarIcon({ id: "", title: i18n['tabicon']['Rotate'], event: 'btnRotatePage();', cssClass: "navi_pagerotate" });
    rotateIconGroup.addIcon(rotate);


    tabView.addIconGroup(rotateIconGroup);


    addToolbarTab(tabView);
}

function initCommentsToolbar() {
    var tabComment = new CToolbar({ id: "comments", name: i18n['tabtitle']['Comment'], reqDoc: false, cssClass: " " });
    // Tools
    var toolIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Tools'] });

    var cursorIcon = new CToolbarIcon({ id: "re_func_arrowCur", title: i18n['tabicon']['ArrowCur'], event: 'ArrowEvent();', cssClass: "re_func_arrowCur " });
    toolIconGroup.addIcon(cursorIcon);
    var hand = new CToolbarIcon({ id: "re_func_handCur", title: i18n['tabicon']['Hand'], event: 'HandleEvent();', cssClass: "re_func_handCur " });
    toolIconGroup.addIcon(hand);

    tabComment.addIconGroup(toolIconGroup);
    // Text Markup Comment
    var textMarkupIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['TextMarkup'] });

    var note = new CToolbarIcon({ id: "re_func_notes", title: i18n['tabicon']['StickyNote'], event: 'draw_annotation("notes");ChangeIconStyle("re_func_notes");', cssClass: "" });
    textMarkupIconGroup.addIcon(note);

    var highText = new CToolbarIcon({ id: "re_func_highText", title: i18n['tabicon']['HighlightText'], event: '', cssClass: "" });
    textMarkupIconGroup.addIcon(highText);
    var underlineText = new CToolbarIcon({ id: "re_func_underlineText", title: i18n['tabicon']['UnderlineText'], event: '', cssClass: "" });
    textMarkupIconGroup.addIcon(underlineText);
    var strikeText = new CToolbarIcon({ id: "re_func_strikeText", title: i18n['tabicon']['StrikethroughText'], event: '', cssClass: "" });
    textMarkupIconGroup.addIcon(strikeText);
    var replaceText = new CToolbarIcon({ id: "re_func_replaceText", title: i18n['tabicon']['ReplaceText'], event: '', cssClass: "" });
    textMarkupIconGroup.addIcon(replaceText);
    var textbox = new CToolbarIcon({ id: "re_func_textbox", title: i18n['tabicon']['Textbox'], event: 'draw_annotation("textbox");ChangeIconStyle("re_func_textbox");', cssClass: "" });
    textMarkupIconGroup.addIcon(textbox);
    var text = new CToolbarIcon({ id: "re_func_text", title: i18n['tabicon']['Text'], event: 'draw_annotation("text");ChangeIconStyle("re_func_text");', cssClass: "" });
    textMarkupIconGroup.addIcon(text);
    var stamp = new CToolbarIcon({ id: "re_func_stamp", title: i18n['tabicon']['Stamp'], event: 'ChangeIconStyle("re_func_stamp");', cssClass: "" });
    textMarkupIconGroup.addIcon(stamp);

    tabComment.addIconGroup(textMarkupIconGroup);

    // drawing Comment
    var drawingIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Drawing'] });

    var freehand = new CToolbarIcon({ id: "re_func_freehand", title: i18n['tabicon']['Freehand'], event: 'draw_annotation("freehand");ChangeIconStyle("re_func_freehand");', cssClass: "" });
    drawingIconGroup.addIcon(freehand);
    var line = new CToolbarIcon({ id: "re_func_line", title: i18n['tabicon']['Line'], event: 'draw_annotation("line");ChangeIconStyle("re_func_line");', cssClass: "" });
    drawingIconGroup.addIcon(line);
    var arrow = new CToolbarIcon({ id: "re_func_arrow", title: i18n['tabicon']['Arrow'], event: 'draw_annotation("arrow");ChangeIconStyle("re_func_arrow");', cssClass: "" });
    drawingIconGroup.addIcon(arrow);
    var dimension = new CToolbarIcon({ id: "re_func_dimension", title: i18n['tabicon']['Dimension'], event: 'draw_annotation("dimension");ChangeIconStyle("re_func_dimension");', cssClass: "" });
    drawingIconGroup.addIcon(dimension);
    var circle = new CToolbarIcon({ id: "re_func_circle", title: i18n['tabicon']['Circle'], event: 'draw_annotation("circle");ChangeIconStyle("re_func_circle");', cssClass: "" });
    drawingIconGroup.addIcon(circle);
    var rectangle = new CToolbarIcon({ id: "re_func_rectangle", title: i18n['tabicon']['Rectangle'], event: 'draw_annotation("rectangle");ChangeIconStyle("re_func_rectangle");', cssClass: "" });
    drawingIconGroup.addIcon(rectangle);
    var polygon = new CToolbarIcon({ id: "re_func_polygon", title: i18n['tabicon']['Polygon'], event: 'draw_annotation("polygon");ChangeIconStyle("re_func_polygon");', cssClass: "" });
    drawingIconGroup.addIcon(polygon);
    var Polygonlines = new CToolbarIcon({ id: "re_func_polygonlines", title: i18n['tabicon']['PolygonLines'], event: 'draw_annotation("Polygonlines");ChangeIconStyle("re_func_polygonlines");', cssClass: "" });
    drawingIconGroup.addIcon(Polygonlines);

    tabComment.addIconGroup(drawingIconGroup);

    // attachment comment

    var attachIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Attachment'] });


    var fileattach = new CToolbarIcon({ id: "re_func_fileattach", title: i18n['tabicon']['Attachment'], event: 'showAttachFileBox();ChangeIconStyle("re_func_fileattach");', cssClass: "smallicon_fileattach" });
    attachIconGroup.addIcon(fileattach);

    tabComment.addIconGroup(attachIconGroup);

    // commen export and import
    var commentimport = new CToolbarIconGroup({ name: i18n['tabgroup']['ImportAnnotation'] });

    var importcomment = new CToolbarIcon({ id: "re_func_annotationup", title: i18n['tabicon']['ImportAnnotation'], event: 'ShowUploadDialog("annotation");', cssClass: "" });
    commentimport.addIcon(importcomment);


    tabComment.addIconGroup(commentimport);

    var commentexport = new CToolbarIconGroup({ name: i18n['tabgroup']['ExportAnnotation'] });

    var exportcomment = new CToolbarIcon({ id: "re_func_annotationex", title: i18n['tabicon']['ExportAnnotation'], event: 'ShowDialog("option_annotation")', cssClass: "" });
    commentexport.addIcon(exportcomment);


    tabComment.addIconGroup(commentexport);

    // flatten
    var flattern = new CToolbarIconGroup({ name: "Flatten" });

    var flatternicon = new CToolbarIcon({ id: "re_func_flattern", title: "Flatten all annotations", event: 'flattenAllAnnotation()', cssClass: "" });
    flattern.addIcon(flatternicon);


    tabComment.addIconGroup(flattern);

    addToolbarTab(tabComment);
}


function initRedactToolbar() {
    var tabProtect = new CToolbar({ id: "protect", name: i18n['tabtitle']['Redact'], reqDoc: false });
    // Tools
    var toolIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Tools'] });

    var cursorIcon = new CToolbarIcon({ id: "re_func_arrowCur", title: i18n['tabicon']['ArrowCur'], event: 'ArrowEvent();', cssClass: "re_func_arrowCur " });
    toolIconGroup.addIcon(cursorIcon);
    var hand = new CToolbarIcon({ id: "re_func_handCur", title: i18n['tabicon']['Hand'], event: 'HandleEvent();', cssClass: "re_func_handCur " });
    toolIconGroup.addIcon(hand);

    tabProtect.addIconGroup(toolIconGroup);
    // Redaction
    var redactionIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Redaction'] });

    var markRedaction = new CToolbarIcon({ id: "re_func_markRedact", title: i18n['tabicon']['RedactText'], event: 'MarkForRedact();', cssClass: "" });
    redactionIconGroup.addIcon(markRedaction);
    var markRedactionArea = new CToolbarIcon({ id: "re_func_markAreaRedact", title: i18n['tabicon']['RedactArea'], event: 'MarkAreaRedact();', cssClass: "" });
    redactionIconGroup.addIcon(markRedactionArea);
    var markRedactionAreapages = new CToolbarIcon({ id: "re_func_markAreaRedactPages", title: i18n['tabicon']['RedactMultipleAreas'], event: 'MarkAreaRedact(true);', cssClass: "" });
    redactionIconGroup.addIcon(markRedactionAreapages);
    var markPages = new CToolbarIcon({ id: "re_func_markPage", title: i18n['tabicon']['RedactPages'], event: 'showRedactPageBox();', cssClass: "" });
    redactionIconGroup.addIcon(markPages);
    var redactPros = new CToolbarIcon({ id: "re_func_redactPros", title: i18n['tabicon']['RedactProp'], event: 'showRedactProps("");', cssClass: "" });
    redactionIconGroup.addIcon(redactPros);
    tabProtect.addIconGroup(redactionIconGroup);

    addToolbarTab(tabProtect);
}

function initDemoToolbar() {
    var tabProtect = new CToolbar({ id: "demos", name: i18n['tabtitle']['Demos'], reqDoc: false });
    // Tools
    var toolIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['DemosFile'] });

    var pdf = new CToolbarIcon({ id: "pdfdemo", title: i18n['tabicon']['DemoPDF'], event: 'loadDemo("pdf");', cssClass: "" });
    toolIconGroup.addIcon(pdf);
    var word = new CToolbarIcon({ id: "worddemo", title: i18n['tabicon']['DemoWord'], event: 'loadDemo("word");', cssClass: "" });
    toolIconGroup.addIcon(word);
    var excel = new CToolbarIcon({ id: "exceldemo", title: i18n['tabicon']['DemoExcel'], event: 'loadDemo("excel");', cssClass: "" });
    toolIconGroup.addIcon(excel);
    var ppt = new CToolbarIcon({ id: "pptdemo", title: i18n['tabicon']['DemoPPT'], event: 'loadDemo("ppt");', cssClass: "" });
    toolIconGroup.addIcon(ppt);
    var tiff = new CToolbarIcon({ id: "tiffdemo", title: i18n['tabicon']['DemoTIFF'], event: 'loadDemo("tiff");', cssClass: "" });
    toolIconGroup.addIcon(tiff);
    var dicom = new CToolbarIcon({ id: "dicomdemo", title: i18n['tabicon']['DemoDicom'], event: 'loadDemo("dicom");', cssClass: "" });
    toolIconGroup.addIcon(dicom);


    tabProtect.addIconGroup(toolIconGroup);
   


    addToolbarTab(tabProtect);
}

function setCommentsStyle() {
    rectangleAnnoStyle = new AnnoStyle({ OutLineColor: "#4F81BD", OutLineWidth: 5.0, Transparency: 1.0, FillColor: "none" });
    rectangleAnnoStyle = loadAnnotationStyleCookie("rectangleAnnoStyle", rectangleAnnoStyle);
    underlineTextAnnoStyle = new AnnoStyle({ OutLineColor: "#00ff00", OutLineWidth: 1.0, Transparency: 1.0 });
    underlineTextAnnoStyle = loadAnnotationStyleCookie("underlineTextAnnoStyle", underlineTextAnnoStyle);
    strikeTextAnnoStyle = new AnnoStyle({ OutLineColor: "#ff0000", OutLineWidth: 1.0, Transparency: 1.0 });
    strikeTextAnnoStyle = loadAnnotationStyleCookie("strikeTextAnnoStyle", strikeTextAnnoStyle);
    replaceTextAnnoStyle = new AnnoStyle({ OutLineColor: "#0000ff", OutLineWidth: 1.0, Transparency: 1.0 });
    replaceTextAnnoStyle = loadAnnotationStyleCookie("replaceTextAnnoStyle", replaceTextAnnoStyle);
    highTextAnnoStyle = new AnnoStyle({ FillColor: "#ffff00", Transparency: 0.5 });
    highTextAnnoStyle = loadAnnotationStyleCookie("highTextAnnoStyle", highTextAnnoStyle);
    lineAnnoStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#FF0000", Transparency: 1 });
    lineAnnoStyle = loadAnnotationStyleCookie("lineAnnoStyle", lineAnnoStyle);
    arrowAnnoStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#FF0000", Transparency: 1 });
    arrowAnnoStyle = loadAnnotationStyleCookie("arrowAnnoStyle", arrowAnnoStyle);
    polygonAnnoStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#FF0000", FillColor: "none", Transparency: 1 });
    polygonAnnoStyle = loadAnnotationStyleCookie("polygonAnnoStyle", polygonAnnoStyle);
    polygonLinesAnnoStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#FF0000", Transparency: 1 });
    polygonLinesAnnoStyle = loadAnnotationStyleCookie("polygonLinesAnnoStyle", polygonLinesAnnoStyle);
    freehandAnnoStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#FF0000", Transparency: 1 });
    freehandAnnoStyle = loadAnnotationStyleCookie("freehandAnnoStyle", freehandAnnoStyle);
    circleAnnoStyle = new AnnoStyle({ OutLineWidth: 5.0, OutLineColor: "#1F497D", FillColor: "none", Transparency: 1 });
    circleAnnoStyle = loadAnnotationStyleCookie("circleAnnoStyle", circleAnnoStyle);
    textboxAnnoStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#FF0000", FillColor: "#ffffff", Transparency: 1 });
    textboxAnnoStyle = loadAnnotationStyleCookie("textboxAnnoStyle", textboxAnnoStyle);
    notesAnnoStyle = new AnnoStyle({ FillColor: "#FFFF00", Transparency: 1 });
    notesAnnoStyle = loadAnnotationStyleCookie("notesAnnoStyle", notesAnnoStyle);
    StampStyle = new AnnoStyle({ FillColor: "none", Transparency: 1.0, OutLineWidth: 5.0, OutLineColor: "#FF0000" });
    StampStyle = loadAnnotationStyleCookie("stampAnnoStyle", StampStyle);
    dimensionAnnoStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#FF0000", Transparency: 1, LeaderLength: 25, LeaderExtend: 25, LeaderOffset: 0, TxtFontColor: "#000000", TxtFontSize: 11 });
    dimensionAnnoStyle = loadAnnotationStyleCookie("dimensionAnnoStyle", dimensionAnnoStyle);
    textAnnoStyle = new AnnoStyle({ Transparency: 1, TxtFontColor: "#000000" });
    textAnnoStyle = loadAnnotationStyleCookie("textAnnoStyle", textAnnoStyle);
    redactAnnoStyle = new AnnoStyle({ FillColor: "#000000", MarkOutlineColor: "#FF0000", MarkFillColor: "#FF0000", Transparency: 0.3, isOverlayTxt: false, TxtFontColor: "#FF0000", IsRepeat: false, ShowedText: "", TxtFontSize: 12 });
    TempLinkStyle = new AnnoStyle({ FillColor: "#2DA2BF", Transparency: 0.3 });
    LinkStyle = new AnnoStyle({ OutLineWidth: 2.0, OutLineColor: "#000000", FillColor: "none", Transparency: 1.0 });

    setMeasureAnnotationUOM("px", "px",2);

}

function loadAnnotationStyleCookie(name, style) {
    var cookie = $.cookie(name);
    if (typeof (cookie) == "undefined" || cookie == null || cookie == "")
        return style;
    style = new AnnoStyle($.parseJSON(cookie));
    return style;
}

function setCustomFileFormat() {

    _fileFormat = new Array(".pdf", ".doc", ".docx", ".docm", ".dotx", ".dotm", ".xls", ".xlsx", ".xlsm", ".xltx", ".tif", ".tiff", ".png",
                            ".bmp", ".RLE", ".DIB", ".gif", ".jpg", ".jpeg", ".jfif", ".jpe",
                            ".dcm", ".dic", ".jbig2", ".jbg", ".xbm", ".xpm", ".pbm", ".pgm",
                            ".ppm", ".dng", ".jp2", ".j2k", ".wbm", ".ppt", ".pptx", ".ppsx", ".pptm", ".potm", ".potx", ".ppsm", ".fdf", ".xfdf", ".txt", ".csv");
    var tip = "<br/>&nbsp;&nbsp;&nbsp;&nbsp;Microsoft Word (.doc,.docx,.docm,.dotx,.dotm)<br/>&nbsp;&nbsp;&nbsp;&nbsp;Microsoft Excel (.xls,.xlsx,.xlsm,.xltx)<br/>&nbsp;&nbsp;&nbsp;&nbsp;Microsoft PowerPoint (.ppt,.pptx,.ppsx,.pptm,.potm,.potx,.ppsm)<br/>&nbsp;&nbsp;&nbsp;&nbsp;ODF (.odt,odp)<br/>&nbsp;&nbsp;&nbsp;&nbsp;CSV (.csv)<br/>&nbsp;&nbsp;&nbsp;&nbsp;Tiff (.tiff,.tif)<br/>&nbsp;&nbsp;&nbsp;&nbsp;DICOM (.dcm)<br/>&nbsp;&nbsp;&nbsp;&nbsp;Image formats (.gif,.png,.jpeg,...)";
    setSupportFormatTip(tip);
}

