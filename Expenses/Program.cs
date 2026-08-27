
using Expenses.Data;
using Expenses.Data.Services;
using Microsoft.EntityFrameworkCore;

namespace Expenses
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            var conn = builder.Configuration.GetConnectionString("Default");
            builder.Services.AddDbContext<AppDbContext>(OptionsBuilderConfigurationExtensions => OptionsBuilderConfigurationExtensions.UseSqlServer(conn));
            builder.Services.AddScoped<ITransactionService, TransactionsServices>();
            builder.Services.AddControllers();
            // Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
            //builder.Services.AddOpenApi(); to delete
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen(); 

            

            // Add services to the container
            builder.Services.AddCors(opt => opt.AddPolicy("AllowAll",
                opt => opt.AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowAnyOrigin())
            );

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                // app.MapOpenApi(); to delete
                app.UseSwagger();
                app.UseSwaggerUI(); 

            }


            app.UseCors("AllowAll");

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
