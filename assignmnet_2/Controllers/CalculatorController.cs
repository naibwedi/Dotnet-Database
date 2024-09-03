using Microsoft.AspNetCore.Mvc;

namespace assignmnet_2.Controllers;

public class calculatorController : Controller
{
    // GET
    public IActionResult Index()
    {
        return View();
    }
}