/**
 * 産婦人科クリニック 看護師採用LP メインスクリプト
 * さくらレディース＆マタニティクリニック
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initHeaderScroll();
  initScrollReveal();
  initFloatingCta();
  initTabs();
  initAccordion();
  initModals();
  initFormHandling();
});

/* ==========================================================================
   1. モバイルメニュー制御
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileNav) return;

  function toggleMenu() {
    const isOpen = mobileNav.classList.contains('is-open');
    if (isOpen) {
      mobileNav.classList.remove('is-open');
      mobileNav.style.maxHeight = '0';
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.innerHTML = `
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/>
        </svg>
      `;
    } else {
      mobileNav.classList.add('is-open');
      mobileNav.style.maxHeight = '500px';
      menuBtn.setAttribute('aria-expanded', 'true');
      menuBtn.innerHTML = `
        <svg class="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
        </svg>
      `;
    }
  }

  menuBtn.addEventListener('click', toggleMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileNav.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });
}

/* ==========================================================================
   2. ヘッダースクロール効果
   ========================================================================== */
function initHeaderScroll() {
  const navContainer = document.getElementById('navContainer');
  if (!navContainer) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      navContainer.classList.add('bg-white/95', 'shadow-sm');
      navContainer.classList.remove('bg-white/85');
    } else {
      navContainer.classList.remove('bg-white/95', 'shadow-sm');
      navContainer.classList.add('bg-white/85');
    }
  });
}

/* ==========================================================================
   3. スクロールアニメーション（Reveal on scroll）
   ========================================================================== */
function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal-on-scroll');
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        obs.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

/* ==========================================================================
   4. フローティングCTAバー制御
   ========================================================================== */
function initFloatingCta() {
  const floatingCta = document.getElementById('floatingBottomCta');
  const heroSection = document.getElementById('hero');
  const ctaSection = document.getElementById('contactForm');

  if (!floatingCta || !heroSection) return;

  let isHeroVisible = true;
  let isFormVisible = false;

  const heroObserver = new IntersectionObserver(([entry]) => {
    isHeroVisible = entry.isIntersecting;
    updateCtaVisibility();
  }, { threshold: 0.1 });

  heroObserver.observe(heroSection);

  if (ctaSection) {
    const formObserver = new IntersectionObserver(([entry]) => {
      isFormVisible = entry.isIntersecting;
      updateCtaVisibility();
    }, { threshold: 0.2 });
    formObserver.observe(ctaSection);
  }

  function updateCtaVisibility() {
    // ヒーロー通過後、かつ応募フォームセクションに入っていない時に表示
    if (!isHeroVisible && !isFormVisible) {
      floatingCta.classList.add('is-visible');
    } else {
      floatingCta.classList.remove('is-visible');
    }
  }
}

/* ==========================================================================
   5. タブ切り替え（仕事内容 & スケジュール）
   ========================================================================== */
function initTabs() {
  // 仕事内容タブ
  setupTabGroup('work-tab-btn', 'work-tab-content');
  // スケジュールタブ
  setupTabGroup('schedule-tab-btn', 'schedule-tab-content');
}

function setupTabGroup(btnClass, contentClass) {
  const buttons = document.querySelectorAll(`.${btnClass}`);
  const contents = document.querySelectorAll(`.${contentClass}`);

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      buttons.forEach(b => {
        b.classList.remove('active', 'bg-rose-500', 'text-white', 'shadow-md');
        b.classList.add('bg-white', 'text-stone-700', 'border', 'border-stone-200');
      });

      btn.classList.add('active', 'bg-rose-500', 'text-white', 'shadow-md');
      btn.classList.remove('bg-white', 'text-stone-700', 'border', 'border-stone-200');

      contents.forEach(content => {
        if (content.id === targetId) {
          content.classList.add('active');
          content.style.display = 'block';
        } else {
          content.classList.remove('active');
          content.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. アコーディオン（よくある質問）
   ========================================================================== */
function initAccordion() {
  const headers = document.querySelectorAll('.accordion-header');

  headers.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');

      // 他を閉じる場合は以下を有効化（今回は複数開けるようにするか排他にするか：自然な排他に）
      document.querySelectorAll('.accordion-item').forEach(other => {
        if (other !== item) {
          other.classList.remove('active');
        }
      });

      if (isActive) {
        item.classList.remove('active');
      } else {
        item.classList.add('active');
      }
    });
  });
}

/* ==========================================================================
   7. モーダルポップアップ（見学予約クイックモーダル）
   ========================================================================== */
function initModals() {
  const openButtons = document.querySelectorAll('[data-open-modal]');
  const closeButtons = document.querySelectorAll('[data-close-modal]');
  const modalBackdrop = document.getElementById('quickTourModal');

  if (!modalBackdrop) return;

  function openModal() {
    modalBackdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  closeButtons.forEach(btn => {
    btn.addEventListener('click', closeModal);
  });

  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('is-open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. フォーム処理（応募フォーム & クイック見学フォーム）
   ========================================================================== */
function initFormHandling() {
  const mainForm = document.getElementById('recruitApplicationForm');
  const quickForm = document.getElementById('quickTourForm');

  if (mainForm) {
    mainForm.addEventListener('submit', handleFormSubmit);
  }

  if (quickForm) {
    quickForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const modal = document.getElementById('quickTourModal');
      if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }
      showSuccessToast('見学のお申し込みを受け付けました！\n担当者より24時間以内にご連絡いたします。');
      quickForm.reset();
    });
  }
}

function handleFormSubmit(e) {
  e.preventDefault();
  const form = e.target;
  const submitBtn = form.querySelector('button[type="submit"]');

  if (submitBtn) {
    const originalText = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="inline-flex items-center gap-2">
        <svg class="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        送信中...
      </span>
    `;

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
      showSuccessModal();
      form.reset();
    }, 1000);
  }
}

function showSuccessModal() {
  const successModal = document.getElementById('successModal');
  if (successModal) {
    successModal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  } else {
    showSuccessToast('ご応募・見学予約を受け付けました。\n当院の採用担当よりご連絡差し上げます。');
  }
}

function showSuccessToast(message) {
  const toast = document.createElement('div');
  toast.className = 'fixed bottom-24 left-1/2 transform -translate-x-1/2 z-50 bg-stone-900/90 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 text-sm font-medium transition-all duration-300';
  toast.innerHTML = `
    <svg class="w-6 h-6 text-emerald-400 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
    </svg>
    <div class="whitespace-pre-line">${message}</div>
  `;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translate(-50%, 10px)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}
