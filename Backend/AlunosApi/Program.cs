using AlunosApi.Context;
using AlunosApi.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using System.ComponentModel.Design;
using System.Configuration;

var builder = WebApplication.CreateBuilder(args);
//builder.Services.AddSingleton<IAlunoService, AlunosService>();
builder.Services.AddScoped<IAlunoService, AlunosService>();
builder.Services.AddDbContext<AppDbContext>();

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();



var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(options =>
{
    options.WithOrigins("http://localhost:3000");
    options.AllowAnyMethod();
    options.AllowAnyHeader();
});

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
