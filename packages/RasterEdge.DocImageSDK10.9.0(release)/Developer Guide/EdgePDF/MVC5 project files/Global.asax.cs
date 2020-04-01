using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;
using RasterEdge.XDoc.PDF.HTML5Editor;
using RasterEdge.Imaging.Basic;
using RasterEdge.WDP;
using System.Web.Caching;

namespace EdgePDFMVC5Demo
{
    public class MvcApplication : System.Web.HttpApplication
    {
        public System.Threading.Thread schedulerThread = null;
        private static string DummyPageUrl = "";
        private const string DummyCacheItemKey = "CacheRegistry";

        protected void Application_Start()
        {
            Logger.initLog();
            TimerTask();
            AreaRegistration.RegisterAllAreas();
            RouteConfig.RegisterRoutes(RouteTable.Routes);
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

        public void CacheItemRemovedCallback(string key, object value, CacheItemRemovedReason reason)
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
    }
}
