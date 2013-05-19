using System;
using System.Web.Optimization;

namespace HRBreazeApplication
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.IgnoreList.Clear();
            AddDefaultIgnorePatterns(bundles.IgnoreList);

            bundles.Add(
                new ScriptBundle("~/scripts/modernizr")
                    .Include("~/scripts/modernizr-{version}.js"));

            bundles.Add(
              new ScriptBundle("~/scripts/jqury")
                  .Include("~/scripts/jquery-2.0.0.min.js"));

            bundles.Add(
            new ScriptBundle("~/scripts/knockout")
                 .Include("~/scripts/knockout-2.2.1.debug.js"));


            bundles.Add(
          new ScriptBundle("~/scripts/toastr")
               .Include("~/scripts/toastr.js"));


            bundles.Add(
            new ScriptBundle("~/scripts/q")
              .Include("~/scripts/Q.js")

              );

            bundles.Add(
             new ScriptBundle("~/scripts/breeze")

               .Include("~/scripts/breeze.debug.js")
               );

            bundles.Add(
           new ScriptBundle("~/scripts/sammy")

              .Include("~/scripts/sammy-{version}.js")
             );


            bundles.Add(
           new ScriptBundle("~/scripts/moment")
            .Include("~/scripts/moment.min.js")

             );

            bundles.Add(
              new ScriptBundle("~/scripts/vendor")
                //.Include("~/scripts/jquery-{version}.min.js")

                .Include("~/scripts/bootstrap.min.js")




                );


            bundles.Add(
             new StyleBundle("~/Content/css")
                .Include("~/Content/ie10mobile.css") // Must be first. IE10 mobile viewport fix 
                .Include("~/Content/bootstrap.min.css")
                .Include("~/Content/bootstrap-responsive.min.css")
                .Include("~/Content/bootstrap-custom.css")
                .Include("~/Content/font-awesome.min.css")
                .Include("~/Content/toastr.css")
                .Include("~/Content/jquery.multiselect.css")
                .Include("~/Content/jquery-ui.css")
                .Include("~/Content/styles.css"));

            //BundleTable.EnableOptimizations = true;
        }

        public static void AddDefaultIgnorePatterns(IgnoreList ignoreList)
        {
            if (ignoreList == null)
            {
                throw new ArgumentNullException("ignoreList");
            }

            ignoreList.Ignore("*.intellisense.js");
            ignoreList.Ignore("*-vsdoc.js");
            //ignoreList.Ignore("*.debug.js", OptimizationMode.WhenEnabled);
            //ignoreList.Ignore("*.min.js", OptimizationMode.WhenDisabled);
            //ignoreList.Ignore("*.min.css", OptimizationMode.WhenDisabled);
        }
    }
}