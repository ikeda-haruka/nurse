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
  initReservationCalendar();
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
      const selectedDateVal = document.getElementById('selectedDateTimeInput')?.value || '';
      if (!selectedDateVal) {
        showSuccessToast('⚠️ カレンダーからご希望の見学日時を選択してください。');
        return;
      }

      const modal = document.getElementById('quickTourModal');
      if (modal) {
        modal.classList.remove('is-open');
        document.body.style.overflow = '';
      }

      showSuccessToast(`🎉 見学会のご予約を承りました！\n予約日時：${selectedDateVal}\n担当者より24時間以内に確認のご連絡をいたします。`);
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

/* ==========================================================================
   9. 見学予約カレンダー制御 (Tour Reservation Calendar)
   ========================================================================== */
function initReservationCalendar() {
  const datesGrid = document.getElementById('calendarDatesGrid');
  const monthLabel = document.getElementById('calendarCurrentMonthLabel');
  const prevBtn = document.getElementById('calendarPrevMonth');
  const nextBtn = document.getElementById('calendarNextMonth');
  const timeSlotContainer = document.getElementById('timeSlotContainer');
  const selectedDateLabel = document.getElementById('selectedDateLabel');
  const selectedDateTimeText = document.getElementById('selectedDateTimeText');
  const selectedDateTimeInput = document.getElementById('selectedDateTimeInput');
  const submitBtn = document.getElementById('quickTourSubmitBtn');
  const timeSlotBtns = document.querySelectorAll('.time-slot-btn');

  if (!datesGrid || !monthLabel) return;

  const dayNames = ['日', '月', '火', '水', '木', '金', '土'];

  // 基準年月: 2026年10月（0-indexed: 9）
  let currentYear = 2026;
  let currentMonth = 9; // 10月
  const minMonth = 9;   // 10月
  const maxMonth = 10;  // 11月

  // 初期選択日: 2026年10月15日(木) 14:00〜14:30
  let selectedYear = 2026;
  let selectedMonth = 9;
  let selectedDate = 15;
  let selectedDayName = '木';
  let selectedTime = '14:00〜14:30';

  // 空き状況ステータス判定（リアルな産婦人科クリニックの見学枠設定）
  function getSlotStatus(year, month, date, dayOfWeek) {
    // 過去日（2026年10月13日以前）
    if (year === 2026 && month === 9 && date < 13) {
      return { status: 'none', label: '-' };
    }
    // 日曜日は休診
    if (dayOfWeek === 0) {
      return { status: 'none', label: '休' };
    }
    // 祝日（11/3文化の日、11/23勤労感謝の日）
    if (month === 10 && (date === 3 || date === 23)) {
      return { status: 'none', label: '休' };
    }
    // 土曜日は午前・昼枠のみ（○または△）
    if (dayOfWeek === 6) {
      return (date % 2 === 0) ? { status: 'few', label: '△' } : { status: 'open', label: '○' };
    }
    // 平日：基本は○（空きあり）、一部人気日程は△（残りわずか）
    if (date % 4 === 0) {
      return { status: 'few', label: '△' };
    }
    return { status: 'open', label: '○' };
  }

  function updateDisplay() {
    if (selectedDate) {
      const monthDisplay = selectedMonth + 1;
      const fullString = `${monthDisplay}月${selectedDate}日(${selectedDayName}) ${selectedTime}`;
      if (selectedDateLabel) selectedDateLabel.textContent = `${monthDisplay}月${selectedDate}日(${selectedDayName})`;
      if (selectedDateTimeText) selectedDateTimeText.textContent = fullString;
      if (selectedDateTimeInput) selectedDateTimeInput.value = `${selectedYear}年${fullString}`;
      if (submitBtn) {
        submitBtn.innerHTML = `
          <span>この日程（${monthDisplay}月${selectedDate}日 ${selectedTime}）で予約する</span>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/></svg>
        `;
      }
      if (timeSlotContainer) timeSlotContainer.classList.remove('hidden');
    }

    // 時間帯ボタンのアクティブ状態
    timeSlotBtns.forEach(btn => {
      if (btn.getAttribute('data-time') === selectedTime) {
        btn.classList.add('is-selected');
      } else {
        btn.classList.remove('is-selected');
      }
    });
  }

  function renderCalendar() {
    datesGrid.innerHTML = '';
    const displayMonthNum = currentMonth + 1;
    monthLabel.textContent = `${currentYear}年 ${displayMonthNum}月`;

    // 前月・次月ボタン制御
    if (prevBtn) prevBtn.disabled = (currentMonth <= minMonth);
    if (nextBtn) nextBtn.disabled = (currentMonth >= maxMonth);

    // その月の初日の曜日と日数
    const firstDayIndex = new Date(currentYear, currentMonth, 1).getDay();
    const totalDays = new Date(currentYear, currentMonth + 1, 0).getDate();

    // 先頭の空セル
    for (let i = 0; i < firstDayIndex; i++) {
      const blank = document.createElement('div');
      blank.className = 'calendar-cell is-disabled';
      datesGrid.appendChild(blank);
    }

    // 各日のセル
    for (let d = 1; d <= totalDays; d++) {
      const dayOfWeek = (firstDayIndex + d - 1) % 7;
      const dayName = dayNames[dayOfWeek];
      const slot = getSlotStatus(currentYear, currentMonth, d, dayOfWeek);

      const cell = document.createElement('div');
      cell.className = 'calendar-cell';

      const isSelectable = (slot.status === 'open' || slot.status === 'few');
      const isCurrentSelected = (selectedYear === currentYear && selectedMonth === currentMonth && selectedDate === d);

      if (isSelectable) {
        cell.classList.add('has-slot');
        if (isCurrentSelected) {
          cell.classList.add('is-selected');
        }
      } else {
        cell.classList.add('is-disabled');
      }

      // 曜日別カラー
      let dateColorClass = 'text-warm-900';
      if (dayOfWeek === 0) dateColorClass = 'text-rose-500 font-bold';
      else if (dayOfWeek === 6) dateColorClass = 'text-sky-600 font-bold';

      cell.innerHTML = `
        <span class="text-xs font-semibold ${dateColorClass}">${d}</span>
        <span class="calendar-slot-badge ${slot.status === 'open' ? 'slot-open' : slot.status === 'few' ? 'slot-few' : 'slot-none'}">${slot.label}</span>
      `;

      if (isSelectable) {
        cell.addEventListener('click', () => {
          selectedYear = currentYear;
          selectedMonth = currentMonth;
          selectedDate = d;
          selectedDayName = dayName;
          updateDisplay();
          renderCalendar();
        });
      }

      datesGrid.appendChild(cell);
    }
  }

  // 時間帯ボタンクリックイベント
  timeSlotBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      selectedTime = btn.getAttribute('data-time') || '14:00〜14:30';
      updateDisplay();
    });
  });

  // 前月 / 次月切り替え
  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      if (currentMonth > minMonth) {
        currentMonth--;
        renderCalendar();
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      if (currentMonth < maxMonth) {
        currentMonth++;
        renderCalendar();
      }
    });
  }

  // 初回レンダリング＆表示更新
  renderCalendar();
  updateDisplay();
}
