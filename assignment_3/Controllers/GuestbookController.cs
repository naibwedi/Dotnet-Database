using System.Diagnostics.CodeAnalysis;
using assignment_3.Data;
using assignment_3.Models;
using Microsoft.AspNetCore.Mvc;

namespace assignment_3.Controllers;

public class GuestbookController : Controller
{
    private readonly ApplicationDbContext _db;

    public GuestbookController(ApplicationDbContext db)
    {
        _db = db;
    }
    // GET
   
    public IActionResult Index()
    {
        var guests = _db.Guests.ToList();
        return View(guests);
    }
    
    // Post 
    
    [HttpPost]
    [HttpGet]
    public IActionResult Add(Guest guest)
    {
        if (!ModelState.IsValid)
        {
            return View(); 
        }
        
        _db.Guests.Add(guest);
        _db.SaveChanges();
        return RedirectToAction(nameof(Index)); 
    }
}