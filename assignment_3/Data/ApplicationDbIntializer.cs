using Microsoft.EntityFrameworkCore;

namespace assignment_3.Data;

public class ApplicationDbIntializer
{
    public static void InitializeDb(ApplicationDbContext db)
    {
        db.Database.EnsureDeleted();
        db.Database.EnsureCreated();

        db.SaveChanges();
    }
}