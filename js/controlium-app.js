(() => {
  'use strict';
  const menu = document.querySelector('.menu-btn');
  const nav = document.querySelector('#main-nav');
  function closeMenu() { nav?.classList.remove('open'); menu?.setAttribute('aria-expanded', 'false'); menu?.setAttribute('aria-label', 'Open navigation'); }
  menu?.addEventListener('click', () => {
    const expanded = menu.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('open', expanded);
    menu.setAttribute('aria-expanded', String(expanded));
    menu.setAttribute('aria-label', expanded ? 'Close navigation' : 'Open navigation');
  });
  nav?.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && nav?.classList.contains('open')) { closeMenu(); menu.focus(); } });
  window.matchMedia('(min-width: 851px)').addEventListener('change', closeMenu);
  const search = document.querySelector('#product-search');
  function filterProducts() {
    const active = document.querySelector('[data-filter][aria-pressed="true"]')?.dataset.filter || 'All';
    const query = search?.value.trim().toLocaleLowerCase() || '';
    let shown = 0;
    document.querySelectorAll('.product-card[data-category]').forEach(card => {
      const matches = (active === 'All' || card.dataset.category === active) && (!query || card.dataset.search.includes(query));
      card.hidden = !matches;
      if (matches) shown++;
    });
    const count = document.querySelector('#product-count');
    if (count) count.textContent = shown ? `Showing ${shown} product ${shown === 1 ? 'area' : 'areas'}.` : 'No products match your search. Try a different term.';
  }
  document.querySelectorAll('[data-filter]').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    filterProducts();
  }));
  search?.addEventListener('input', filterProducts);
  function selectHashCategory() {
    const category = window.location.hash.slice(1);
    const button = [...document.querySelectorAll('[data-filter]')].find(item => item.dataset.filter === category);
    if (!button) return;
    document.querySelectorAll('[data-filter]').forEach(other => other.setAttribute('aria-pressed', String(other === button)));
    filterProducts();
  }
  window.addEventListener('hashchange', selectHashCategory);
  selectHashCategory();
  const productData = [{"name":"PIR motion detectors","description":"A range of PIR options for occupancy-led lighting and building control."},{"name":"mmWave presence sensors","description":"Radar-based presence and motion sensing; ask about model-specific sleep, breathing and pulse/heart-rate features."},{"name":"Noise & acoustic sensors","description":"Monitor sound levels for building and environmental applications."},{"name":"CO₂ sensors","description":"Carbon dioxide monitoring for indoor-air and ventilation strategies."},{"name":"CO sensors","description":"Carbon monoxide detection options for relevant spaces and systems."},{"name":"Air quality multi-sensors","description":"Explore PM1, PM2.5, PM4, PM10, TVOC, temperature and humidity sensing."},{"name":"Oxygen sensors","description":"O₂ sensing for applications requiring oxygen-level monitoring."},{"name":"LPG & hydrocarbon sensors","description":"LPG, butane and hydrocarbon detection options."},{"name":"Dust & smoke sensors","description":"Dust and smoke detection options for suitable applications."},{"name":"Ozone sensors","description":"O₃ monitoring options for air and process applications."},{"name":"Sulfur dioxide sensors","description":"SO₂ detection for environmental and industrial applications."},{"name":"Nitrogen dioxide sensors","description":"NO₂ detection for environmental and industrial applications."},{"name":"Formaldehyde sensors","description":"HCHO monitoring options for indoor-air applications."},{"name":"Ammonia sensors","description":"NH₃ detection options for relevant facilities."},{"name":"Hydrogen sulfide sensors","description":"H₂S detection options for relevant facilities."},{"name":"Phosphine sensors","description":"PH₃ detection options for relevant facilities."},{"name":"SF₆ sensors","description":"Sulfur hexafluoride sensing options for specialist applications."},{"name":"Lux sensors","description":"Ambient light measurement for lighting and daylight-responsive control."},{"name":"Wind & rain sensors","description":"Wind speed, wind direction and rainfall monitoring."},{"name":"Solar radiation sensors","description":"Solar irradiance monitoring for outdoor and building applications."},{"name":"UV radiation sensors","description":"Ultraviolet radiation measurement for outdoor monitoring."},{"name":"Visibility sensors","description":"Atmospheric visibility monitoring for specialist sites."},{"name":"Water level sensors","description":"Level monitoring for tanks, water systems and site applications."},{"name":"Water flow sensors","description":"Flow measurement options for water systems."},{"name":"Pressure sensors","description":"Pressure monitoring for building and process applications."},{"name":"Soil multi-sensors","description":"Explore NPK, pH, temperature, humidity and electrical conductivity sensing."},{"name":"Facial recognition","description":"Vision-based identity options for controlled access projects."},{"name":"Pose & gesture recognition","description":"Computer-vision sensing for gesture and pose-driven interaction."},{"name":"Biometric door opening","description":"Automatic door access using suitable biometric or facial-recognition systems."},{"name":"Attendance & hospitality access","description":"Facial-recognition concepts for attendance, room and breakfast access, subject to project requirements."},{"name":"Lighting control","description":"KNX and DALI lighting control, scenes and occupancy-led automation."},{"name":"Building management integration","description":"Discuss BMS connection, automation servers and integration interfaces."}];
  const dialog = document.querySelector('#product-dialog');
  document.querySelectorAll('[data-product]').forEach(button => button.addEventListener('click', () => {
    const product = productData[Number(button.dataset.product)];
    if (!dialog || !product) return;
    document.querySelector('#dialog-title').textContent = product.name;
    document.querySelector('#dialog-description').textContent = product.description;
    document.querySelector('#product-enquiry').href = 'https://wa.me/971527621896?text=' + encodeURIComponent('Hello Controlium, I would like to ask about ' + product.name + '. Please share available models and specifications.');
    dialog.showModal();
  }));
  dialog?.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
  dialog?.addEventListener('click', event => { if (event.target === dialog) { const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); } });
  const form = document.querySelector('#enquiry-form');
  form?.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const fields = [
      `Hello Controlium, I have an enquiry about ${data.get('topic')}.`,
      `Name: ${data.get('firstName')} ${data.get('lastName')}`,
      `Email: ${data.get('email')}`,
      `Phone: ${data.get('phone')}`,
      data.get('company') ? `Company: ${data.get('company')}` : '',
      data.get('designation') ? `Job designation: ${data.get('designation')}` : '',
      data.get('country') ? `Country: ${data.get('country')}` : '',
      '',
      String(data.get('message') || '')
    ].filter((line, index) => line || index === 7);
    const url = 'https://wa.me/971527621896?text=' + encodeURIComponent(fields.join('\n'));
    const status = document.querySelector('#form-status');
    if (status) status.textContent = 'Opening WhatsApp with your message ready for review.';
    window.location.assign(url);
  });
  const controls = [...document.querySelectorAll('[data-device]')];
  if (!controls.length) return;
  const state = {light:false, curtain:false, ac:false, security:false};
  try {
    const stored = JSON.parse(localStorage.getItem('controlium-device-state') || '{}');
    if (stored && typeof stored === 'object') Object.keys(state).forEach(key => { state[key] = stored[key] === true; });
  } catch { /* The demo remains usable when saved state is invalid or unavailable. */ }
  function render() {
    controls.forEach(button => button.setAttribute('aria-checked', String(state[button.dataset.device])));
    try { localStorage.setItem('controlium-device-state', JSON.stringify(state)); } catch { /* Storage is optional. */ }
  }
  const status = document.querySelector('#demo-status');
  controls.forEach(button => button.addEventListener('click', () => {
    const key = button.dataset.device;
    state[key] = !state[key]; render();
    status.textContent = `${button.getAttribute('aria-label')}: ${state[key] ? 'on' : 'off'}.`;
  }));
  const scenes = {
    welcome: {light:true, curtain:true, ac:true, security:false},
    night: {light:false, curtain:false, ac:false, security:true},
    off: {light:false, curtain:false, ac:false, security:false}
  };
  document.querySelectorAll('[data-scene]').forEach(button => button.addEventListener('click', () => {
    Object.assign(state, scenes[button.dataset.scene]); render();
    status.textContent = `${button.textContent} scene activated.`;
  }));
  render();
})();
