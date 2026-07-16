namespace Expenses.Models.Base
{
    public class BaseEntity
    {
        public int Id { get; set; }
        public DateTime CreatedDate { get; set; } 
        public DateTime UpdatedAt { get; set; }
    }
}
