using EngineerWorld.Repository.Calculators;

namespace EngineerWorld.Repository.Calculator
{
    public class MetricBmiCalculator : IBmiCalculator
    {
        public double CalculateBmi(double weight, double height)
        {
            if (weight < 0)
            {
                throw new Exception("Invalid weight. Weight must be greater than zero");
            }
            if(height < 0)
            {
                throw new Exception("Invalid height. Height must be greater than zero");
            }

            double bmi = weight / Math.Pow((height / 100.0), 2);
            return Math.Round(bmi,2);
        }
    }
}
