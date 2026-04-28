export interface NavTab {
  name: string;
  icon: string;
  href: string;
}

export const NAV_TABS: NavTab[] = [
  { name: 'Dashboard', icon: '/images/home.png', href: '/dashboard' },
  { name: 'Clients', icon: '/images/users.png', href: '/clients' },
  { name: 'Production', icon: '/images/film.png', href: '/production' },
  { name: 'Leads', icon: '/images/leads.png', href: '/leads' },
  { name: 'Jobs', icon: '/images/briefcase.png', href: '/jobs' },
  { name: 'Calendar', icon: '/images/calendar.png', href: '/calendar' },
  { name: 'Team', icon: '/images/team.png', href: '/team' },
  { name: 'Payments', icon: '/images/creditcard.png', href: '/payments' },
  { name: 'Reports', icon: '/images/chart-histogram.png', href: '/reports' },
  { name: 'Settings', icon: '/images/settings.png', href: '/settings' },
];

export const isTabActive = (pathname: string, tab: NavTab): boolean => {
  const isClientProfile = tab.name === 'Clients' && pathname.toLowerCase().startsWith('/clientprofile');
  const isJobProfile = tab.name === 'Jobs' && pathname.toLowerCase().startsWith('/jobprofile');
  const isTeamProfile = tab.name === 'Team' && pathname.toLowerCase().startsWith('/teamprofile');
  
  return pathname === tab.href || 
         pathname.startsWith(tab.href + '/') || 
         isClientProfile || 
         isJobProfile || 
         isTeamProfile;
};
