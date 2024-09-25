export const dashboardRoutes = {
  label: 'Settings',
  labelDisable: true,
  children: [
    {
      name: 'Settings',
      active: true,
      icon: 'chart-pie',
      children: [
        {
          name: 'Users',
          to: '/',
          exact: true,
          active: true
        }
      ]
    }
  ]
};

export default [dashboardRoutes];
