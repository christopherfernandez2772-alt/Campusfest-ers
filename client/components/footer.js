// Reusable footer component with organizer contact info and quick links.
function renderFooter() {
  const placeholder = document.getElementById('cf-footer-placeholder');
  if (!placeholder) return;

  const year = new Date().getFullYear();

  placeholder.innerHTML = `
    <footer class="cf-footer" role="contentinfo">
      <div class="container">
        <div class="row gy-4">
          <div class="col-md-4">
            <h2 class="h5 text-white">CampusFest</h2>
            <p>El festival estudiantil que celebra la cultura, el deporte, la tecnología y el arte de nuestra comunidad universitaria.</p>
          </div>
          <div class="col-md-4">
            <h2 class="h6 text-white">Enlaces rápidos</h2>
            <ul class="list-unstyled">
              <li><a href="/pages/activities.html">Actividades</a></li>
              <li><a href="/pages/schedule.html">Horario del festival</a></li>
              <li><a href="/pages/stands.html">Stands</a></li>
              <li><a href="/pages/contact.html">Contacto</a></li>
              <li><a href="/pages/admin-login.html"><i class="bi bi-shield-lock me-1" aria-hidden="true"></i>Acceso administrador</a></li>
            </ul>
          </div>
          <div class="col-md-4">
            <h2 class="h6 text-white">Contacto</h2>
            <ul class="list-unstyled">
              <li><i class="bi bi-envelope me-2" aria-hidden="true"></i><a href="mailto:campusfest@universidad.edu.cr">campusfest@universidad.edu.cr</a></li>
              <li><i class="bi bi-telephone me-2" aria-hidden="true"></i><a href="tel:+50685854646">+506 8585 4646 </a></li>
              <li><i class="bi bi-geo-alt me-2" aria-hidden="true"></i>San Jose, Costa Rica </li>
            </ul>
          </div>
        </div>
        <hr class="border-secondary my-4" />
        <p class="text-center mb-0 small">&copy; ${year} CampusFest - Todos los derechos reservados.</p>
      </div>
    </footer>
  `;
}

document.addEventListener('DOMContentLoaded', renderFooter);
