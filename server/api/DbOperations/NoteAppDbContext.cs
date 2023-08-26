using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.DbOperations 
{
    public class NoteAppDbContext : DbContext 
    {
        public NoteAppDbContext(DbContextOptions<NoteAppDbContext> options):base(options)
        { }

        public DbSet<Note> Notes { get; set; }
    }
}