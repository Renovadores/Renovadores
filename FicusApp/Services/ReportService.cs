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
        public async Task<List<int>> GetAnnualEnvironmentalReport(int year)
        {
            var detailsPerYear = _context.Detalle
                .Include(d => d.Producto)
                .Include(d => d.Orden)
                .Where(d => d.Orden.FechaAlquiler.Year == year);

            var detailsPerMonth = detailsPerYear.GroupBy(d => d.Orden.FechaAlquiler.Month);

            List<int> weightSavedInTheYear = new List<int>(new int[12]);

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
                Orden? order = month.First().Orden;
                if (order != null)
                {
                    int index = order.FechaAlquiler.Month - 1;
                    weightSavedInTheYear[index] = weighSavedPerMonth;
                }
            }
            return weightSavedInTheYear;
        }

        public async Task<List<int>> GetClientAnnualEnvironmentalReport(int clientId, int year)
        {
            var detailsPerYear = _context.Detalle
                .Include(d => d.Producto)
                .Include(d => d.Orden)
                .Where(d => d.Orden.ClienteId == clientId
                && d.Orden.FechaAlquiler.Year == year);

            var detailsPerMonth = detailsPerYear.GroupBy(d => d.Orden.FechaAlquiler.Month);

            List<int> weightSavedInTheYear = new List<int>(new int[12]);
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
                Orden? order = month.First().Orden;
                if (order != null)
                {
                    int index = order.FechaAlquiler.Month - 1;
                    weightSavedInTheYear[index] = weighSavedPerMonth;
                }
            }
            return weightSavedInTheYear;
        }

        public async Task<List<int>> GetAnnualOrderReport(int year)
        {
            var ordersPerYear = _context.Orden
                .Where(o => o.FechaAlquiler.Year == year);

            var ordersPerMonth = ordersPerYear.GroupBy(o => o.FechaAlquiler.Month);

            List<int> ordersInTheYear = new List<int>(new int[12]);
            foreach (var month in ordersPerMonth)
            {
                int ordersOfTheMonth = month.Count();
                int index = month.First().FechaAlquiler.Month - 1;
                ordersInTheYear[index] = ordersOfTheMonth;
            }
            return ordersInTheYear;
        }
        public async Task<List<int>> GetClientAnnualOrderReport(int clientId, int year)
        {
            var ordersPerYear = _context.Orden
                .Where(o => o.ClienteId == clientId
                && o.FechaAlquiler.Year == year);

            var ordersPerMonth = ordersPerYear.GroupBy(o => o.FechaAlquiler.Month);

            List<int> ordersInTheYear = new List<int>(new int[12]);
            foreach (var month in ordersPerMonth)
            {
                int ordersOfTheMonth = month.Count();
                int index = month.First().FechaAlquiler.Month - 1;
                ordersInTheYear[index] = ordersOfTheMonth;
            }
            return ordersInTheYear;
        }
    }
}
