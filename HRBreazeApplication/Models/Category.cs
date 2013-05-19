using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HRBreazeApplication.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        public DateTime Date_Created { get; set; }

        [ForeignKey("Category_Created_By"), Column(Order = 0)]
        public int? Created_By { get; set; }
        public virtual UserProfile Category_Created_By { get; set; }

        public DateTime Date_Updated { get; set; }

        [ForeignKey("Category_Updated_By"), Column(Order = 1)]
        public int? Updated_By { get; set; }
        public virtual UserProfile Category_Updated_By { get; set; }


    }
}
