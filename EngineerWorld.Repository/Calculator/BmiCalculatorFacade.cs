using EngineerWorld.Repository.Calculator.Models;
using EngineerWorld.Repository.Calculators;

namespace EngineerWorld.Repository.Calculator
{
    public class BmiCalculatorFacade
    {
        private readonly IBmiCalculator _bmiCalculator;
        private readonly IBmiClassificationDeterminator _bmiClassificationDeterminator;

        public BmiCalculatorFacade(UnitSystem unitSystem, IBmiClassificationDeterminator bmiClassificationDeterminator)
        {
            _bmiCalculator = GetBmiCalculator(unitSystem);
            _bmiClassificationDeterminator = bmiClassificationDeterminator;
        }

        private static IBmiCalculator GetBmiCalculator(UnitSystem unitSystem) =>
            unitSystem switch
            {
                UnitSystem.Imperial => new ImperialBmiCalculator(),
                UnitSystem.Metric => new MetricBmiCalculator(),
                _ => throw new NotImplementedException(),
            };

        private static string GetSummary(BmiClassification bmiClassification) =>
            bmiClassification switch
            {
                BmiClassification.SevereThinness => "Severe Thinness! Your life is in danger!",
                BmiClassification.ModerateThinness => "Moderate Thinness! You should practice exercise and keep to the right diet so as to achieve normal weight range",
                BmiClassification.MildThinness => "Mild Thinness! Not so bad, try to achieve normal Bmi",
                BmiClassification.Normal => "Normal Bmi, Good job!",
                BmiClassification.Overweight => "Overweight! Not so bad, try to achieve normal Bmi",
                BmiClassification.ObeseClassI => "Obese Class I! You should practice exercise and keep to the right diet so as to achieve normal weight range",
                BmiClassification.ObeseClassII => "Obese Class II! You have to look after about you life. Start right diet and exercies",
                BmiClassification.ObeseClassIII => "Obese Class III! Your life is in danger!",
                _ => throw new NotImplementedException(),
            };

        public Task<BmiResult> BmiGetReulst(double weight, double height)
        {
            var bmi = _bmiCalculator.CalculateBmi(weight, height);
            var classification = _bmiClassificationDeterminator.DetermineBmiClassification(bmi);

            return Task.FromResult(new BmiResult
            {
                Bmi = bmi,
                Classification = classification,
                Summary = GetSummary(classification)
            });
        }
    }
}
