using EngineerWorld.Repository;
using EngineerWorld.Repository.Calculator.Models;
using Microsoft.AspNetCore.Mvc;

namespace EngineerWorld.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CalculatorBmiController :ControllerBase
    {
        private readonly ICalculatorBmiRepository _calculatorBmiRepository;
        public CalculatorBmiController(ICalculatorBmiRepository calculatorBmiRepository)
        {
            _calculatorBmiRepository = calculatorBmiRepository;
        }

        [HttpGet()]
        public async Task<ActionResult<BmiResult>> GetBmiReult(double weigth, double height, UnitSystem unitSystem)
        {
            var result = await _calculatorBmiRepository.GetBmiResult(weigth, height, unitSystem);

            return Ok(result);
        }
    }
}
