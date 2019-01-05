export class App {

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Domain Tool';
    config.map([
      { route: '/',         name: 'customer', moduleId: 'customer',   title: 'Customer' },
      { route: '/tracking', name: 'tracking', moduleId: 'index',      title: 'Tracking' },
      { route: '/dkim',     name: 'dkim',     moduleId: 'dkim',       title: 'DKIM' },
      { route: '/cname',    name: 'cname',    moduleId: 'cname',      title: 'Cname' },
      { route: '/faq',      name: 'faq',      moduleId: 'faq',        title: 'FAQ' },
      { route: '/sql',      name: 'sql',      moduleId: 'sql',        title: 'SQL' },
      { route: '/drt',      name: 'drt',      moduleId: 'drt',        title: 'DRT' },
      { route: '/sslcheck', name: 'sslcheck',moduleId: 'sslcheck',   title: 'SSL Check' },
      { route: '/whois',    name: 'whois',    moduleId: 'whois',      title: 'WhoIs' }
    ]);
  }
}
