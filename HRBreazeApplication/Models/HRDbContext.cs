using HRBreazeApplication.Migrations;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;
using System.Linq;
using System.Web;

namespace HRBreazeApplication.Models
{
    public class HRDbContext:DbContext
    {
        public HRDbContext()
            : base(nameOrConnectionString: "HRBreeze1") { }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            // user singular table names
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

            
            Database.SetInitializer(new MigrateDatabaseToLatestVersion<HRDbContext, Configuration>());

        }

        public DbSet<Department> Departmants { get;set;}
        public DbSet<Employee> Employees { get; set; }
        public DbSet<UserProfile> UserProfiles { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<Item> Items { get; set; }
        
    }
}