using FicusApp.Models;
using FicusApp.Services;
using Microsoft.EntityFrameworkCore;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata;
using System.Text;
using System.Threading.Tasks;

namespace FicusAppTests
{
    public class ClientTests
    {
        private const int SUCCESS_CODE = 0;
        private const int OUT_OF_RANGE_CODE = 1;
        private const int NOT_FOUND_CODE = -1;

        [Theory]
        [InlineData(-1)]
        [InlineData(-200)]
        [InlineData(3)]
        [InlineData(300)]
        public async void GetClient_WithNotValidId_ExpectedOutOfRangeCode(int id)
        {
            // ARRANGE
            int expected = OUT_OF_RANGE_CODE;
            // generic data
            var data = new List<Cliente>
            {
                new Cliente { ClienteId = 0 },
                new Cliente { ClienteId = 1 },
                new Cliente { ClienteId = 2 },
            }.AsQueryable();
            // generate fake client table and asign generic data
            var mockSet = new Mock<DbSet<Cliente>>();
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            // create a fake context and asign fake table
            var mockDbContext = new Mock<FicusContext>();
            mockDbContext.Setup(c => c.Cliente).Returns(mockSet.Object);
            // Dependency injection for the service (pass the current fake context to service)
            var _clientService = new ClientService(mockDbContext.Object);

            // ACT
            (int code, Cliente? client) = await _clientService.GetCliente(id);


            // ASSERT
            Assert.Equal(expected, code);
            Assert.Null(client);
        }

        [Theory]
        [InlineData(0)]
        [InlineData(1)]
        [InlineData(2)]
        public async void GetClient_WithValidId_ExpectedSuccessCode(int id)
        {
            // ARRANGE
            int expected = SUCCESS_CODE;
            // generic data
            var data = new List<Cliente>
            {
                new Cliente { ClienteId = 0 },
                new Cliente { ClienteId = 1 },
                new Cliente { ClienteId = 2 },
            }.AsQueryable();
            // generate fake client table and asign generic data
            var mockSet = new Mock<DbSet<Cliente>>();
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            // create a fake context and asign fake table
            var mockDbContext = new Mock<FicusContext>();
            mockDbContext.Setup(c => c.Cliente).Returns(mockSet.Object);
            // setup return values for findAsync method
            mockDbContext.Setup(c => c.Cliente.FindAsync(id)).ReturnsAsync(data.FirstOrDefault());
            // Dependency injection for the service (pass the current fake context to service)
            var _clientService = new ClientService(mockDbContext.Object);

            // ACT
            (int code, Cliente? client) = await _clientService.GetCliente(id);

            // ASSERT
            Assert.Equal(expected, code);
            Assert.NotNull(client);
        }

        [Theory]
        [InlineData(-1)]
        [InlineData(0)]
        [InlineData(100)]
        public async void GetClient_WithOutClients_ExpectedNotFoundCode(int id)
        {
            // ARRANGE
            int expected = NOT_FOUND_CODE;
            // generic data
            var data = new List<Cliente>{}.AsQueryable();
            // generate fake client table and asign generic data
            var mockSet = new Mock<DbSet<Cliente>>();
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            // create a fake context and asign fake table
            var mockDbContext = new Mock<FicusContext>();
            mockDbContext.Setup(c => c.Cliente).Returns(mockSet.Object);
            // Dependency injection for the service (pass the current fake context to service)
            var _clientService = new ClientService(mockDbContext.Object);

            // ACT
            (int code, Cliente? client) = await _clientService.GetCliente(id);

            // ASSERT
            Assert.Equal(expected, code);
            Assert.Null(client);
        }

        [Fact]
        public async void GetClients_WithOutClients_ExpectedNotFoundCode()
        {
            // ARRANGE
            int expected = NOT_FOUND_CODE;
            // generic data
            var data = new List<Cliente> { }.AsQueryable();
            // generate fake client table and asign generic data
            var mockSet = new Mock<DbSet<Cliente>>();
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Provider).Returns(data.Provider);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.Expression).Returns(data.Expression);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.ElementType).Returns(data.ElementType);
            mockSet.As<IQueryable<Cliente>>().Setup(m => m.GetEnumerator()).Returns(() => data.GetEnumerator());
            // create a fake context and asign fake table
            var mockDbContext = new Mock<FicusContext>();
            mockDbContext.Setup(c => c.Cliente).Returns(mockSet.Object);
            // Dependency injection for the service (pass the current fake context to service)
            var _clientService = new ClientService(mockDbContext.Object);

            // ACT
            (int code, List<Cliente> clients) = await _clientService.GetClientes();

            // ASSERT
            Assert.Equal(expected, code);
            Assert.Empty(clients);
        }
    }
}