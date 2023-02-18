using EngineerWorld.Repository.Calculators;

namespace EngineerWorld.Repository.Calculator
{
    public class ImperialBmiCalculator : IBmiCalculator
    {
        public double CalculateBmi(double weight, double height)
        {
            if (weight < 0)
                throw new Exception("Invalid weight. Weight must be greater than zero");

            if (height < 0)
                throw new Exception("Invalid height. Height must be greater than zero");

            var bmi = weight / Math.Pow(height, 2) * 703;
            return Math.Round(bmi, 2);
        }
    }
}
