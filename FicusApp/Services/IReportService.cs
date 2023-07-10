namespace FicusApp.Services
{
    public interface IReportService
    {
        Task<List<int>> GetAnnualEnvironmentalReport(int year);
        Task<List<int>> GetClientAnnualEnvironmentalReport(int clientId, int year);
        Task<List<int>> GetAnnualOrderReport(int year);
        Task<List<int>> GetClientAnnualOrderReport(int clientId, int year);
    }
}
