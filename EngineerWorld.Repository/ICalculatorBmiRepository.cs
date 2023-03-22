using EngineerWorld.Repository.Calculator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace EngineerWorld.Repository
{
    public interface ICalculatorBmiRepository
    {
        public Task<BmiResult> GetBmiResult(double weight,double height, UnitSystem unitSystem);
    }
}
