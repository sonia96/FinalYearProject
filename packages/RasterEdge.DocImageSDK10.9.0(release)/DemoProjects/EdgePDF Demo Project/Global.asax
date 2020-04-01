<%@ Application Language="C#" %>
<%@ Import Namespace="RasterEdge.XDoc.PDF.HTML5Editor" %>
<%@ Import Namespace="RasterEdge.Imaging.Basic" %>
<%@ Import Namespace="RasterEdge.WDP" %>

<script runat="server">
    
    public System.Threading.Thread schedulerThread = null;
    private static string DummyPageUrl = "";
    private const string DummyCacheItemKey = "CacheRegistry";
    void Application_Start(object sender, EventArgs e) 
    {
   	Logger.initLog();
	RegisterRouters(System.Web.Routing.RouteTable.Routes);  //asp.net 4.0 or higher
        TimerTask();
    }
    void RegisterRouters(System.Web.Routing.RouteCollection routes)
    {

        routes.MapPageRoute("restfulroute4", "restful/{action}/{p1}/{p2}/{p3}/{p4}", "~/Restful.ashx");
        routes.MapPageRoute("restfulroute3","restful/{action}/{p1}/{p2}/{p3}","~/Restful.ashx");
        routes.MapPageRoute("restfulroute2", "restful/{action}/{p1}/{p2}", "~/Restful.ashx");
        routes.MapPageRoute("restfulroute1", "restful/{action}/{p1}", "~/Restful.ashx");
        routes.MapPageRoute("restfulroute0", "restful/{action}", "~/Restful.ashx");
       
    }  
    void Application_End(object sender, EventArgs e) 
    {
        //  Code that runs on application shutdown
        if (null != schedulerThread)
            schedulerThread.Abort();
    }
        
    void Application_Error(object sender, EventArgs e) 
    { 
        // Code that runs when an unhandled error occurs
    }

    void Session_Start(object sender, EventArgs e) 
    {
        // Code that runs when a new session is started

    }

    void Session_End(object sender, EventArgs e) 
    {
        // Code that runs when a session ends. 
        // Note: The Session_End event is raised only when the sessionstate mode
        // is set to InProc in the Web.config file. If session mode is set to StateServer 
        // or SQLServer, the event is not raised.
    }

    private void TimerTask()
    {
        RegisterCacheEntry();
        Scheduler.ClearAllFolder();
        Scheduler.StartFileCacheCleanTask(FileCacheCleanType.FileLifeMaxTime, new IntervalTime(3, 0, 0));
        Scheduler.StartFileCacheCleanTask(FileCacheCleanType.FileCacheCleanTime, new IntervalTime(3, 0, 0));
        Scheduler.StartUserCacheCleanTask(UserCacheCleanType.UserRequestMaxTime, new IntervalTime(3, 0, 0));
        Scheduler.StartUserCacheCleanTask(UserCacheCleanType.UserFileRequestCacheCleanTime, new IntervalTime(3, 0, 0));
        Logger.LogSystem("Cache Auto clear Start", LogType.INFO);
    }

    private void RegisterCacheEntry()
    {
        if (null != HttpContext.Current.Cache[DummyCacheItemKey]) return;
        HttpContext.Current.Cache.Add(DummyCacheItemKey, "Test", null, DateTime.MaxValue, TimeSpan.FromMinutes(15), CacheItemPriority.NotRemovable, new CacheItemRemovedCallback(CacheItemRemovedCallback));
    }
    
    public void CacheItemRemovedCallback(string key,object value,CacheItemRemovedReason reason)
    {
        System.Net.WebClient client = new System.Net.WebClient();
        
        client.DownloadData(DummyPageUrl);
    }

    protected void Application_BeginRequest(Object sender, EventArgs e)
    {
        if (DummyPageUrl == "")
            DummyPageUrl = HttpContext.Current.Request.Url.ToString();
        RegisterCacheEntry();
    }  
</script>
