namespace Database.Data;

public class ApplicationDbintializer
{
    public static void Intialize(ApplicationDbContext db)
    {
        db.Database.EnsureDeleted();
        db.Database.EnsureCreated();
        
        db.SaveChanges();
    }
}