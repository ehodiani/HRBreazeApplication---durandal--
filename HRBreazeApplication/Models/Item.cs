using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HRBreazeApplication.Models
{
    public class Item
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        public double Price { get; set; }
        public int Tax { get; set; }

        public int? CategoryId { get; set; }
        public virtual Category Category { get; set; }

        [MaxLength(4000)]
        public string Description { get; set; }
        public DateTime Date_Created { get; set; }

        [ForeignKey("Items_Created_By"), Column(Order = 0)]
        public int? Created_By { get; set; }
        public virtual UserProfile Items_Created_By { get; set; }

        public DateTime Date_Updated { get; set; }

        [ForeignKey("Items_Updated_By"), Column(Order = 1)]
        public int? Updated_By { get; set; }
        public virtual UserProfile Items_Updated_By { get; set; }


    }
}
