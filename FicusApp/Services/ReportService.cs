using FicusApp.Models;
using Microsoft.EntityFrameworkCore;

namespace FicusApp.Services
{
    public class ReportService : IReportService
    {
        private readonly FicusContext _context;

        public ReportService(FicusContext context)
        {
            _context = context;
        }
        public async Task<List<int>> GetAnnualEnvironmentReport(int year)
        {
            var detailsPerYear = _context.Detalle.Include(d => d.Producto)
                .Where(d => d.Orden.FechaAlquiler.Year == year);

            var detailsPerMonth = detailsPerYear.GroupBy(d => d.Orden.FechaAlquiler.Month);

            List<int> weightSavedInTheYear = new();
            foreach (var month in detailsPerMonth)
            {
                int weighSavedPerMonth = 0;
                foreach (var detail in month)
                {
                    int weightSavedPerDetail = 0;
                    if (detail.Usados != null
                        && detail.Producto != null
                        && detail.Producto.PesoDesechable != null)
                    {
                        weightSavedPerDetail = detail.Usados.Value *
                                              detail.Producto.PesoDesechable.Value;
                    }
                    weighSavedPerMonth += weightSavedPerDetail;
                }
                weightSavedInTheYear.Add(weighSavedPerMonth);
            }
            return weightSavedInTheYear;
        }

        public async Task<List<int>> GetClientAnnualEnvironmentReport(int clientId, int year)
        {
            var detailsPerYear = _context.Detalle.Include(d => d.Producto)
                .Where(d => d.Orden.ClienteId == clientId
                && d.Orden.FechaAlquiler.Year == year);

            var detailsPerMonth = detailsPerYear.GroupBy(d => d.Orden.FechaAlquiler.Month);

            List<int> weightSavedInTheYear = new();
            foreach (var month in detailsPerMonth)
            {
                int weighSavedPerMonth = 0;
                foreach (var detail in month)
                {
                    int weightSavedPerDetail = 0;
                    if (detail.Usados != null
                        && detail.Producto != null
                        && detail.Producto.PesoDesechable != null)
                    {
                        weightSavedPerDetail = detail.Usados.Value *
                                              detail.Producto.PesoDesechable.Value;
                    }
                    weighSavedPerMonth += weightSavedPerDetail;
                }
                weightSavedInTheYear.Add(weighSavedPerMonth);
            }
            return weightSavedInTheYear;
        }

        public async Task<List<int>> GetAnnualOrderReport(int year)
        {
            var ordersPerYear = _context.Orden
                .Where(o => o.FechaAlquiler.Year == year);

            var ordersPerMonth = ordersPerYear.GroupBy(o => o.FechaAlquiler.Month);

            List<int> ordersInTheYear = new();
            foreach (var month in ordersPerMonth)
            {
                int ordersOfTheMonth = month.Count();
                ordersInTheYear.Add(ordersOfTheMonth);
            }
            return ordersInTheYear;
        }
        public async Task<List<int>> GetClientAnnualOrderReport(int clientId, int year)
        {
            var ordersPerYear = _context.Orden
                .Where(o => o.ClienteId == clientId
                && o.FechaAlquiler.Year == year);

            var ordersPerMonth = ordersPerYear.GroupBy(o => o.FechaAlquiler.Month);

            List<int> ordersInTheYear = new();
            foreach (var month in ordersPerMonth)
            {
                int ordersOfTheMonth = month.Count();
                ordersInTheYear.Add(ordersOfTheMonth);
            }
            return ordersInTheYear;
        }
    }
}
