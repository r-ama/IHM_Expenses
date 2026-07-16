using Expenses.Data;
using Expenses.Dtos;
using Expenses.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Expenses.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransactionsController(AppDbContext context) : ControllerBase
    {
        [HttpGet]
        public IActionResult GetAll()
        {
            var allTransactions = context.Transactions.ToList();
            return Ok(allTransactions);
        }
        
        [HttpPost]
        public IActionResult CreateTransaction([FromBody]PostTransactionDto payload)
        {

            var newTransaction = new Transaction()
            {
                Amount = payload.Amount,
                Type = payload.Type,
                Category = payload.Category,
                CreatedDate = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            context.Transactions.Add(newTransaction);
            context.SaveChanges();
            return Ok();
        }
    }
}
