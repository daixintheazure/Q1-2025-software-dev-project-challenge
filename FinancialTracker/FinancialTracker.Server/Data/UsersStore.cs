using FinancialTracker.Server.Models;
using System.Collections.Concurrent;

namespace FinancialTracker.Server.Data
{
    public static class UsersStore
    {
        public static readonly ConcurrentDictionary<string, User> _users = new();

        public static bool Exists(string username) => _users.ContainsKey(username);

        public static bool TryGet(string username, out User ueser) =>
            _users.TryGetValue(username, out ueser);

        public static void Save(User user) => _users[user.Username] = user;
    }

}
