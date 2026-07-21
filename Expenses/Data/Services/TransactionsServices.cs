using Expenses.Dtos;
using Expenses.Models;
//using System.Transactions;

namespace Expenses.Data.Services
{
    public interface ITransactionService
    {
        List<Transaction> GetAll();

        Transaction? GetById(int id);

        Transaction Add(PostTransactionDto transaction);

        Transaction? Update(int id, PutTransactionDto transaction);

        void Delete(int id);

    }
    public class TransactionsServices(AppDbContext context) : ITransactionService
    {
        public Transaction Add(PostTransactionDto transaction)
        {
            var newTransaction = new Transaction()
            {
                Amount = transaction.Amount,
                Type = transaction.Type,
                Category = transaction.Category,
                CreatedDate = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow
            };
            context.Transactions.Add(newTransaction);
            context.SaveChanges();
            return newTransaction;
        }

        public void Delete(int id)
        {
            var transactionDb = context.Transactions.FirstOrDefault(n => n.Id == id);
            if (transactionDb != null)
            {
                context.Transactions.Remove(transactionDb);
                context.SaveChanges();
            }
        }

        public List<Transaction> GetAll()
        {
            var allTransactions = context.Transactions.ToList();
            return allTransactions ;
        }

        public Transaction? GetById(int id)
        {
            var transactionDb = context.Transactions.FirstOrDefault(t => t.Id == id);
            return transactionDb;
        }

        public Transaction? Update(int id, PutTransactionDto transaction)
        {
            var transactionDb = context.Transactions.FirstOrDefault(n => n.Id == id);
            if (transactionDb != null)
            {
                transactionDb.Type = transaction.Type;
                transactionDb.Amount = transaction.Amount;
                transactionDb.Category = transaction.Category;
                transactionDb.UpdatedAt = DateTime.UtcNow;

                context.Transactions.Update(transactionDb);
                context.SaveChanges();
            }

            return transactionDb;
        }
    }
}
