using EngineerWorld.Repository.Calculator.Models;

namespace EngineerWorld.Repository.Calculator
{
    public interface IBmiClassificationDeterminator
    {
        public BmiClassification DetermineBmiClassification(double bmi);
    }
}
