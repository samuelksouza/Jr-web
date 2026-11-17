document.addEventListener('DOMContentLoaded', () => {
  const yearNode = document.querySelector('[data-year]');

  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }

  const menuToggle = document.querySelector('.nav-toggle');
  const mainNav = document.querySelector('.main-nav');

  if (menuToggle instanceof HTMLButtonElement && mainNav instanceof HTMLElement) {
    const setMenuOpen = (isOpen) => {
      mainNav.classList.toggle('is-open', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
    };

    menuToggle.addEventListener('click', () => {
      setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    mainNav.addEventListener('click', (event) => {
      if (event.target instanceof Element && event.target.closest('a')) {
        setMenuOpen(false);
      }
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        setMenuOpen(false);
        menuToggle.focus();
      }
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 720) {
        setMenuOpen(false);
      }
    });
  }

  const contactForm = document.querySelector('.contact-form');

  if (contactForm instanceof HTMLFormElement) {
    contactForm.addEventListener('submit', (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const email = String(formData.get('email') || '').trim();
      const message = [
        'Olá! Gostaria de solicitar um orçamento pela página da JR SOLUÇÕES.',
        `Nome: ${formData.get('nome')}`,
        `Telefone: ${formData.get('telefone')}`,
        ...(email ? [`E-mail: ${email}`] : []),
        `Mensagem: ${formData.get('mensagem')}`,
      ].join('\n');

      window.location.href = `https://wa.me/556185929477?text=${encodeURIComponent(message)}`;
    });
  }
});
