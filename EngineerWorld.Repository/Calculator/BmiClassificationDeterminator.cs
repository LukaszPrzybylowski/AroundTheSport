using EngineerWorld.Repository.Calculator.Models;

namespace EngineerWorld.Repository.Calculator
{
    public class BmiClassificationDeterminator : IBmiClassificationDeterminator
    {
        public BmiClassification DetermineBmiClassification(double bmi) => bmi switch
        {
            < 16 => BmiClassification.SevereThinness,
            < 17 => BmiClassification.ModerateThinness,
            < 18.5 => BmiClassification.MildThinness,
            < 25 => BmiClassification.Normal,
            < 30 => BmiClassification.Overweight,
            < 35 => BmiClassification.ObeseClassI,
            < 40 => BmiClassification.ObeseClassII,
            > 40 => BmiClassification.ObeseClassIII,
            _ => throw new NotImplementedException(),
        };
    }
}
