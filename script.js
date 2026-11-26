(function () {
  'use strict';

  const STORAGE_KEY = 'rokame_mvp_state_v1';

  // Helper to generate lightweight inline SVG marble textures (no external image failures, no gradients)
  function makeMarbleSvg(bgHex, veinHex, accentHex, label) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="360" viewBox="0 0 600 360">
      <rect width="600" height="360" fill="${bgHex}"/>
      <path d="M0 90 Q150 40 300 110 T600 80" stroke="${veinHex}" stroke-width="4" fill="none" opacity="0.65"/>
      <path d="M0 210 Q180 260 360 190 T600 230" stroke="${veinHex}" stroke-width="3" fill="none" opacity="0.55"/>
      <path d="M80 0 Q140 160 90 360" stroke="${accentHex}" stroke-width="2.5" fill="none" opacity="0.45"/>
      <path d="M410 0 Q360 190 450 360" stroke="${accentHex}" stroke-width="2" fill="none" opacity="0.45"/>
      <rect x="18" y="294" width="190" height="42" rx="6" fill="#222222" opacity="0.78"/>
      <text x="113" y="321" font-family="Tahoma, Arial, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${label}</text>
    </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  // Helper to generate lightweight inline SVG receipt for seed data
  function makeReceiptSvg(title, amountText, methodText) {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="420" height="280" viewBox="0 0 420 280">
      <rect width="420" height="280" fill="#FFFFFF" stroke="#E0E0E0" stroke-width="2"/>
      <rect x="0" y="0" width="420" height="52" fill="#222222"/>
      <text x="210" y="33" font-family="Tahoma, Arial, sans-serif" font-size="18" font-weight="bold" fill="#FFFFFF" text-anchor="middle">${title}</text>
      <text x="210" y="105" font-family="Tahoma, Arial, sans-serif" font-size="16" fill="#555555" text-anchor="middle">${methodText}</text>
      <text x="210" y="150" font-family="Tahoma, Arial, sans-serif" font-size="24" font-weight="bold" fill="#1B5E20" text-anchor="middle">${amountText}</text>
      <line x1="40" y1="185" x2="380" y2="185" stroke="#E0E0E0" stroke-width="1"/>
      <text x="210" y="220" font-family="Tahoma, Arial, sans-serif" font-size="13" fill="#666666" text-anchor="middle">إيصال تحويل تجريبي — منصة رخام مصر</text>
    </svg>`;
    return 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(svg);
  }

  function createSeedState() {
    return {
      commissionRate: 5,
      adminPayment: {
        vodafoneCash: '01009988776',
        instapay: 'rokame.platform@instapay'
      },
      activeRole: 'buyer',
      activeBuyerId: 'u1',
      activeSellerId: 's1',
      sellers: [
        {
          id: 's1',
          name: 'مصنع شق التعبان للرخام',
          phone: '01011223344',
          address: 'المنطقة الصناعية، شق التعبان، القاهرة',
          username: 'shoaib_marble',
          password: '123',
          vodafoneCash: '01011223344',
          instapay: 'shoaib.marble@instapay'
        },
        {
          id: 's2',
          name: 'معرض النيل للرخام',
          phone: '01122334455',
          address: 'طريق الأوتوستراد، المعادي، القاهرة',
          username: 'nile_marble',
          password: '123',
          vodafoneCash: '01022334455',
          instapay: 'nile.marble@instapay'
        },
        {
          id: 's3',
          name: 'الدلتا ستون',
          phone: '01233445566',
          address: 'المنطقة الصناعية، برج العرب، الإسكندرية',
          username: 'delta_stone',
          password: '123',
          vodafoneCash: '01033445566',
          instapay: 'delta.stone@instapay'
        }
      ],
      users: [
        {
          id: 'u1',
          name: 'أحمد محمود',
          phone: '01001122334',
          address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
          status: 'active'
        },
        {
          id: 'u2',
          name: 'سارة عبد الرحمن',
          phone: '01112233445',
          address: 'الحي الخامس، التجمع الخامس، القاهرة الجديدة',
          status: 'active'
        },
        {
          id: 'u3',
          name: 'محمد علي حسن',
          phone: '01223344556',
          address: 'الحي الثامن، الشيخ زايد، الجيزة',
          status: 'active'
        }
      ],
      products: [
        {
          id: 'p1',
          sellerId: 's1',
          type: 'جلالة فص',
          color: 'بيج فاتح',
          thickness: '2 سم',
          pricePerMeter: 850,
          details: 'فرز أول، معالجة بالراتنج ولمعة ممتازة للأرضيات والسلالم.',
          externalLink: 'https://www.facebook.com',
          image: makeMarbleSvg('#EDE2D1', '#CBB89D', '#A8947A', 'جلالة فص'),
          views: 42,
          reviews: [
            { id: 'r1', buyerName: 'أحمد محمود', rating: 5, comment: 'خامة ممتازة وتقطيع مظبوط جداً.', date: '2026-11-18' },
            { id: 'r2', buyerName: 'سارة عبد الرحمن', rating: 4, comment: 'اللون متناسق والتسليم كان سريع.', date: '2026-11-20' }
          ]
        },
        {
          id: 'p2',
          sellerId: 's1',
          type: 'صني منيا',
          color: 'أصفر كريمي',
          thickness: '2 سم',
          pricePerMeter: 720,
          details: 'صني منيا مصري أصلي مناسب للواجهات والأرضيات الداخلية.',
          externalLink: 'https://www.instagram.com',
          image: makeMarbleSvg('#F3E3BD', '#D4BA82', '#B5965B', 'صني منيا'),
          views: 31,
          reviews: [
            { id: 'r3', buyerName: 'محمد علي حسن', rating: 5, comment: 'سعر ممتاز مقارنة بالجودة.', date: '2026-11-19' }
          ]
        },
        {
          id: 'p3',
          sellerId: 's2',
          type: 'تريستا',
          color: 'رمادي عسلي',
          thickness: '3 سم',
          pricePerMeter: 950,
          details: 'تخانة 3 سم عالية التحمل للدرج والمداخل الفاخرة.',
          externalLink: 'https://www.facebook.com',
          image: makeMarbleSvg('#CFCAC2', '#9D968C', '#787168', 'تريستا'),
          views: 27,
          reviews: []
        },
        {
          id: 'p4',
          sellerId: 's2',
          type: 'كرارا إيطالي',
          color: 'أبيض معرق',
          thickness: '2 سم',
          pricePerMeter: 2400,
          details: 'رخام كرارا مستورد بعروق رمادية هادئة للمطابخ والحمامات.',
          externalLink: 'https://www.instagram.com',
          image: makeMarbleSvg('#F4F4F2', '#B8BCC0', '#8A9096', 'كرارا إيطالي'),
          views: 64,
          reviews: [
            { id: 'r4', buyerName: 'سارة عبد الرحمن', rating: 5, comment: 'أبيض صافي وعروق طبيعية راقية جداً.', date: '2026-11-21' }
          ]
        },
        {
          id: 'p5',
          sellerId: 's3',
          type: 'إمبرادور',
          color: 'بني داكن',
          thickness: '2 سم',
          pricePerMeter: 1950,
          details: 'إمبرادور غامق فاخر بلمعة عالية للمداخل وقرص المطابخ.',
          externalLink: 'https://www.facebook.com',
          image: makeMarbleSvg('#6D5244', '#A88C7A', '#C9B3A3', 'إمبرادور'),
          views: 38,
          reviews: [
            { id: 'r5', buyerName: 'أحمد محمود', rating: 4, comment: 'خامة قوية وشكل فخم.', date: '2026-11-22' }
          ]
        },
        {
          id: 'p6',
          sellerId: 's3',
          type: 'جرانيت جندولا',
          color: 'رمادي منقط',
          thickness: '3 سم',
          pricePerMeter: 1150,
          details: 'جرانيت مصري شديد الصلابة مقاوم للخدش والحرارة.',
          externalLink: 'https://www.youtube.com',
          image: makeMarbleSvg('#8C9094', '#4A4D50', '#D0D4D8', 'جرانيت جندولا'),
          views: 19,
          reviews: []
        }
      ],
      orders: [
        {
          id: 'ORD-1001',
          buyerId: 'u1',
          sellerId: 's1',
          productId: 'p1',
          type: 'جلالة فص',
          color: 'بيج فاتح',
          thickness: '2 سم',
          meters: 30,
          pricePerMeter: 850,
          netPrice: 25500,
          commissionRate: 5,
          commissionAmount: 1275,
          deliveryMethod: 'delivery',
          deliveryAddress: 'شارع عباس العقاد، مدينة نصر، القاهرة',
          deliveryPhone: '01001122334',
          paymentMethod: 'vodafone',
          paymentStatus: 'awaiting_seller',
          buyerReceipt: makeReceiptSvg('إيصال تحويل مشتري', '25,500 ج.م', 'فودافون كاش - ORD-1001'),
          commissionPaymentMethod: '',
          commissionReceipt: '',
          status: 'pending',
          commissionStatus: 'uncollected',
          createdAt: '2026-11-25'
        },
        {
          id: 'ORD-1002',
          buyerId: 'u2',
          sellerId: 's1',
          productId: 'p2',
          type: 'صني منيا',
          color: 'أصفر كريمي',
          thickness: '2 سم',
          meters: 25,
          pricePerMeter: 720,
          netPrice: 18000,
          commissionRate: 5,
          commissionAmount: 900,
          deliveryMethod: 'pickup',
          deliveryAddress: '',
          deliveryPhone: '01112233445',
          paymentMethod: 'agreement',
          paymentStatus: 'agreement',
          buyerReceipt: '',
          commissionPaymentMethod: '',
          commissionReceipt: '',
          status: 'accepted',
          commissionStatus: 'uncollected',
          createdAt: '2026-11-24'
        },
        {
          id: 'ORD-1003',
          buyerId: 'u1',
          sellerId: 's2',
          productId: 'p4',
          type: 'كرارا إيطالي',
          color: 'أبيض معرق',
          thickness: '2 سم',
          meters: 10,
          pricePerMeter: 2400,
          netPrice: 24000,
          commissionRate: 5,
          commissionAmount: 1200,
          deliveryMethod: 'delivery',
          deliveryAddress: 'مدينة نصر، عمارة 14، الدور الثالث',
          deliveryPhone: '01001122334',
          paymentMethod: 'instapay',
          paymentStatus: 'confirmed',
          buyerReceipt: makeReceiptSvg('إيصال تحويل مشتري', '24,000 ج.م', 'إنستا باي - ORD-1003'),
          commissionPaymentMethod: 'instapay',
          commissionReceipt: makeReceiptSvg('إيصال عمولة بائع', '1,200 ج.م', 'إنستا باي - ORD-1003'),
          status: 'accepted',
          commissionStatus: 'awaiting_admin',
          createdAt: '2026-11-23'
        },
        {
          id: 'ORD-1004',
          buyerId: 'u3',
          sellerId: 's3',
          productId: 'p5',
          type: 'إمبرادور',
          color: 'بني داكن',
          thickness: '2 سم',
          meters: 15,
          pricePerMeter: 1950,
          netPrice: 29250,
          commissionRate: 5,
          commissionAmount: 1462.5,
          deliveryMethod: 'pickup',
          deliveryAddress: '',
          deliveryPhone: '01223344556',
          paymentMethod: 'agreement',
          paymentStatus: 'agreement',
          buyerReceipt: '',
          commissionPaymentMethod: 'vodafone',
          commissionReceipt: makeReceiptSvg('إيصال عمولة بائع', '1,462.5 ج.م', 'فودافون كاش - ORD-1004'),
          status: 'accepted',
          commissionStatus: 'collected',
          createdAt: '2026-11-20'
        },
        {
          id: 'ORD-1005',
          buyerId: 'u3',
          sellerId: 's2',
          productId: 'p3',
          type: 'تريستا',
          color: 'رمادي عسلي',
          thickness: '3 سم',
          meters: 20,
          pricePerMeter: 950,
          netPrice: 19000,
          commissionRate: 5,
          commissionAmount: 950,
          deliveryMethod: 'delivery',
          deliveryAddress: 'الشيخ زايد، الحي الثامن',
          deliveryPhone: '01223344556',
          paymentMethod: 'agreement',
          paymentStatus: 'agreement',
          buyerReceipt: '',
          commissionPaymentMethod: '',
          commissionReceipt: '',
          status: 'rejected',
          commissionStatus: 'uncollected',
          createdAt: '2026-11-22'
        }
      ]
    };
  }

  let state = loadState();
  let uploadedBase64 = '';
  let buyerReceiptBase64 = '';
  let settleReceiptBase64 = '';
  let activeDetailProductId = null;

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && Array.isArray(parsed.sellers) && Array.isArray(parsed.products)) {
          if (!parsed.adminPayment) {
            parsed.adminPayment = { vodafoneCash: '01009988776', instapay: 'rokame.platform@instapay' };
          }
          parsed.sellers.forEach((s) => {
            if (!s.vodafoneCash) s.vodafoneCash = s.phone || '';
            if (!s.instapay) s.instapay = (s.username || 'seller') + '@instapay';
          });
          return parsed;
        }
      }
    } catch (e) {
      // Fall back to seed data
    }
    const seed = createSeedState();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(seed));
    return seed;
  }

  function saveState() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  // ==================== UTILITIES ====================
  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function formatMoney(num) {
    return Number(num || 0).toLocaleString('ar-EG', { maximumFractionDigits: 2 }) + ' ج.م';
  }

  function formatWaPhone(phone) {
    const digits = String(phone || '').replace(/\D/g, '');
    if (digits.startsWith('01') && digits.length === 11) {
      return '2' + digits;
    }
    if (digits.startsWith('00')) {
      return digits.slice(2);
    }
    return digits;
  }

  function toWhatsAppUrl(phone, message) {
    const wa = formatWaPhone(phone);
    const base = `https://wa.me/${wa}`;
    return message ? `${base}?text=${encodeURIComponent(message)}` : base;
  }

  function getSellerById(id) {
    return state.sellers.find((s) => s.id === id) || null;
  }

  function getUserById(id) {
    return state.users.find((u) => u.id === id) || null;
  }

  function getProductById(id) {
    return state.products.find((p) => p.id === id) || null;
  }

  function getAvgRating(product) {
    if (!product.reviews || product.reviews.length === 0) return { avg: 0, count: 0 };
    const sum = product.reviews.reduce((acc, r) => acc + Number(r.rating || 0), 0);
    return {
      avg: (sum / product.reviews.length).toFixed(1),
      count: product.reviews.length
    };
  }

  function renderStars(rating) {
    const full = Math.round(Number(rating) || 0);
    return '★'.repeat(full) + '☆'.repeat(Math.max(0, 5 - full));
  }

  function orderStatusBadge(status) {
    if (status === 'accepted') return '<span class="badge badge-success">مقبولة</span>';
    if (status === 'rejected') return '<span class="badge badge-danger">مرفوضة</span>';
    return '<span class="badge badge-warning">في انتظار الرد</span>';
  }

  function commissionStatusBadge(cStatus) {
    if (cStatus === 'collected') return '<span class="badge badge-success">تم التحصيل</span>';
    if (cStatus === 'awaiting_admin') return '<span class="badge badge-warning">بانتظار تأكيد الأدمن</span>';
    if (cStatus === 'rejected_receipt') return '<span class="badge badge-danger">إيصال مرفوض</span>';
    return '<span class="badge badge-danger">غير محصلة</span>';
  }

  function paymentMethodLabel(method) {
    if (method === 'vodafone') return 'فودافون كاش';
    if (method === 'instapay') return 'إنستا باي';
    return 'الدفع عند الاستلام / بالاتفاق';
  }

  function paymentStatusBadge(pStatus) {
    if (pStatus === 'confirmed') return '<span class="badge badge-success">تم تأكيد الدفع</span>';
    if (pStatus === 'awaiting_seller') return '<span class="badge badge-warning">بانتظار تأكيد البائع</span>';
    if (pStatus === 'rejected_receipt') return '<span class="badge badge-danger">إيصال مرفوض</span>';
    return '<span class="badge badge-neutral">دفع بالاتفاق</span>';
  }

  function compressImageToBase64(file, maxWidth, quality) {
    const targetWidth = maxWidth || 800;
    const targetQuality = quality || 0.72;
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onerror = () => reject(new Error('فشل قراءة الصورة'));
      reader.onload = (ev) => {
        const img = new Image();
        img.onerror = () => resolve(ev.target.result);
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let w = img.width;
          let h = img.height;
          if (w > targetWidth) {
            h = Math.round((h * targetWidth) / w);
            w = targetWidth;
          }
          canvas.width = w;
          canvas.height = h;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, w, h);
          resolve(canvas.toDataURL('image/jpeg', targetQuality));
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });
  }

  function openReceiptPreview(src, title, meta) {
    document.getElementById('receiptPreviewTitle').textContent = title || 'معاينة صورة الإيصال';
    document.getElementById('receiptPreviewMeta').textContent = meta || '';
    document.getElementById('receiptPreviewImg').src = src;
    openModal('receiptPreviewModal');
  }

  function showToast(message, type) {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = 'toast' + (type ? ` toast-${type}` : '');
    toast.textContent = message;
    container.appendChild(toast);
    setTimeout(() => {
      toast.remove();
    }, 3200);
  }

  function openModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.remove('hidden');
  }

  function closeModal(id) {
    const el = document.getElementById(id);
    if (el) el.classList.add('hidden');
  }

  // ==================== ROLE & TAB SWITCHING ====================
  function switchRole(role) {
    state.activeRole = role;
    saveState();

    document.querySelectorAll('.role-btn').forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.role === role);
    });
    document.querySelectorAll('.role-view').forEach((view) => {
      view.classList.remove('active');
    });

    if (role === 'buyer') document.getElementById('viewBuyer').classList.add('active');
    if (role === 'seller') document.getElementById('viewSeller').classList.add('active');
    if (role === 'admin') document.getElementById('viewAdmin').classList.add('active');

    renderAll();
  }

  function setupTabs(attrName, panelPrefix) {
    document.querySelectorAll(`[${attrName}]`).forEach((btn) => {
      btn.addEventListener('click', () => {
        const target = btn.getAttribute(attrName);
        const parent = btn.closest('.role-view');
        parent.querySelectorAll(`[${attrName}]`).forEach((b) => b.classList.remove('active'));
        parent.querySelectorAll('.tab-panel').forEach((p) => p.classList.remove('active'));
        btn.classList.add('active');
        const panelId = panelPrefix + target.charAt(0).toUpperCase() + target.slice(1);
        const panel = document.getElementById(panelId);
        if (panel) panel.classList.add('active');
      });
    });
  }

  // ==================== RENDER COUNTERS & ACCOUNT SELECTORS ====================
  function renderCounters() {
    const buyerPending = state.orders.filter(
      (o) => o.buyerId === state.activeBuyerId && o.status === 'pending'
    ).length;
    const sellerPending = state.orders.filter(
      (o) => o.sellerId === state.activeSellerId && o.status === 'pending'
    ).length;
    const adminAwaiting = state.orders.filter(
      (o) => o.status === 'accepted' && o.commissionStatus === 'awaiting_admin'
    ).length;

    updateCounter('counterBuyer', buyerPending);
    updateCounter('counterSeller', sellerPending);
    updateCounter('counterAdmin', adminAwaiting);

    document.getElementById('buyerOrdersTabCount').textContent = state.orders.filter(
      (o) => o.buyerId === state.activeBuyerId
    ).length;
    document.getElementById('sellerOrdersTabCount').textContent = sellerPending;
    document.getElementById('adminConfirmTabCount').textContent = adminAwaiting;
  }

  function updateCounter(id, count) {
    const el = document.getElementById(id);
    el.textContent = count;
    el.classList.toggle('hidden', count <= 0);
  }

  function renderAccountSelectors() {
    const sellerSelect = document.getElementById('sellerAccountSelect');
    sellerSelect.innerHTML = state.sellers
      .map((s) => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.name)}</option>`)
      .join('');
    if (!getSellerById(state.activeSellerId) && state.sellers.length > 0) {
      state.activeSellerId = state.sellers[0].id;
    }
    sellerSelect.value = state.activeSellerId;

    const buyerSelect = document.getElementById('buyerAccountSelect');
    buyerSelect.innerHTML = state.users
      .map((u) => `<option value="${escapeHtml(u.id)}">${escapeHtml(u.name)}</option>`)
      .join('');
    if (!getUserById(state.activeBuyerId) && state.users.length > 0) {
      state.activeBuyerId = state.users[0].id;
    }
    buyerSelect.value = state.activeBuyerId;
  }

  // ==================== BUYER VIEW ====================
  function renderBuyerView() {
    const activeBuyer = getUserById(state.activeBuyerId);
    const statusBadge = document.getElementById('buyerStatusBadge');
    const blockedBanner = document.getElementById('buyerBlockedBanner');

    if (activeBuyer) {
      const isBlocked = activeBuyer.status === 'blocked';
      statusBadge.className = isBlocked ? 'badge badge-danger' : 'badge badge-success';
      statusBadge.textContent = isBlocked ? 'محظور' : 'نشط';
      blockedBanner.classList.toggle('hidden', !isBlocked);
    }

    populateBuyerFilters();
    renderBuyerProducts();
    renderBuyerOrders();
  }

  function populateBuyerFilters() {
    const typeSel = document.getElementById('filterType');
    const colorSel = document.getElementById('filterColor');
    const thickSel = document.getElementById('filterThickness');
    const sellerSel = document.getElementById('filterSeller');

    const prevType = typeSel.value;
    const prevColor = colorSel.value;
    const prevThick = thickSel.value;
    const prevSeller = sellerSel.value;

    const types = [...new Set(state.products.map((p) => p.type))];
    const colors = [...new Set(state.products.map((p) => p.color))];
    const thicknesses = [...new Set(state.products.map((p) => p.thickness))];

    typeSel.innerHTML = '<option value="">كل الأنواع</option>' +
      types.map((t) => `<option value="${escapeHtml(t)}">${escapeHtml(t)}</option>`).join('');
    colorSel.innerHTML = '<option value="">كل الألوان</option>' +
      colors.map((c) => `<option value="${escapeHtml(c)}">${escapeHtml(c)}</option>`).join('');
    thickSel.innerHTML = '<option value="">كل التخانات</option>' +
      thicknesses.map((th) => `<option value="${escapeHtml(th)}">${escapeHtml(th)}</option>`).join('');
    sellerSel.innerHTML = '<option value="">كل البائعين</option>' +
      state.sellers.map((s) => `<option value="${escapeHtml(s.id)}">${escapeHtml(s.name)}</option>`).join('');

    typeSel.value = types.includes(prevType) ? prevType : '';
    colorSel.value = colors.includes(prevColor) ? prevColor : '';
    thickSel.value = thicknesses.includes(prevThick) ? prevThick : '';
    sellerSel.value = getSellerById(prevSeller) ? prevSeller : '';
  }

  function renderBuyerProducts() {
    const search = document.getElementById('filterSearch').value.trim().toLowerCase();
    const type = document.getElementById('filterType').value;
    const color = document.getElementById('filterColor').value;
    const thickness = document.getElementById('filterThickness').value;
    const sellerId = document.getElementById('filterSeller').value;

    const filtered = state.products.filter((p) => {
      const seller = getSellerById(p.sellerId);
      const text = `${p.type} ${p.color} ${p.thickness} ${p.details} ${seller ? seller.name : ''}`.toLowerCase();
      if (search && !text.includes(search)) return false;
      if (type && p.type !== type) return false;
      if (color && p.color !== color) return false;
      if (thickness && p.thickness !== thickness) return false;
      if (sellerId && p.sellerId !== sellerId) return false;
      return true;
    });

    const grid = document.getElementById('buyerProductGrid');
    if (filtered.length === 0) {
      grid.innerHTML = '<div class="empty-state">لا توجد منتجات مطابقة للفلاتر المحددة.</div>';
      return;
    }

    grid.innerHTML = filtered.map((p) => {
      const seller = getSellerById(p.sellerId);
      const { avg, count } = getAvgRating(p);
      return `
        <article class="product-card">
          <img class="product-thumb" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.type)}" />
          <div class="product-body">
            <span class="product-seller">${escapeHtml(seller ? seller.name : 'بائع غير معروف')}</span>
            <h3 class="product-title">${escapeHtml(p.type)}</h3>
            <div class="product-specs">
              <span class="spec-pill">اللون: ${escapeHtml(p.color)}</span>
              <span class="spec-pill">التخانة: ${escapeHtml(p.thickness)}</span>
            </div>
            <p class="muted">${escapeHtml(p.details || '')}</p>
            <div class="product-meta-row">
              <span class="product-price">${formatMoney(p.pricePerMeter)} <small class="muted">/ م²</small></span>
              <span class="product-rating">${count > 0 ? `${renderStars(avg)} (${avg})` : 'بدون تقييم'}</span>
            </div>
            <button type="button" class="btn btn-primary btn-block" data-open-product="${escapeHtml(p.id)}">
              عرض التفاصيل والطلب
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderBuyerOrders() {
    const myOrders = state.orders
      .filter((o) => o.buyerId === state.activeBuyerId)
      .slice()
      .reverse();

    const tbody = document.getElementById('buyerOrdersBody');
    if (myOrders.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="8" class="muted">لم تقم بإرسال أي طلبات بعد.</td></tr>';
      return;
    }

    tbody.innerHTML = myOrders.map((o) => {
      const seller = getSellerById(o.sellerId);
      const deliveryText = o.deliveryMethod === 'delivery'
        ? `توصيل (${escapeHtml(o.deliveryAddress)})`
        : 'استلام ذاتي';
      const receiptBtn = o.buyerReceipt
        ? `<button type="button" class="btn btn-outline btn-sm" data-preview-receipt="buyer" data-order-id="${escapeHtml(o.id)}">عرض الإيصال</button>`
        : '';
      return `
        <tr>
          <td data-label="رقم الطلب"><strong>${escapeHtml(o.id)}</strong></td>
          <td data-label="المنتج والمواصفات">
            <div>
              <strong>${escapeHtml(o.type)}</strong>
              <div class="muted">${escapeHtml(o.color)} — ${escapeHtml(o.thickness)}</div>
            </div>
          </td>
          <td data-label="البائع">${escapeHtml(seller ? seller.name : '-')}</td>
          <td data-label="عدد الأمتار">${escapeHtml(o.meters)} م²</td>
          <td data-label="السعر الصافي"><strong>${formatMoney(o.netPrice)}</strong></td>
          <td data-label="طريقة الاستلام">${deliveryText}</td>
          <td data-label="حالة الطلب">${orderStatusBadge(o.status)}</td>
          <td data-label="حالة الدفع">
            <div class="btn-group">
              ${paymentStatusBadge(o.paymentStatus || 'agreement')}
              ${receiptBtn}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function openProductDetail(productId) {
    const product = getProductById(productId);
    if (!product) return;

    // Increment views by +1 automatically when buyer opens details
    product.views = (Number(product.views) || 0) + 1;
    saveState();
    renderCounters();
    renderSellerProducts();

    activeDetailProductId = productId;
    renderProductDetailModalContent(productId);
    openModal('productDetailModal');
  }

  function renderProductDetailModalContent(productId) {
    const product = getProductById(productId);
    if (!product) return;
    const seller = getSellerById(product.sellerId);
    const activeBuyer = getUserById(state.activeBuyerId);
    const isBlocked = activeBuyer && activeBuyer.status === 'blocked';
    const { avg, count } = getAvgRating(product);

    document.getElementById('detailTitle').textContent = `${product.type} — ${seller ? seller.name : ''}`;

    const reviewsHtml = product.reviews && product.reviews.length > 0
      ? product.reviews.slice().reverse().map((r) => `
          <div class="review-item">
            <div class="review-header">
              <strong>${escapeHtml(r.buyerName)}</strong>
              <span>${renderStars(r.rating)} (${r.rating}/5)</span>
            </div>
            <p>${escapeHtml(r.comment)}</p>
          </div>
        `).join('')
      : '<p class="muted">لا توجد تقييمات لهذا المنتج حتى الآن. كن أول من يقيّم!</p>';

    const externalBtn = product.externalLink
      ? `<a href="${escapeHtml(product.externalLink)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-block mb-20">
           مشاهدة صور وفيديوهات إضافية ↗
         </a>`
      : '';

    const blockedAlert = isBlocked
      ? `<div class="alert alert-danger">حسابك محظور حالياً من قِبل الإدارة ولا يمكنك إتمام الطلبات.</div>`
      : '';

    document.getElementById('productDetailBody').innerHTML = `
      <div class="detail-layout">
        <div>
          <img class="detail-image" src="${escapeHtml(product.image)}" alt="${escapeHtml(product.type)}" />
          <div class="product-specs mb-20">
            <span class="spec-pill">البائع: ${escapeHtml(seller ? seller.name : '-')}</span>
            <span class="spec-pill">السعر: ${formatMoney(product.pricePerMeter)} / م²</span>
            <span class="spec-pill">المشاهدات: ${product.views}</span>
            <span class="spec-pill">التقييم: ${count > 0 ? `${avg} ★ (${count})` : 'جديد'}</span>
          </div>
          <p class="muted mb-20">${escapeHtml(product.details || '')}</p>
          ${externalBtn}
        </div>

        <div>
          <h4 style="margin-bottom: 10px;">تكوين الطلب</h4>
          ${blockedAlert}
          <form id="buyerOrderForm">
            <div class="form-grid-2">
              <div class="form-group">
                <label for="orderType">النوع</label>
                <input type="text" id="orderType" class="form-control" value="${escapeHtml(product.type)}" required />
              </div>
              <div class="form-group">
                <label for="orderColor">اللون</label>
                <input type="text" id="orderColor" class="form-control" value="${escapeHtml(product.color)}" required />
              </div>
              <div class="form-group">
                <label for="orderThickness">التخانة</label>
                <input type="text" id="orderThickness" class="form-control" value="${escapeHtml(product.thickness)}" required />
              </div>
              <div class="form-group">
                <label for="orderMeters">عدد الأمتار المطلوبة (م²) *</label>
                <input type="number" id="orderMeters" class="form-control" min="1" step="0.5" value="10" required />
              </div>
            </div>

            <div class="order-summary-box">
              <span>السعر الصافي للرخام:</span>
              <strong id="orderNetPriceDisplay">${formatMoney(10 * product.pricePerMeter)}</strong>
            </div>

            <div class="form-group">
              <label>طريقة الاستلام *</label>
              <div class="radio-row">
                <label class="radio-card">
                  <input type="radio" name="deliveryMethod" value="pickup" checked />
                  <span>استلام ذاتي</span>
                </label>
                <label class="radio-card">
                  <input type="radio" name="deliveryMethod" value="delivery" />
                  <span>طلب توصيل</span>
                </label>
              </div>
            </div>

            <div id="deliveryFieldsWrap" class="hidden">
              <div class="alert alert-warning">
                سيتم التواصل معك من قِبل البائع للاتفاق على سعر وتفاصيل التوصيل
              </div>
              <div class="form-group">
                <label for="orderDeliveryAddress">العنوان بالتفصيل *</label>
                <input type="text" id="orderDeliveryAddress" class="form-control" value="${escapeHtml(activeBuyer ? activeBuyer.address : '')}" placeholder="المحافظة، المدينة، الشارع، رقم العقار" />
              </div>
              <div class="form-group">
                <label for="orderDeliveryPhone">رقم التواصل *</label>
                <input type="text" id="orderDeliveryPhone" class="form-control" value="${escapeHtml(activeBuyer ? activeBuyer.phone : '')}" placeholder="01xxxxxxxxx" />
              </div>
            </div>

            <div class="form-group">
              <label>طريقة الدفع *</label>
              <div class="radio-row-3">
                <label class="radio-card">
                  <input type="radio" name="buyerPaymentMethod" value="agreement" checked />
                  <span>عند الاستلام / بالاتفاق</span>
                </label>
                <label class="radio-card">
                  <input type="radio" name="buyerPaymentMethod" value="vodafone" />
                  <span>فودافون كاش</span>
                </label>
                <label class="radio-card">
                  <input type="radio" name="buyerPaymentMethod" value="instapay" />
                  <span>إنستا باي</span>
                </label>
              </div>
            </div>

            <div id="buyerElectronicPayWrap" class="hidden">
              <div class="payment-info-box" id="buyerSellerAccountBox"></div>
              <div class="form-group">
                <label for="buyerReceiptFile">صورة إيصال التحويل (إلزامي) *</label>
                <input type="file" id="buyerReceiptFile" class="form-control" accept="image/*" />
                <div id="buyerReceiptPreviewWrap" class="image-preview-wrap hidden">
                  <img id="buyerReceiptPreview" src="" alt="معاينة الإيصال" />
                </div>
              </div>
            </div>

            <button type="submit" class="btn btn-primary btn-block" ${isBlocked ? 'disabled' : ''}>
              إتمام الطلب
            </button>
          </form>
        </div>
      </div>

      <div class="reviews-section">
        <h4 style="margin-bottom: 10px;">تقييمات المشترين (${count})</h4>
        <div class="mb-20">${reviewsHtml}</div>

        <form id="buyerReviewForm" class="card" style="background-color: var(--bg-page);">
          <h5 style="margin-bottom: 8px;">أضف تقييمك للمنتج</h5>
          <div class="form-grid-2">
            <div class="form-group">
              <label for="reviewRating">التقييم (نجوم)</label>
              <select id="reviewRating" class="form-control">
                <option value="5">5 نجوم — ممتاز</option>
                <option value="4">4 نجوم — جيد جداً</option>
                <option value="3">3 نجوم — جيد</option>
                <option value="2">2 نجمتان — مقبول</option>
                <option value="1">1 نجمة — ضعيف</option>
              </select>
            </div>
            <div class="form-group">
              <label for="reviewComment">تعليقك *</label>
              <input type="text" id="reviewComment" class="form-control" required placeholder="اكتب تجربتك مع الرخام..." />
            </div>
          </div>
          <button type="submit" class="btn btn-outline btn-sm">إرسال التقييم</button>
        </form>
      </div>
    `;

    // Bind live price calculation
    buyerReceiptBase64 = '';
    const metersInput = document.getElementById('orderMeters');
    const netDisplay = document.getElementById('orderNetPriceDisplay');
    const electronicWrap = document.getElementById('buyerElectronicPayWrap');
    const sellerAccBox = document.getElementById('buyerSellerAccountBox');
    const receiptFileInput = document.getElementById('buyerReceiptFile');

    function updateBuyerPaymentBox() {
      const selected = document.querySelector('input[name="buyerPaymentMethod"]:checked').value;
      const m = parseFloat(metersInput.value) || 0;
      const amount = m * product.pricePerMeter;
      const isElec = selected === 'vodafone' || selected === 'instapay';
      electronicWrap.classList.toggle('hidden', !isElec);
      receiptFileInput.required = isElec;
      if (isElec && seller) {
        const label = selected === 'vodafone' ? 'رقم فودافون كاش للبائع' : 'حساب إنستا باي للبائع';
        const val = selected === 'vodafone' ? (seller.vodafoneCash || seller.phone) : (seller.instapay || '-');
        sellerAccBox.innerHTML = `
          <div><strong>${label}:</strong> ${escapeHtml(val)}</div>
          <div><strong>المبلغ المطلوب تحويله:</strong> ${formatMoney(amount)}</div>
        `;
      }
    }

    metersInput.addEventListener('input', () => {
      const m = parseFloat(metersInput.value) || 0;
      netDisplay.textContent = formatMoney(m * product.pricePerMeter);
      updateBuyerPaymentBox();
    });

    document.querySelectorAll('input[name="buyerPaymentMethod"]').forEach((radio) => {
      radio.addEventListener('change', updateBuyerPaymentBox);
    });

    receiptFileInput.addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) {
        buyerReceiptBase64 = '';
        document.getElementById('buyerReceiptPreviewWrap').classList.add('hidden');
        return;
      }
      try {
        buyerReceiptBase64 = await compressImageToBase64(file, 800, 0.72);
        document.getElementById('buyerReceiptPreview').src = buyerReceiptBase64;
        document.getElementById('buyerReceiptPreviewWrap').classList.remove('hidden');
      } catch (err) {
        showToast('تعذر قراءة صورة الإيصال.', 'danger');
      }
    });

    // Bind delivery method toggle
    const deliveryFields = document.getElementById('deliveryFieldsWrap');
    const addrInput = document.getElementById('orderDeliveryAddress');
    const phoneInput = document.getElementById('orderDeliveryPhone');
    document.querySelectorAll('input[name="deliveryMethod"]').forEach((radio) => {
      radio.addEventListener('change', (e) => {
        const isDelivery = e.target.value === 'delivery';
        deliveryFields.classList.toggle('hidden', !isDelivery);
        addrInput.required = isDelivery;
        phoneInput.required = isDelivery;
      });
    });

    // Bind order submission
    document.getElementById('buyerOrderForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const buyer = getUserById(state.activeBuyerId);
      if (buyer && buyer.status === 'blocked') {
        showToast('حسابك محظور ولا يمكنك إرسال طلبات.', 'danger');
        return;
      }

      const meters = parseFloat(document.getElementById('orderMeters').value);
      if (!meters || meters <= 0) {
        showToast('يرجى إدخال عدد أمتار صحيح.', 'danger');
        return;
      }

      const method = document.querySelector('input[name="deliveryMethod"]:checked').value;
      const dAddr = document.getElementById('orderDeliveryAddress').value.trim();
      const dPhone = document.getElementById('orderDeliveryPhone').value.trim();

      if (method === 'delivery' && (!dAddr || !dPhone)) {
        showToast('يرجى كتابة العنوان ورقم التواصل للتوصيل.', 'danger');
        return;
      }

      const payMethod = document.querySelector('input[name="buyerPaymentMethod"]:checked').value;
      if ((payMethod === 'vodafone' || payMethod === 'instapay') && !buyerReceiptBase64) {
        showToast('يرجى رفع صورة إيصال التحويل لإتمام الطلب.', 'danger');
        return;
      }

      const netPrice = Math.round(meters * product.pricePerMeter * 100) / 100;
      const rate = Number(state.commissionRate) || 0;
      const commissionAmount = Math.round((netPrice * rate / 100) * 100) / 100;

      const newOrder = {
        id: 'ORD-' + (1000 + state.orders.length + 1),
        buyerId: state.activeBuyerId,
        sellerId: product.sellerId,
        productId: product.id,
        type: document.getElementById('orderType').value.trim() || product.type,
        color: document.getElementById('orderColor').value.trim() || product.color,
        thickness: document.getElementById('orderThickness').value.trim() || product.thickness,
        meters,
        pricePerMeter: product.pricePerMeter,
        netPrice,
        commissionRate: rate,
        commissionAmount,
        deliveryMethod: method,
        deliveryAddress: method === 'delivery' ? dAddr : '',
        deliveryPhone: method === 'delivery' ? dPhone : (buyer ? buyer.phone : ''),
        paymentMethod: payMethod,
        paymentStatus: payMethod === 'agreement' ? 'agreement' : 'awaiting_seller',
        buyerReceipt: payMethod === 'agreement' ? '' : buyerReceiptBase64,
        commissionPaymentMethod: '',
        commissionReceipt: '',
        status: 'pending',
        commissionStatus: 'uncollected',
        createdAt: new Date().toISOString().slice(0, 10)
      };

      state.orders.push(newOrder);
      saveState();
      closeModal('productDetailModal');
      renderAll();
      showToast(`تم إرسال الطلب ${newOrder.id} بنجاح وهو في انتظار رد البائع.`, 'success');
    });

    // Bind review submission
    document.getElementById('buyerReviewForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const buyer = getUserById(state.activeBuyerId);
      const rating = Number(document.getElementById('reviewRating').value);
      const comment = document.getElementById('reviewComment').value.trim();
      if (!comment) return;

      product.reviews = product.reviews || [];
      product.reviews.push({
        id: 'rev-' + Date.now(),
        buyerName: buyer ? buyer.name : 'مشتري',
        rating,
        comment,
        date: new Date().toISOString().slice(0, 10)
      });

      saveState();
      renderProductDetailModalContent(product.id);
      renderBuyerProducts();
      renderSellerProducts();
      showToast('تم إضافة تقييمك بنجاح.', 'success');
    });
  }

  // ==================== SELLER VIEW ====================
  function renderSellerView() {
    const seller = getSellerById(state.activeSellerId);
    if (seller) {
      document.getElementById('sellerTitle').textContent = `لوحة البائع — ${seller.name}`;
      document.getElementById('sellerSubtitle').textContent = `${seller.address} | تليفون: ${seller.phone}`;
      document.getElementById('sellerVodafoneInput').value = seller.vodafoneCash || '';
      document.getElementById('sellerInstapayInput').value = seller.instapay || '';
    }
    renderSellerProducts();
    renderSellerOrders();
    renderSellerCommissions();
  }

  function renderSellerProducts() {
    const myProducts = state.products.filter((p) => p.sellerId === state.activeSellerId);
    const grid = document.getElementById('sellerProductsGrid');

    if (myProducts.length === 0) {
      grid.innerHTML = '<div class="empty-state">لا توجد منتجات مضافة لهذا البائع بعد. اضغط على "إضافة منتج جديد" للبدء.</div>';
      return;
    }

    grid.innerHTML = myProducts.map((p) => {
      const { avg, count } = getAvgRating(p);
      return `
        <article class="product-card">
          <img class="product-thumb" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.type)}" />
          <div class="product-body">
            <h3 class="product-title">${escapeHtml(p.type)}</h3>
            <div class="product-specs">
              <span class="spec-pill">اللون: ${escapeHtml(p.color)}</span>
              <span class="spec-pill">التخانة: ${escapeHtml(p.thickness)}</span>
            </div>
            <div class="product-price">${formatMoney(p.pricePerMeter)} <small class="muted">/ م²</small></div>
            <div class="seller-stats-row">
              <span>المشاهدات: <strong>${p.views || 0}</strong></span>
              <span>التقييم: <strong>${count > 0 ? `${avg} ★ (${count})` : 'لا يوجد'}</strong></span>
            </div>
            <div class="btn-group">
              <button type="button" class="btn btn-outline btn-sm" data-view-reviews="${escapeHtml(p.id)}">التقييمات (${count})</button>
              <button type="button" class="btn btn-outline btn-sm" data-edit-product="${escapeHtml(p.id)}">تعديل</button>
              <button type="button" class="btn btn-danger btn-sm" data-delete-product="${escapeHtml(p.id)}">حذف</button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function renderSellerOrders() {
    const myOrders = state.orders
      .filter((o) => o.sellerId === state.activeSellerId)
      .slice()
      .reverse();
    const tbody = document.getElementById('sellerOrdersBody');

    if (myOrders.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="7" class="muted">لا توجد طلبات واردة حالياً.</td></tr>';
      return;
    }

    tbody.innerHTML = myOrders.map((o) => {
      const buyer = getUserById(o.buyerId);
      const buyerPhone = o.deliveryPhone || (buyer ? buyer.phone : '');
      const buyerName = buyer ? buyer.name : 'مشتري';
      const deliveryInfo = o.deliveryMethod === 'delivery'
        ? `<div><strong>طلب توصيل</strong></div><div class="muted">${escapeHtml(o.deliveryAddress)}</div>`
        : '<div><strong>استلام ذاتي</strong></div>';

      const decisionBtns = o.status === 'pending'
        ? `<button type="button" class="btn btn-success btn-sm" data-accept-order="${escapeHtml(o.id)}">قبول الطلب</button>
           <button type="button" class="btn btn-danger btn-sm" data-reject-order="${escapeHtml(o.id)}">رفض الطلب</button>`
        : '';

      const contactBtns = buyerPhone
        ? `<a href="${toWhatsAppUrl(buyerPhone, `أهلاً أ/ ${buyerName}، بخصوص طلبك رقم ${o.id} (${o.type})`)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">واتساب</a>
           <a href="tel:${escapeHtml(buyerPhone)}" class="btn btn-outline btn-sm">مكالمة</a>`
        : '';

      const payMethodText = paymentMethodLabel(o.paymentMethod || 'agreement');
      const payReceiptBtn = o.buyerReceipt
        ? `<button type="button" class="btn btn-outline btn-sm" data-preview-receipt="buyer" data-order-id="${escapeHtml(o.id)}">عرض الإيصال</button>`
        : '';
      const payActionBtns = (o.paymentMethod === 'vodafone' || o.paymentMethod === 'instapay') && o.paymentStatus === 'awaiting_seller'
        ? `<button type="button" class="btn btn-success btn-sm" data-confirm-buyer-pay="${escapeHtml(o.id)}">تأكيد استلام الفلوس</button>
           <button type="button" class="btn btn-danger btn-sm" data-reject-buyer-pay="${escapeHtml(o.id)}">رفض الإيصال</button>`
        : '';

      return `
        <tr>
          <td data-label="رقم الطلب"><div><strong>${escapeHtml(o.id)}</strong><div class="muted">${escapeHtml(o.createdAt)}</div></div></td>
          <td data-label="المنتج والمواصفات">
            <div>
              <strong>${escapeHtml(o.type)}</strong>
              <div class="muted">${escapeHtml(o.color)} — ${escapeHtml(o.thickness)}</div>
            </div>
          </td>
          <td data-label="الكمية والسعر الصافي">
            <div>
              <div>${escapeHtml(o.meters)} م²</div>
              <strong>${formatMoney(o.netPrice)}</strong>
            </div>
          </td>
          <td data-label="الاستلام والتواصل">
            <div>
              <div>${escapeHtml(buyerName)} (${escapeHtml(buyerPhone)})</div>
              ${deliveryInfo}
            </div>
          </td>
          <td data-label="الدفع والإيصال">
            <div>
              <div>${escapeHtml(payMethodText)}</div>
              <div style="margin: 4px 0;">${paymentStatusBadge(o.paymentStatus || 'agreement')}</div>
              <div class="btn-group">${payReceiptBtn}${payActionBtns}</div>
            </div>
          </td>
          <td data-label="الحالة">${orderStatusBadge(o.status)}</td>
          <td data-label="الإجراءات">
            <div class="btn-group">
              ${decisionBtns}
              ${contactBtns}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderSellerCommissions() {
    const acceptedOrders = state.orders
      .filter((o) => o.sellerId === state.activeSellerId && o.status === 'accepted')
      .slice()
      .reverse();

    const tbody = document.getElementById('sellerCommissionsBody');
    if (acceptedOrders.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="6" class="muted">لا توجد طلبات مقبولة تستحق عمولة حتى الآن.</td></tr>';
      return;
    }

    tbody.innerHTML = acceptedOrders.map((o) => {
      const receiptBtn = o.commissionReceipt
        ? `<button type="button" class="btn btn-outline btn-sm" data-preview-receipt="commission" data-order-id="${escapeHtml(o.id)}">عرض الإيصال</button>`
        : '';
      let actionHtml = '<span class="muted">—</span>';
      if (o.commissionStatus === 'uncollected' || o.commissionStatus === 'rejected_receipt') {
        const label = o.commissionStatus === 'rejected_receipt' ? 'إعادة رفع الإيصال' : 'سداد / تحصيل النسبة';
        actionHtml = `<div class="btn-group"><button type="button" class="btn btn-primary btn-sm" data-open-settle="${escapeHtml(o.id)}">${label}</button>${receiptBtn}</div>`;
      } else if (o.commissionStatus === 'awaiting_admin') {
        actionHtml = `<div class="btn-group"><span class="muted">بانتظار تأكيد الأدمن</span>${receiptBtn}</div>`;
      } else if (o.commissionStatus === 'collected') {
        actionHtml = `<div class="btn-group"><span class="text-success"><strong>تمت التسوية</strong></span>${receiptBtn}</div>`;
      }

      return `
        <tr>
          <td data-label="رقم الأوردر"><strong>${escapeHtml(o.id)}</strong></td>
          <td data-label="المنتج">${escapeHtml(o.type)} (${escapeHtml(o.meters)} م²)</td>
          <td data-label="السعر الصافي">${formatMoney(o.netPrice)}</td>
          <td data-label="عمولة المنصة"><div><strong>${formatMoney(o.commissionAmount)}</strong> <span class="muted">(${o.commissionRate}%)</span></div></td>
          <td data-label="حالة السداد">${commissionStatusBadge(o.commissionStatus)}</td>
          <td data-label="الإجراء">${actionHtml}</td>
        </tr>
      `;
    }).join('');
  }

  function openCommissionSettleModal(orderId) {
    const order = state.orders.find((o) => o.id === orderId);
    if (!order) return;
    settleReceiptBase64 = '';
    document.getElementById('commissionSettleForm').reset();
    document.getElementById('settleOrderId').value = order.id;
    document.getElementById('settleAmountDisplay').textContent = formatMoney(order.commissionAmount);
    document.getElementById('settleReceiptPreviewWrap').classList.add('hidden');
    updateSettleAdminAccountBox();
    openModal('commissionSettleModal');
  }

  function updateSettleAdminAccountBox() {
    const checked = document.querySelector('input[name="settleMethod"]:checked');
    const method = checked ? checked.value : 'vodafone';
    const box = document.getElementById('settleAdminAccountBox');
    const adminPay = state.adminPayment || {};
    if (method === 'vodafone') {
      box.innerHTML = `<strong>رقم فودافون كاش لصاحب المنصة:</strong> ${escapeHtml(adminPay.vodafoneCash || 'غير محدد')}`;
    } else {
      box.innerHTML = `<strong>حساب إنستا باي لصاحب المنصة:</strong> ${escapeHtml(adminPay.instapay || 'غير محدد')}`;
    }
  }

  function openAddProductModal() {
    document.getElementById('productFormTitle').textContent = 'إضافة منتج جديد';
    document.getElementById('sellerProductForm').reset();
    document.getElementById('prodEditId').value = '';
    uploadedBase64 = '';
    document.getElementById('prodImagePreviewWrap').classList.add('hidden');
    openModal('productFormModal');
  }

  function openEditProductModal(productId) {
    const p = getProductById(productId);
    if (!p) return;
    document.getElementById('productFormTitle').textContent = 'تعديل المنتج';
    document.getElementById('prodEditId').value = p.id;
    document.getElementById('prodType').value = p.type;
    document.getElementById('prodColor').value = p.color;
    document.getElementById('prodThickness').value = p.thickness;
    document.getElementById('prodPrice').value = p.pricePerMeter;
    document.getElementById('prodDetails').value = p.details || '';
    document.getElementById('prodExternalLink').value = p.externalLink || '';
    document.getElementById('prodImageUrl').value = p.image && !p.image.startsWith('data:') ? p.image : '';
    uploadedBase64 = p.image && p.image.startsWith('data:') ? p.image : '';

    if (p.image) {
      document.getElementById('prodImagePreview').src = p.image;
      document.getElementById('prodImagePreviewWrap').classList.remove('hidden');
    } else {
      document.getElementById('prodImagePreviewWrap').classList.add('hidden');
    }

    openModal('productFormModal');
  }

  function openSellerReviewsModal(productId) {
    const p = getProductById(productId);
    if (!p) return;
    document.getElementById('sellerReviewsTitle').textContent = `تقييمات: ${p.type}`;
    const body = document.getElementById('sellerReviewsBody');

    if (!p.reviews || p.reviews.length === 0) {
      body.innerHTML = '<p class="muted">لا توجد تقييمات لهذا المنتج حتى الآن.</p>';
    } else {
      body.innerHTML = p.reviews.slice().reverse().map((r) => `
        <div class="review-item">
          <div class="review-header">
            <strong>${escapeHtml(r.buyerName)}</strong>
            <span>${renderStars(r.rating)} (${r.rating}/5)</span>
          </div>
          <p>${escapeHtml(r.comment)}</p>
          <span class="muted" style="font-size:12px;">${escapeHtml(r.date || '')}</span>
        </div>
      `).join('');
    }
    openModal('sellerReviewsModal');
  }

  // ==================== ADMIN VIEW ====================
  function renderAdminView() {
    document.getElementById('adminCommissionInput').value = state.commissionRate;
    const adminPay = state.adminPayment || {};
    document.getElementById('adminVodafoneInput').value = adminPay.vodafoneCash || '';
    document.getElementById('adminInstapayInput').value = adminPay.instapay || '';
    renderAdminUsers();
    renderAdminProfits();
    renderAdminAllOrders();
  }

  function renderAdminUsers() {
    const tbody = document.getElementById('adminUsersBody');
    tbody.innerHTML = state.users.map((u) => {
      const isBlocked = u.status === 'blocked';
      const statusBadge = isBlocked
        ? '<span class="badge badge-danger">محظور</span>'
        : '<span class="badge badge-success">نشط</span>';
      const toggleBtn = isBlocked
        ? `<button type="button" class="btn btn-success btn-sm" data-toggle-user="${escapeHtml(u.id)}">فك الحظر</button>`
        : `<button type="button" class="btn btn-danger btn-sm" data-toggle-user="${escapeHtml(u.id)}">حظر</button>`;

      return `
        <tr>
          <td data-label="الاسم"><strong>${escapeHtml(u.name)}</strong></td>
          <td data-label="رقم التليفون">${escapeHtml(u.phone)}</td>
          <td data-label="العنوان">${escapeHtml(u.address)}</td>
          <td data-label="حالة الحساب">${statusBadge}</td>
          <td data-label="الإجراءات">
            <div class="btn-group">
              <a href="${toWhatsAppUrl(u.phone)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">واتساب</a>
              ${toggleBtn}
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderAdminProfits() {
    const accepted = state.orders.filter((o) => o.status === 'accepted').slice().reverse();

    let total = 0;
    let collected = 0;
    let pending = 0;

    accepted.forEach((o) => {
      const amt = Number(o.commissionAmount) || 0;
      total += amt;
      if (o.commissionStatus === 'collected') {
        collected += amt;
      } else {
        pending += amt;
      }
    });

    document.getElementById('statTotalProfit').textContent = formatMoney(total);
    document.getElementById('statCollectedProfit').textContent = formatMoney(collected);
    document.getElementById('statPendingProfit').textContent = formatMoney(pending);

    const tbody = document.getElementById('adminCommissionsBody');
    if (accepted.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="8" class="muted">لا توجد مبيعات مقبولة حتى الآن.</td></tr>';
      return;
    }

    tbody.innerHTML = accepted.map((o) => {
      const seller = getSellerById(o.sellerId);
      const sellerPhone = seller ? seller.phone : '';
      const sellerName = seller ? seller.name : '-';

      const methodText = o.commissionPaymentMethod ? paymentMethodLabel(o.commissionPaymentMethod) : '—';
      const receiptBtn = o.commissionReceipt
        ? `<button type="button" class="btn btn-outline btn-sm" data-preview-receipt="commission" data-order-id="${escapeHtml(o.id)}">عرض الإيصال</button>`
        : '';

      const actionBtns = o.commissionStatus === 'awaiting_admin'
        ? `<button type="button" class="btn btn-success btn-sm" data-confirm-commission="${escapeHtml(o.id)}">تم التأكيد</button>
           <button type="button" class="btn btn-danger btn-sm" data-reject-commission="${escapeHtml(o.id)}">رفض الإيصال</button>`
        : '';

      return `
        <tr>
          <td data-label="رقم الأوردر"><strong>${escapeHtml(o.id)}</strong></td>
          <td data-label="إجمالي سعر الأوردر">${formatMoney(o.netPrice)}</td>
          <td data-label="النسبة (%)">${o.commissionRate}%</td>
          <td data-label="قيمة مكسب المنصة"><strong>${formatMoney(o.commissionAmount)}</strong></td>
          <td data-label="البائع">${escapeHtml(sellerName)}</td>
          <td data-label="وسيلة الدفع والإيصال">
            <div class="btn-group">
              <span>${escapeHtml(methodText)}</span>
              ${receiptBtn}
            </div>
          </td>
          <td data-label="حالة العمولة">${commissionStatusBadge(o.commissionStatus)}</td>
          <td data-label="التواصل والتحصيل">
            <div class="btn-group">
              ${actionBtns}
              <a href="${toWhatsAppUrl(sellerPhone, `مرحباً ${sellerName}، بخصوص تحصيل عمولة المنصة للطلب ${o.id} بقيمة ${o.commissionAmount} ج.م`)}" target="_blank" rel="noopener noreferrer" class="btn btn-outline btn-sm">واتساب</a>
              <a href="tel:${escapeHtml(sellerPhone)}" class="btn btn-outline btn-sm">مكالمة</a>
            </div>
          </td>
        </tr>
      `;
    }).join('');
  }

  function renderAdminAllOrders() {
    const tbody = document.getElementById('adminAllOrdersBody');
    const allOrders = state.orders.slice().reverse();

    if (allOrders.length === 0) {
      tbody.innerHTML = '<tr class="empty-row"><td colspan="8" class="muted">لا توجد طلبات مسجلة.</td></tr>';
      return;
    }

    tbody.innerHTML = allOrders.map((o) => {
      const buyer = getUserById(o.buyerId);
      const seller = getSellerById(o.sellerId);
      const alertBtn = o.status === 'pending' && seller
        ? `<a href="${toWhatsAppUrl(seller.phone, `تنبيه من إدارة منصة رخام مصر: لديك طلب معلق رقم ${o.id} (${o.type} - ${o.meters} م²). يرجى الرد عليه في لوحة البائع.`)}" target="_blank" rel="noopener noreferrer" class="btn btn-warning btn-sm">تنبيه عبر واتساب</a>`
        : '<span class="muted">—</span>';

      return `
        <tr>
          <td data-label="رقم الطلب"><strong>${escapeHtml(o.id)}</strong></td>
          <td data-label="المشتري">${escapeHtml(buyer ? buyer.name : '-')}</td>
          <td data-label="البائع">${escapeHtml(seller ? seller.name : '-')}</td>
          <td data-label="المنتج والأمتار">${escapeHtml(o.type)} (${escapeHtml(o.meters)} م²)</td>
          <td data-label="السعر الصافي"><strong>${formatMoney(o.netPrice)}</strong></td>
          <td data-label="حالة الدفع">${paymentStatusBadge(o.paymentStatus || 'agreement')}</td>
          <td data-label="الحالة">${orderStatusBadge(o.status)}</td>
          <td data-label="تنبيه البائع">${alertBtn}</td>
        </tr>
      `;
    }).join('');
  }

  function renderHomePage() {
    document.getElementById('homeStatProducts').textContent = state.products.length;
    document.getElementById('homeStatSellers').textContent = state.sellers.length;
    document.getElementById('homeStatOrders').textContent = state.orders.length;

    const featuredGrid = document.getElementById('homeFeaturedGrid');
    const featured = state.products.slice(0, 4);
    if (featured.length === 0) {
      featuredGrid.innerHTML = '<div class="empty-state">لا توجد منتجات مضافة حالياً.</div>';
      return;
    }

    featuredGrid.innerHTML = featured.map((p) => {
      const seller = getSellerById(p.sellerId);
      return `
        <article class="product-card">
          <img class="product-thumb" src="${escapeHtml(p.image)}" alt="${escapeHtml(p.type)}" />
          <div class="product-body">
            <span class="product-seller">${escapeHtml(seller ? seller.name : 'بائع غير معروف')}</span>
            <h3 class="product-title">${escapeHtml(p.type)}</h3>
            <div class="product-meta-row">
              <span class="product-price">${formatMoney(p.pricePerMeter)} <small class="muted">/ م²</small></span>
            </div>
            <button type="button" class="btn btn-outline btn-block" data-home-product="${escapeHtml(p.id)}">
              عرض المنتج والطلب
            </button>
          </div>
        </article>
      `;
    }).join('');
  }

  function showHomePage() {
    document.getElementById('homePageView').classList.remove('hidden');
    document.getElementById('demoAppView').classList.add('hidden');
    renderHomePage();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function enterDemoApp(targetRole) {
    document.getElementById('homePageView').classList.add('hidden');
    document.getElementById('demoAppView').classList.remove('hidden');
    switchRole(targetRole || state.activeRole || 'buyer');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function renderAll() {
    renderHomePage();
    renderAccountSelectors();
    renderCounters();
    renderBuyerView();
    renderSellerView();
    renderAdminView();
  }

  // ==================== EVENT LISTENERS ====================
  function bindEvents() {
    // Home Page Navigation
    document.getElementById('btnNavDashboards').addEventListener('click', () => enterDemoApp());
    document.getElementById('btnHeroDashboards').addEventListener('click', () => enterDemoApp());
    document.getElementById('btnFooterDashboards').addEventListener('click', () => enterDemoApp());
    document.getElementById('btnHeroBrowse').addEventListener('click', () => enterDemoApp('buyer'));
    document.getElementById('btnHomeAllProducts').addEventListener('click', () => enterDemoApp('buyer'));
    document.getElementById('btnHomeSellerPanel').addEventListener('click', () => enterDemoApp('seller'));
    document.getElementById('btnBackToHome').addEventListener('click', showHomePage);

    // Role switching
    document.querySelectorAll('.role-btn').forEach((btn) => {
      btn.addEventListener('click', () => switchRole(btn.dataset.role));
    });

    // Account switching
    document.getElementById('sellerAccountSelect').addEventListener('change', (e) => {
      state.activeSellerId = e.target.value;
      saveState();
      if (state.activeRole !== 'seller') {
        switchRole('seller');
      } else {
        renderAll();
      }
    });

    document.getElementById('buyerAccountSelect').addEventListener('change', (e) => {
      state.activeBuyerId = e.target.value;
      saveState();
      renderAll();
    });

    // Reset Data
    document.getElementById('btnResetData').addEventListener('click', () => {
      state = createSeedState();
      saveState();
      switchRole(state.activeRole);
      showToast('تمت إعادة ضبط البيانات الافتراضية بنجاح.', 'success');
    });

    // Tabs
    setupTabs('data-buyer-tab', 'buyerTab');
    setupTabs('data-seller-tab', 'sellerTab');
    setupTabs('data-admin-tab', 'adminTab');

    // Buyer filters
    ['filterSearch', 'filterType', 'filterColor', 'filterThickness', 'filterSeller'].forEach((id) => {
      document.getElementById(id).addEventListener('input', renderBuyerProducts);
      document.getElementById(id).addEventListener('change', renderBuyerProducts);
    });

    document.getElementById('btnClearFilters').addEventListener('click', () => {
      document.getElementById('filterSearch').value = '';
      document.getElementById('filterType').value = '';
      document.getElementById('filterColor').value = '';
      document.getElementById('filterThickness').value = '';
      document.getElementById('filterSeller').value = '';
      renderBuyerProducts();
    });

    // Modal close handlers
    document.querySelectorAll('[data-close-modal]').forEach((el) => {
      el.addEventListener('click', () => closeModal(el.getAttribute('data-close-modal')));
    });

    // Seller Add Product button
    document.getElementById('btnOpenAddProduct').addEventListener('click', openAddProductModal);

    // Seller Image FileReader upload
    document.getElementById('prodImageFile').addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        uploadedBase64 = ev.target.result;
        document.getElementById('prodImagePreview').src = uploadedBase64;
        document.getElementById('prodImagePreviewWrap').classList.remove('hidden');
      };
      reader.readAsDataURL(file);
    });

    // Seller Save Product Form
    document.getElementById('sellerProductForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const editId = document.getElementById('prodEditId').value;
      const type = document.getElementById('prodType').value.trim();
      const color = document.getElementById('prodColor').value.trim();
      const thickness = document.getElementById('prodThickness').value.trim();
      const pricePerMeter = Number(document.getElementById('prodPrice').value);
      const details = document.getElementById('prodDetails').value.trim();
      const externalLink = document.getElementById('prodExternalLink').value.trim();
      const imageUrlInput = document.getElementById('prodImageUrl').value.trim();

      const finalImage = uploadedBase64 || imageUrlInput || makeMarbleSvg('#E5E0D8', '#B8B0A4', '#8A8275', type);

      if (editId) {
        const prod = getProductById(editId);
        if (prod) {
          prod.type = type;
          prod.color = color;
          prod.thickness = thickness;
          prod.pricePerMeter = pricePerMeter;
          prod.details = details;
          prod.externalLink = externalLink;
          prod.image = finalImage;
        }
        showToast('تم تعديل المنتج بنجاح.', 'success');
      } else {
        state.products.unshift({
          id: 'p-' + Date.now(),
          sellerId: state.activeSellerId,
          type,
          color,
          thickness,
          pricePerMeter,
          details,
          externalLink,
          image: finalImage,
          views: 0,
          reviews: []
        });
        showToast('تم إضافة المنتج بنجاح.', 'success');
      }

      saveState();
      closeModal('productFormModal');
      renderAll();
    });

    // Seller Register Modal
    document.getElementById('btnOpenRegisterSeller').addEventListener('click', () => {
      document.getElementById('registerSellerForm').reset();
      openModal('registerSellerModal');
    });

    document.getElementById('registerSellerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('regSellerPhone').value.trim();
      const username = document.getElementById('regSellerUsername').value.trim();
      const newSeller = {
        id: 's-' + Date.now(),
        name: document.getElementById('regSellerName').value.trim(),
        phone,
        address: document.getElementById('regSellerAddress').value.trim(),
        username,
        password: document.getElementById('regSellerPassword').value,
        vodafoneCash: phone,
        instapay: username + '@instapay'
      };
      state.sellers.push(newSeller);
      state.activeSellerId = newSeller.id;
      saveState();
      closeModal('registerSellerModal');
      renderAll();
      showToast(`تم تسجيل حساب البائع "${newSeller.name}" والدخول إليه.`, 'success');
    });

    // Seller Save Payment Settings
    document.getElementById('btnSaveSellerPayment').addEventListener('click', () => {
      const seller = getSellerById(state.activeSellerId);
      if (!seller) return;
      seller.vodafoneCash = document.getElementById('sellerVodafoneInput').value.trim();
      seller.instapay = document.getElementById('sellerInstapayInput').value.trim();
      saveState();
      showToast('تم حفظ بيانات الدفع الإلكتروني للبائع.', 'success');
    });

    // Seller Commission Settle Modal Events
    document.querySelectorAll('input[name="settleMethod"]').forEach((radio) => {
      radio.addEventListener('change', updateSettleAdminAccountBox);
    });

    document.getElementById('settleReceiptFile').addEventListener('change', async (e) => {
      const file = e.target.files[0];
      if (!file) {
        settleReceiptBase64 = '';
        document.getElementById('settleReceiptPreviewWrap').classList.add('hidden');
        return;
      }
      try {
        settleReceiptBase64 = await compressImageToBase64(file, 800, 0.72);
        document.getElementById('settleReceiptPreview').src = settleReceiptBase64;
        document.getElementById('settleReceiptPreviewWrap').classList.remove('hidden');
      } catch (err) {
        showToast('تعذر قراءة صورة الإيصال.', 'danger');
      }
    });

    document.getElementById('commissionSettleForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const oid = document.getElementById('settleOrderId').value;
      const order = state.orders.find((o) => o.id === oid);
      if (!order) return;

      const checked = document.querySelector('input[name="settleMethod"]:checked');
      if (!checked || !settleReceiptBase64) {
        showToast('يرجى اختيار وسيلة الدفع ورفع صورة الإيصال.', 'danger');
        return;
      }

      order.commissionPaymentMethod = checked.value;
      order.commissionReceipt = settleReceiptBase64;
      order.commissionStatus = 'awaiting_admin';
      saveState();
      closeModal('commissionSettleModal');
      renderAll();
      showToast(`تم إرسال إيصال سداد العمولة للأدمن (${oid}).`, 'success');
    });

    // Admin Save Commission Rate
    document.getElementById('btnSaveCommissionRate').addEventListener('click', () => {
      const val = parseFloat(document.getElementById('adminCommissionInput').value);
      if (isNaN(val) || val < 0 || val > 100) {
        showToast('يرجى إدخال نسبة مئوية صحيحة بين 0 و 100.', 'danger');
        return;
      }
      state.commissionRate = val;
      saveState();
      showToast(`تم تحديث نسبة عمولة المنصة إلى ${val}% للطلبات الجديدة.`, 'success');
    });

    // Admin Save Payment Settings
    document.getElementById('btnSaveAdminPayment').addEventListener('click', () => {
      state.adminPayment = {
        vodafoneCash: document.getElementById('adminVodafoneInput').value.trim(),
        instapay: document.getElementById('adminInstapayInput').value.trim()
      };
      saveState();
      showToast('تم حفظ بيانات الدفع الخاصة بالمنصة.', 'success');
    });

    // Admin Create Seller Form
    document.getElementById('adminCreateSellerForm').addEventListener('submit', (e) => {
      e.preventDefault();
      const phone = document.getElementById('newSellerPhone').value.trim();
      const username = document.getElementById('newSellerUsername').value.trim();
      const newSeller = {
        id: 's-' + Date.now(),
        name: document.getElementById('newSellerName').value.trim(),
        phone,
        address: document.getElementById('newSellerAddress').value.trim(),
        username,
        password: document.getElementById('newSellerPassword').value,
        vodafoneCash: phone,
        instapay: username + '@instapay'
      };
      state.sellers.push(newSeller);
      saveState();
      e.target.reset();
      renderAll();
      showToast(`تم إنشاء حساب البائع "${newSeller.name}" بنجاح.`, 'success');
    });

    // Delegated Click Actions across views
    document.addEventListener('click', (e) => {
      const homeProdBtn = e.target.closest('[data-home-product]');
      if (homeProdBtn) {
        const pid = homeProdBtn.getAttribute('data-home-product');
        enterDemoApp('buyer');
        openProductDetail(pid);
        return;
      }

      const openProdBtn = e.target.closest('[data-open-product]');
      if (openProdBtn) {
        openProductDetail(openProdBtn.getAttribute('data-open-product'));
        return;
      }

      const editProdBtn = e.target.closest('[data-edit-product]');
      if (editProdBtn) {
        openEditProductModal(editProdBtn.getAttribute('data-edit-product'));
        return;
      }

      const delProdBtn = e.target.closest('[data-delete-product]');
      if (delProdBtn) {
        const pid = delProdBtn.getAttribute('data-delete-product');
        state.products = state.products.filter((p) => p.id !== pid);
        saveState();
        renderAll();
        showToast('تم حذف المنتج بنجاح.');
        return;
      }

      const viewRevBtn = e.target.closest('[data-view-reviews]');
      if (viewRevBtn) {
        openSellerReviewsModal(viewRevBtn.getAttribute('data-view-reviews'));
        return;
      }

      const acceptBtn = e.target.closest('[data-accept-order]');
      if (acceptBtn) {
        const oid = acceptBtn.getAttribute('data-accept-order');
        const order = state.orders.find((o) => o.id === oid);
        if (order) {
          order.status = 'accepted';
          saveState();
          renderAll();
          showToast(`تم قبول الطلب ${oid} وتثبيت عمولة المنصة.`, 'success');
        }
        return;
      }

      const rejectBtn = e.target.closest('[data-reject-order]');
      if (rejectBtn) {
        const oid = rejectBtn.getAttribute('data-reject-order');
        const order = state.orders.find((o) => o.id === oid);
        if (order) {
          order.status = 'rejected';
          saveState();
          renderAll();
          showToast(`تم رفض الطلب ${oid}.`);
        }
        return;
      }

      const previewBtn = e.target.closest('[data-preview-receipt]');
      if (previewBtn) {
        const kind = previewBtn.getAttribute('data-preview-receipt');
        const oid = previewBtn.getAttribute('data-order-id');
        const order = state.orders.find((o) => o.id === oid);
        if (order) {
          if (kind === 'buyer' && order.buyerReceipt) {
            openReceiptPreview(
              order.buyerReceipt,
              `إيصال دفع المشتري — ${order.id}`,
              `${paymentMethodLabel(order.paymentMethod)} | ${formatMoney(order.netPrice)}`
            );
          } else if (kind === 'commission' && order.commissionReceipt) {
            openReceiptPreview(
              order.commissionReceipt,
              `إيصال عمولة البائع — ${order.id}`,
              `${paymentMethodLabel(order.commissionPaymentMethod)} | ${formatMoney(order.commissionAmount)}`
            );
          }
        }
        return;
      }

      const openSettleBtn = e.target.closest('[data-open-settle]');
      if (openSettleBtn) {
        openCommissionSettleModal(openSettleBtn.getAttribute('data-open-settle'));
        return;
      }

      const confirmBuyerPayBtn = e.target.closest('[data-confirm-buyer-pay]');
      if (confirmBuyerPayBtn) {
        const oid = confirmBuyerPayBtn.getAttribute('data-confirm-buyer-pay');
        const order = state.orders.find((o) => o.id === oid);
        if (order) {
          order.paymentStatus = 'confirmed';
          saveState();
          renderAll();
          showToast(`تم تأكيد استلام فلوس الطلب ${oid}.`, 'success');
        }
        return;
      }

      const rejectBuyerPayBtn = e.target.closest('[data-reject-buyer-pay]');
      if (rejectBuyerPayBtn) {
        const oid = rejectBuyerPayBtn.getAttribute('data-reject-buyer-pay');
        const order = state.orders.find((o) => o.id === oid);
        if (order) {
          order.paymentStatus = 'rejected_receipt';
          saveState();
          renderAll();
          showToast(`تم رفض إيصال المشتري للطلب ${oid}.`);
        }
        return;
      }

      const confirmCommBtn = e.target.closest('[data-confirm-commission]');
      if (confirmCommBtn) {
        const oid = confirmCommBtn.getAttribute('data-confirm-commission');
        const order = state.orders.find((o) => o.id === oid);
        if (order) {
          order.commissionStatus = 'collected';
          saveState();
          renderAll();
          showToast(`تم تأكيد تحصيل عمولة الطلب ${oid}.`, 'success');
        }
        return;
      }

      const rejectCommBtn = e.target.closest('[data-reject-commission]');
      if (rejectCommBtn) {
        const oid = rejectCommBtn.getAttribute('data-reject-commission');
        const order = state.orders.find((o) => o.id === oid);
        if (order) {
          order.commissionStatus = 'rejected_receipt';
          saveState();
          renderAll();
          showToast(`تم رفض إيصال العمولة للطلب ${oid} وإتاحة إعادة الرفع للبائع.`);
        }
        return;
      }

      const toggleUserBtn = e.target.closest('[data-toggle-user]');
      if (toggleUserBtn) {
        const uid = toggleUserBtn.getAttribute('data-toggle-user');
        const user = getUserById(uid);
        if (user) {
          user.status = user.status === 'blocked' ? 'active' : 'blocked';
          saveState();
          renderAll();
          showToast(
            user.status === 'blocked' ? `تم حظر المستخدم ${user.name}.` : `تم فك حظر المستخدم ${user.name}.`
          );
        }
      }
    });

    // Sync across browser tabs
    window.addEventListener('storage', (e) => {
      if (e.key === STORAGE_KEY) {
        state = loadState();
        switchRole(state.activeRole);
      }
    });
  }

  // Initialize
  bindEvents();
  switchRole(state.activeRole || 'buyer');
  showHomePage();
})();
