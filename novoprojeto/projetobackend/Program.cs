using Microsoft.EntityFrameworkCore;

namespace Projetobackend
{
    public class Usuario
    {
        public int Id { get; set; }
        public string Nome { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Password { get; set; } = string.Empty;
    }

    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<Usuario> Usuarios => Set<Usuario>();
    }

    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<AppDbContext>(opt =>
                opt.UseInMemoryDatabase("UsuariosDB"));

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            // CREATE
            app.MapPost("/usuarios", async (Usuario usuario, AppDbContext db) =>
            {
                db.Usuarios.Add(usuario);
                await db.SaveChangesAsync();
                return Results.Created($"/usuarios/{usuario.Id}", usuario);
            });

            // READ (todos)
            app.MapGet("/usuarios", async (AppDbContext db) =>
                await db.Usuarios.ToListAsync());

            // READ (por ID)
            app.MapGet("/usuarios/{id:int}", async (int id, AppDbContext db) =>
                await db.Usuarios.FindAsync(id)
                    is Usuario u ? Results.Ok(u) : Results.NotFound());

            // UPDATE
            app.MapPut("/usuarios/{id:int}", async (int id, Usuario dados, AppDbContext db) =>
            {
                var usuario = await db.Usuarios.FindAsync(id);
                if (usuario is null) return Results.NotFound();

                usuario.Nome = dados.Nome;
                usuario.Email = dados.Email;
                usuario.Password = dados.Password;

                await db.SaveChangesAsync();
                return Results.Ok(usuario);
            });

            // DELETE
            app.MapDelete("/usuarios/{id:int}", async (int id, AppDbContext db) =>
            {
                var usuario = await db.Usuarios.FindAsync(id);
                if (usuario is null) return Results.NotFound();

                db.Usuarios.Remove(usuario);
                await db.SaveChangesAsync();
                return Results.NoContent();
            });

            app.Run();
        }
    }
}
