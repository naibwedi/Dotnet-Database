using Microsoft.AspNetCore.Mvc;

namespace assignment_1.Controllers;

public class AboutController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}