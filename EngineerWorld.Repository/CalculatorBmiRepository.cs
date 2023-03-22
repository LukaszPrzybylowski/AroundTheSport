using EngineerWorld.Repository.Calculator;
using EngineerWorld.Repository.Calculator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EngineerWorld.Repository
{
    public class CalculatorBmiRepository : ICalculatorBmiRepository
    {
        private readonly IBmiClassificationDeterminator _bmiClassificationDeterminator;
        public CalculatorBmiRepository(IBmiClassificationDeterminator bmiClassificationDeterminator)
        {
            _bmiClassificationDeterminator = bmiClassificationDeterminator;
        }
        public async Task<BmiResult> GetBmiResult(double weight, double height, UnitSystem unitSystem)
        {
            var facade = new BmiCalculatorFacade(unitSystem, _bmiClassificationDeterminator);

            return await facade.BmiGetReulst(weight, height);
        }
    }
}
