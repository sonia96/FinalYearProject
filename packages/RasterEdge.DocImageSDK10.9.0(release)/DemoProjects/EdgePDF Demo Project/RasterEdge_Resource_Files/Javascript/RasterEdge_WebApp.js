var setWebConfiguration = function () {
    setAppType("pdfeditor");
    setDialog("UPLOAD-PDF"); //CONVERT-2-PDF, OPEN-ONLINE-PDF, COMBINE-FILES-2-PDF, UPLOAD-PDF, NOFILE
    setEditorUploadMethod(["CONVERT-2-PDF", "OPEN-ONLINE-PDF", "COMBINE-FILES-2-PDF", "UPLOAD-PDF"]);
   
    setLanguage();
}

var initWebApplication = function () {
    enableContentEdit();
    setWebTitle(i18n['web']['EditorTitle'], true);
    setApplicationTitle(i18n['web']['AppEditorTitle']);
    initFileToolbar();
    initViewToolbar();
    initCommentsToolbar();
    initEditToolbar();
    initPagesToolbar();
    initProtectionToolbar();
    setCommentsStyle();
    setComtentDefaultAuthor("RasterEdge");
    setCustomFileFormat();
    setCookieExpires(7);//day
    //setDefaultSearchText(["Name"], false, false);
}



function setLanguage() {
    // add the language that supported
    addLanguage("en-US", "English");
    addLanguage("zh-CN", "中文");
}

function initFileToolbar() {

    var tabFile = new CToolbar({ id: "files", name: i18n['tabtitle']['File'], reqDoc: false });
    // File upload
    var fileUpIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['FileUpload'] });

    var uploadFile = new CToolbarIcon({ id: "re_func_upload", title: i18n['tabicon']['UploadPDF'], event: 'showInitFileDialog("uploadPDF");', cssClass: "" });
    fileUpIconGroup.addIcon(uploadFile);
    var onlineFile = new CToolbarIcon({ id: "re_func_online", title: i18n['tabicon']['OpenPDF'], event: 'showInitFileDialog("onlinefile");', cssClass: "" });
    fileUpIconGroup.addIcon(onlineFile);
    var otherFile = new CToolbarIcon({ id: "re_func_files", title: i18n['tabicon']['CreatePDFFromOther'], event: 'showInitFileDialog("uploadOthers");', cssClass: "" });
    fileUpIconGroup.addIcon(otherFile);

    tabFile.addIconGroup(fileUpIconGroup);
    // Save File
    var saveIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Save'] });

    var saveFile = new CToolbarIcon({ id: "re_func_save", title: i18n['tabicon']['SavePDF'], event: 'ShowDialog("save");', cssClass: "toolSaveIconDis" });
    saveIconGroup.addIcon(saveFile);

    tabFile.addIconGroup(saveIconGroup);
    // Save As
    var saveAsIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['SaveAs'] });

    var exportFile = new CToolbarIcon({ id: "re_func_export", title: i18n['tabicon']['SaveAs'], event: '', cssClass: "toolExportIconDis" });
    saveAsIconGroup.addIcon(exportFile);

    tabFile.addIconGroup(saveAsIconGroup);
    // Print 
    var printIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Print'] });

    var printFile = new CToolbarIcon({ id: "re_func_print", title: i18n['tabicon']['Print'], event: '', cssClass: "toolPrintIconDis" });
    printIconGroup.addIcon(printFile);

    tabFile.addIconGroup(printIconGroup);
    // properties
    var propertiesIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Prop'] });

    var properties = new CToolbarIcon({ id: "re_func_properties", title: i18n['tabicon']['Prop'], event: 'ShowProperties();', cssClass: "toolPropertiesIconDis" });
    propertiesIconGroup.addIcon(properties);

    tabFile.addIconGroup(propertiesIconGroup);
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

    var removeAllGroup = new CToolbarIconGroup({ name: 'Remove' });

    var remove = new CToolbarIcon({ id: "re_func_RemoveAnnos", title: "Clear All Annotations", event: 'clearAllAnnotaions()', cssClass: "" });

    removeAllGroup.addIcon(remove);

    tabComment.addIconGroup(removeAllGroup);

    // flatten
    var flattern = new CToolbarIconGroup({ name: "Flatten" });

    var flatternicon = new CToolbarIcon({ id: "re_func_flattern", title: "Flatten all annotations", event: 'flattenAllAnnotation()', cssClass: "" });
    flattern.addIcon(flatternicon);


    tabComment.addIconGroup(flattern);

    addToolbarTab(tabComment);
}


function clearAllAnnotaions() {
    var godelete = window.confirm("Are you sure to remove all annotations and mark for redactions?", "Warning");
    if (godelete) {
        deleteAllAnnotations(); //remove all annotations including mark for redactions.
    }
}

function initEditToolbar() {
    var tabEdit = new CToolbar({ id: "edit", name: i18n['tabtitle']['Edit'], reqDoc: false });
    // Tools
    var toolIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Tools'] });

    var cursorIcon = new CToolbarIcon({ id: "re_func_arrowCur", title: i18n['tabicon']['ArrowCur'], event: 'ArrowEvent();', cssClass: "re_func_arrowCur " });
    toolIconGroup.addIcon(cursorIcon);
    var hand = new CToolbarIcon({ id: "re_func_handCur", title: i18n['tabicon']['Hand'], event: 'HandleEvent();', cssClass: "re_func_handCur " });
    toolIconGroup.addIcon(hand);
    var editcontent = new CToolbarIcon({ id: "re_func_editTxt", title: i18n['tabicon']['Edit'], event: 'EditPDFText();', cssClass: " " });
    toolIconGroup.addIcon(editcontent);

    tabEdit.addIconGroup(toolIconGroup);
    // Text  Edit
    var textEditIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['TextEdit'] });

    var addtest = new CToolbarIcon({ id: "re_func_addTxt", title: i18n['tabicon']['AddText'], event: 'AddPDFText();', cssClass: "" });
    textEditIconGroup.addIcon(addtest);

    var fontSz = new CToolbarIcon();
    fontSz.innerHtml = "<select id='re_func_fontSz' class='iconHover' style='width:75px;height:18px;' onchange='FontFormat(this);'></select>";
    textEditIconGroup.addIcon(fontSz);
    var fontFm = new CToolbarIcon();
    fontFm.innerHtml = "<select id='re_func_fontFm'  class='iconHover' style='width:75px;height:18px;' onchange='FontFormat(this);'></select>";
    textEditIconGroup.addIcon(fontFm);

    var fontB = new CToolbarIcon({ id: "re_func_fontB", title: i18n['tabicon']['TextBlod'], event: '', cssClass: "" });
    textEditIconGroup.addIcon(fontB);
    var fontI = new CToolbarIcon({ id: "re_func_fontI", title: i18n['tabicon']['TextItalic'], event: '', cssClass: "" });
    textEditIconGroup.addIcon(fontI);
    var fontU = new CToolbarIcon({ id: "re_func_fontU", title: i18n['tabicon']['TextUnderline'], event: '', cssClass: "" });
    textEditIconGroup.addIcon(fontU);
    var fontS = new CToolbarIcon({ id: "re_func_fontS", title: i18n['tabicon']['TextStrikethrough'], event: '', cssClass: "" });
    textEditIconGroup.addIcon(fontS);
    var groundColor = new CToolbarIcon({ id: "", title: "", event: '', cssClass: "" });
    groundColor.innerHtml = "<div id='re_func_fontBC' class='iconHover' style='width:23px;height:33px;font-size:15px;font-weight:bold;border:1px solid #727272;background:#ffff00;text-align:center;line-height:33px;color:#000000;' title='" + i18n['tabicon']['TextBackgroundColor'] + "'>ab</div>";
    textEditIconGroup.addIcon(groundColor);
    var fontColor = new CToolbarIcon({ id: "", title: "", event: '', cssClass: "" });
    fontColor.innerHtml = "<div id='re_func_fontC'  class='iconHover' style='width:23px;height:33px;font-size:15px;font-weight:bold;border:1px solid #727272;background:#000000;color:#ffff00;text-align:center;line-height:33px;' title='" + i18n['tabicon']['TextFontColor'] + "'>ab</div>";
    textEditIconGroup.addIcon(fontColor);

    tabEdit.addIconGroup(textEditIconGroup);
    // Image Edit
    var imageEditIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['ImageEdit'] });
    var imageFormats = new Array(".png", ".bmp", ".RLE", ".DIB", ".jpg", ".jpeg", ".jfif", ".jpe", ".jbig2", ".jbg", ".xbm", ".xpm", ".pbm", ".pgm",
                              ".ppm", ".dng", ".jp2", ".j2k", ".wbm");

    var addImage = new CToolbarIcon({ id: "", title: "", event: '', cssClass: "" });
    addImage.innerHtml = "<div id='re_func_addImg'  class='iconHover' title='" + i18n['tabicon']['AddImage'] + "' onclick='ImgToInsert.click()'><input type='file' id='ImgToInsert' name='ImgToInsert' accept='" + imageFormats + "' style='opacity:0;right:0px;display:none;position:absolute;' onchange='AddPDFImage()'/></div>";
    imageEditIconGroup.addIcon(addImage);
    var replaceImage = new CToolbarIcon({ id: "", title: "", event: '', cssClass: "" });
    replaceImage.innerHtml = "<div id='re_func_imgReplace' class='iconHover'  title='" + i18n['tabicon']['ReplaceImage'] + "' onclick='ImgToReplace.click()'><input type='file' id='ImgToReplace' name='ImgToReplace' accept='" + imageFormats + "' style='opacity:0;right:0px;display:none;top:0px;position:absolute;' onchange='ReplaceImage()'/></div>";
    imageEditIconGroup.addIcon(replaceImage);

    var horFlip = new CToolbarIcon({ id: "re_func_horFlip", title: i18n['tabicon']['FlipHorizontal'], event: '', cssClass: "" });
    imageEditIconGroup.addIcon(horFlip);
    var VerFlip = new CToolbarIcon({ id: "re_func_verFlip", title: i18n['tabicon']['FlipVertical'], event: '', cssClass: "" });
    imageEditIconGroup.addIcon(VerFlip);
    var couRotate = new CToolbarIcon({ id: "re_func_couRotate", title: i18n['tabicon']['RotateCounterclockwise'], event: '', cssClass: "" });
    imageEditIconGroup.addIcon(couRotate);
    var rotate = new CToolbarIcon({ id: "re_func_rotate", title: i18n['tabicon']['RotateClockwise'], event: '', cssClass: "" });
    imageEditIconGroup.addIcon(rotate);

    tabEdit.addIconGroup(imageEditIconGroup);
    // Add or Edit link
    var linkIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['LinkEdit'] });


    var linked = new CToolbarIcon({ id: "re_func_link", title: i18n['tabicon']['LinkEdit'], event: 'EditLink();', cssClass: "" });
    linkIconGroup.addIcon(linked);


    tabEdit.addIconGroup(linkIconGroup);
    // Clipboard
    var clipIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Clipboard'] });


    var cut = new CToolbarIcon({ id: "re_func_cut", title: i18n['tabicon']['CutSelection'], event: '', cssClass: "" });
    clipIconGroup.addIcon(cut);
    var copy = new CToolbarIcon({ id: "re_func_copy", title: i18n['tabicon']['CopySelection'], event: '', cssClass: "" });
    clipIconGroup.addIcon(copy);
    var past = new CToolbarIcon({ id: "re_func_past", title: i18n['tabicon']['PasteSelection'], event: 'PastEvent();', cssClass: "" });
    clipIconGroup.addIcon(past);
    var deleSelection = new CToolbarIcon({ id: "re_func_delete", title: i18n['tabicon']['DeleteSelection'], event: '', cssClass: "" });
    clipIconGroup.addIcon(deleSelection);
    var selectAll = new CToolbarIcon({ id: "re_func_selectAll", title: i18n['tabicon']['SelectAll'], event: '', cssClass: "" });
    clipIconGroup.addIcon(selectAll);

    tabEdit.addIconGroup(clipIconGroup);

    addToolbarTab(tabEdit);
}

function initPagesToolbar() {
    var tabPage = new CToolbar({ id: "page", name: i18n['tabtitle']['Pages'], reqDoc: false });
    //  Manipulate Page 
    var manipulateIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['ManipulatePage'] });

    var delPages = new CToolbarIcon({ id: "re_func_delPages", title: i18n['tabicon']['DeletePages'], event: '', cssClass: "" });
    manipulateIconGroup.addIcon(delPages);
    var reOrdPages = new CToolbarIcon({ id: "re_func_reOrdPages", title: i18n['tabicon']['ReorderPages'], event: '', cssClass: "" });
    manipulateIconGroup.addIcon(reOrdPages);
    var extractPages = new CToolbarIcon({ id: "re_func_extPages", title: i18n['tabicon']['ExtractPages'], event: '', cssClass: "" });
    manipulateIconGroup.addIcon(extractPages);
    var replacePages = new CToolbarIcon();
    replacePages.innerHtml = "<div id='re_func_replPages' class='iconHover' onclick='FileToReplace.click()' title='" + i18n['tabicon']['ReplacePages'] + "'><input type='file' id='FileToReplace' name='FileToReplace' accept='.pdf' style='opacity:0;right:0px;display:none;position:absolute;' onchange='UploadReplaceFile();'/></div>";
    manipulateIconGroup.addIcon(replacePages);
    var splitDocs = new CToolbarIcon({ id: "re_func_split", title: i18n['tabicon']['SplitPage'], event: '', cssClass: "" });
    manipulateIconGroup.addIcon(splitDocs);

    tabPage.addIconGroup(manipulateIconGroup);
    // Insert page
    var insertIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['InsertPage'] });

    var insertBk = new CToolbarIcon({ id: "re_func_insertBk", title: i18n['tabicon']['InsertBlankPage'], event: '', cssClass: "" });
    insertIconGroup.addIcon(insertBk);
    var insertFF = new CToolbarIcon({ id: "", title: "", event: '', cssClass: "" });
    insertFF.innerHtml = "<div id='re_func_insertFF' class='iconHover' title='" + i18n['tabicon']['InsertFilePage'] + "' onclick='FileToInsert.click()'><input type='file' id='FileToInsert' name='FileToInsert' accept='.pdf' style='opacity:0;right:0px;display:none;position:absolute;' onchange='InsertFFPage()'/></div>";
    insertIconGroup.addIcon(insertFF);
  

    tabPage.addIconGroup(insertIconGroup);

    // Rotate Page
    var rotateIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Rotate'] });

    var rotatepage = new CToolbarIcon({ id: "", title: i18n['tabicon']['RotateFile'], event: 'btnRotateFile();', cssClass: "navi_filerotate" });
    rotateIconGroup.addIcon(rotatepage);

    tabPage.addIconGroup(rotateIconGroup);

    // Combine PDF

    var combineIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['CombineFile'] });

    var combines = new CToolbarIcon({ id: "re_func_combine", title: i18n['tabicon']['CombineFilePages'], event: 'ShowComBox();', cssClass: "" });
    combineIconGroup.addIcon(combines);

    tabPage.addIconGroup(combineIconGroup);

    addToolbarTab(tabPage);
}

function initProtectionToolbar() {
    var tabProtect = new CToolbar({ id: "protect", name: i18n['tabtitle']['Protection'], reqDoc: false });
    // Tools
    var toolIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Tools'] });

    var cursorIcon = new CToolbarIcon({ id: "re_func_arrowCur", title: i18n['tabicon']['ArrowCur'], event: 'ArrowEvent();', cssClass: "re_func_arrowCur " });
    toolIconGroup.addIcon(cursorIcon);
    var hand = new CToolbarIcon({ id: "re_func_handCur", title: i18n['tabicon']['Hand'], event: 'HandleEvent();', cssClass: "re_func_handCur " });
    toolIconGroup.addIcon(hand);

    tabProtect.addIconGroup(toolIconGroup);
    // Restrict Editing
    var restrictEditIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['RestrictEdit'] });

    var restrictEdit = new CToolbarIcon({ id: "re_func_resEdit", title: i18n['tabicon']['AddPassword'], event: '', cssClass: "" });
    restrictEditIconGroup.addIcon(restrictEdit);

    tabProtect.addIconGroup(restrictEditIconGroup);
    // Encrypt
    var encryptWithPsIconGroup = new CToolbarIconGroup({ name: i18n['tabgroup']['Encrypt'] });

    var encryptWithPs = new CToolbarIcon({ id: "re_func_encWithPs", title: i18n['tabicon']['Encrypt'], event: 'ConfirmPopBox();', cssClass: "" });
    encryptWithPsIconGroup.addIcon(encryptWithPs);

    tabProtect.addIconGroup(encryptWithPsIconGroup);
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

    var searchredact = new CToolbarIcon({ id: "re_func_searchredact", title: i18n['tabicon']['RedactSearchText'], event: 'redactCurrentSearch();', cssClass: "" });
    redactionIconGroup.addIcon(searchredact);

    var redactPros = new CToolbarIcon({ id: "re_func_redactPros", title: i18n['tabicon']['RedactProp'], event: 'showRedactProps("");', cssClass: "" });
    redactionIconGroup.addIcon(redactPros);

    tabProtect.addIconGroup(redactionIconGroup);


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

    setMeasureAnnotationUOM("cm", "cm", 2);

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


