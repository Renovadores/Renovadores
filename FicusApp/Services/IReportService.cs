namespace FicusApp.Services
{
    public interface IReportService
    {
        Task<List<int>> GetAnnualEnvironmentReport(int year);
        Task<List<int>> GetClientAnnualEnvironmentReport(int clientId, int year);
        Task<List<int>> GetAnnualOrderReport(int year);
        Task<List<int>> GetClientAnnualOrderReport(int clientId, int year);
    }
}
