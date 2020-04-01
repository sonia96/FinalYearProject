using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;
using RasterEdge.XDoc.PDF.HTML5Editor;
using RasterEdge.WDP;
using System.Web.Caching;

namespace EdgePDF
{
    // Note: For instructions on enabling IIS6 or IIS7 classic mode, 
    // visit http://go.microsoft.com/?LinkId=9394801
    public class MvcApplication : System.Web.HttpApplication
    {
        public System.Threading.Thread schedulerThread = null;
        private static string DummyPageUrl = "";
        private const string DummyCacheItemKey = "CacheRegistry";
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();

            WebApiConfig.Register(GlobalConfiguration.Configuration);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            Logger.initLog();

            TimerTask();
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
            if (string.IsNullOrEmpty(DummyPageUrl))
                return;
            try
            {
                System.Net.WebClient client = new System.Net.WebClient();
                client.DownloadData(DummyPageUrl);
            }
            catch (Exception ex)
            {
                Logger.LogSystem("Download cache error.", LogType.ERROR);
            }
        }
    }
}