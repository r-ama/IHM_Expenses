using Expenses.Models.Base;

namespace Expenses.Models
{
    public class Transaction:BaseEntity
    {
        public string Type  { get; set; }
        public double Amount { get; set; }
        public string Category { get; set; }
     
    }
}
