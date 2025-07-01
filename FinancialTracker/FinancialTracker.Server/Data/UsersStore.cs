using FinancialTracker.Server.Models;
using System.Collections.Concurrent;

namespace FinancialTracker.Server.Data
{
    public static class UsersStore
    {
        public static ConcurrentDictionary<string, User> Users = new();
    }
}
