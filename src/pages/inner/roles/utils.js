export function getUsersStats(users) {
  const stats = {
    managers: 0,
    marketingModerators: 0,
    salesRepresentatives: 0,
    noRoles: 0,
    unconfirmed: 0,
  };

  users.forEach((user) => {
    if (!user.emailConfirmed) stats.unconfirmed++;
    const numRoles = user.roles ? user.roles.length : 0;
    switch (numRoles) {
      case 3:
        stats.managers++;
        break;
      case 2:
        stats.marketingModerators++;
        break;
      case 1:
        stats.salesRepresentatives++;
        break;
      default:
        stats.noRoles++;
    }
  });

  return stats;
}

export function getRoleName(numRoles) {
  switch (numRoles) {
    case 3:
      return 'Manager';
    case 2:
      return 'Marketing Moderator';
    case 1:
      return 'Sales Representative';
    default:
      return 'No Role';
  }
}

export const permissions = {
  manager: [
    'View dashboard and analytics',
    'Manage users roles and permissions',
    'Update company information',
    'View all customers',
    'Add, edit, and delete customers',
  ],
  moderator: ['View all customers', 'Add, edit, and delete customers', 'Manage actions on assigned customers'],
  sales: ['View only assigned customers', 'Manage actions on assigned customers'],
  noRoles: ['Users without roles will be deleted after 5 days.'],
};
