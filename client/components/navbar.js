// Reusable navbar component. Injects the markup into #cf-navbar-placeholder
// and highlights the link matching the current page.
function renderNavbar() {
  const placeholder = document.getElementById('cf-navbar-placeholder');
  if (!placeholder) return;

  const links = [
    { href: '/index.html', label: 'Inicio', match: ['/', '/index.html'] },
    { href: '/pages/activities.html', label: 'Actividades', match: ['/pages/activities.html', '/pages/activity-detail.html'] },
    { href: '/pages/schedule.html', label: 'Horario', match: ['/pages/schedule.html'] },
    { href: '/pages/stands.html', label: 'Stands', match: ['/pages/stands.html'] },
    { href: '/pages/registration.html', label: 'Inscripción', match: ['/pages/registration.html'] },
    { href: '/pages/contact.html', label: 'Contacto', match: ['/pages/contact.html'] },
  ];

  const currentPath = window.location.pathname;

  const navItems = links
    .map((link) => {
      const isActive = link.match.includes(currentPath);
      return `
        <li class="nav-item">
          <a class="nav-link ${isActive ? 'active' : ''}" ${isActive ? 'aria-current="page"' : ''} href="${link.href}">${link.label}</a>
        </li>
      `;
    })
    .join('');

  placeholder.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark cf-navbar sticky-top" aria-label="Navegación principal">
      <div class="container">
        <a class="navbar-brand" href="/index.html">
          <i class="bi bi-stars me-1" aria-hidden="true"></i>CampusFest
        </a>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#cfNavbarContent"
          aria-controls="cfNavbarContent"
          aria-expanded="false"
          aria-label="Abrir menú de navegación"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="cfNavbarContent">
          <ul class="navbar-nav ms-auto mb-2 mb-lg-0 gap-lg-2">
            ${navItems}
          </ul>
        </div>
      </div>
    </nav>
  `;
}

document.addEventListener('DOMContentLoaded', renderNavbar);
