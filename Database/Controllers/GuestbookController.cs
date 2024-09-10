using Microsoft.AspNetCore.Mvc;

namespace Database.Controllers;

public class GuestbookController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}