using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace HRBreazeApplication.Models
{
    public class Employee
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(250)]
        public string Name { get; set; }
        [Required]
        public float Salary { get; set; }
        [MaxLength(250)]
        public string Email { get; set; }
        [MaxLength(250)]
        public string Phone { get; set; }

        [Required]
        public int? DepartmentId { get; set; }
        public virtual Department Department { get; set; }

        public DateTime Date_Created { get; set; }

        [ForeignKey("Employee_Created_By"), Column(Order = 0)]
        public int? Created_By { get; set; }
        public virtual UserProfile Employee_Created_By { get; set; }

        public DateTime Date_Updated { get; set; }

        [ForeignKey("Employee_Updated_By"), Column(Order = 1)]
        public int? Updated_By { get; set; }
        public virtual UserProfile Employee_Updated_By { get; set; }


    }
}
