const PRODUCTS = [
  { id: 1, name: "Khoai tây chiên bơ tỏi", price: 40000, oldPrice: 45000, badge: "NEW", img: "images/khoaitay.jpg", category: "Ăn vặt", sub: "Khoai chiên" },
  { id: 2, name: "Mì trộn xúc xích", price: 35000, oldPrice: 40000, badge: "HOT", img: "images/mytron.jpg", category: "Ăn đêm", sub: "Mì cay" },
  { id: 3, name: "Chân gà sả ớt", price: 30000, oldPrice: 35000, badge: "SALE", img: "images/changasatac.jpg", category: "Ăn vặt", sub: "Gà rán" },
  { id: 4, name: "Chân gà nướng", price: 25000, oldPrice: 30000, badge: "HOT", img: "images/changanuong.jpg", category: "Đồ nướng", sub: "BBQ" },
  { id: 5, name: "Trứng gà nướng tiêu", price: 40000, oldPrice: 45000, badge: "NEW", img: "images/trungganuongtieu.jpg", category: "Đồ nướng", sub: "BBQ" },
  { id: 6, name: "Cánh gà nướng", price: 32000, oldPrice: 38000, badge: "HOT", img: "images/canhganuong.jpg", category: "Đồ nướng", sub: "BBQ" },
  { id: 7, name: "Xúc xích", price: 25000, oldPrice: 30000, badge: "SALE", img: "images/xucxich.jpg", category: "Ăn vặt", sub: "Bim bim" },
  { id: 8, name: "Lạp xưởng nướng đá", price: 45000, oldPrice: 50000, badge: "HOT", img: "images/lapxuongnuongda.jpg", category: "Đồ nướng", sub: "Thịt xiên" },
  { id: 9, name: "Trà sữa truyền thống", price: 28000, oldPrice: 32000, badge: "BEST", img: "images/trasua.jpg", category: "Đồ uống", sub: "Trà sữa" },
  { id: 10, name: "Nước ép cam", price: 34000, oldPrice: 39000, badge: "NEW", img: "images/nuocepcam.jpg", category: "Đồ uống", sub: "Nước ép" },
  { id: 11, name: "Nước ép dâu", price: 22000, oldPrice: 26000, badge: "HOT", img: "images/nuocepdau.jpg", category: "Đồ uống", sub: "Nước ép" },
  { id: 12, name: "Trà sữa kem trứng", price: 18000, oldPrice: 24000, badge: "SALE", img: "images/kemtrung.jpg", category: "Đồ uống", sub: "Trà sữa" },
  { id: 13, name: "Mỳ cay hải sản", price: 42000, oldPrice: 48000, badge: "NEW", img: "images/mycayhaisan.jpg", category: "Ăn đêm", sub: "Mì cay" },
  { id: 14, name: "Mỳ cay bò", price: 36000, oldPrice: 40000, badge: "HOT", img: "images/mycaybo.jpg", category: "Ăn đêm", sub: "Mì cay" },
  { id: 15, name: "Mỳ tương đen", price: 19000, oldPrice: 25000, badge: "BEST", img: "images/mytuongden.jpg", category: "Ăn đêm", sub: "Bún phở" },
  { id: 16, name: "Mỳ bò đài loan", price: 23000, oldPrice: 28000, badge: "SALE", img: "images/mybodailoan.jpg", category: "Ăn đêm", sub: "Bún phở" },
  { id: 17, name: "Kẹo Omai", price: 13000, oldPrice: 18000, badge: "SALE", img: "images/omai.jpg", category: "Ăn vặt", sub: "Bim bim" },
  { id: 18, name: "Snack", price: 10000, oldPrice: 15000, badge: "SALE", img: "images/snack.jpg", category: "Ăn vặt", sub: "Bim bim" },
  { id: 19, name: "Bim Bim Lays", price: 10000, oldPrice: 15000, badge: "SALE", img: "images/lays.jpg", category: "Ăn vặt", sub: "Bim bim" },
  { id: 20, name: "Kẹo dẻo", price: 15000, oldPrice: 25000, badge: "SALE", img: "images/keodeo.jpg", category: "Ăn vặt", sub: "Bim bim" },
  { id: 21, name: "Chocolate", price: 25000, oldPrice: 35000, badge: "SALE", img: "images/chocolate.jpg", category: "Ăn vặt", sub: "Bim bim" },
];


const money = (n) => (Number(n) || 0).toLocaleString("vi-VN") + "đ";
const $ = (sel) => document.querySelector(sel);

function getQuery(name) {
  const url = new URL(window.location.href);
  return url.searchParams.get(name);
}

const CART_KEY = "cart_v1";
function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; }
  catch { return []; }
}
function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
}
function addToCart(productId, qty = 1) {
  const cart = getCart();
  const found = cart.find(i => i.id === productId);
  if (found) found.qty += qty;
  else cart.push({ id: productId, qty });
  saveCart(cart);
}
function removeFromCart(productId) {
  const cart = getCart().filter(i => i.id !== productId);
  saveCart(cart);
}
function setQty(productId, qty) {
  const cart = getCart();
  const found = cart.find(i => i.id === productId);
  if (!found) return;
  found.qty = qty;
  if (found.qty <= 0) removeFromCart(productId);
  else saveCart(cart);
}
function cartCount() {
  return getCart().reduce((s, i) => s + (i.qty || 0), 0);
}
function cartTotal() {
  const cart = getCart();
  return cart.reduce((sum, item) => {
    const p = PRODUCTS.find(x => x.id === item.id);
    return sum + (p ? p.price * item.qty : 0);
  }, 0);
}
function updateCartCount() {
  const el = document.getElementById("cart-count");
  if (el) el.textContent = cartCount();
}


const USERS_KEY = "users_v1";
const CURRENT_KEY = "currentUser_v1";

function getUsers(){
  try { return JSON.parse(localStorage.getItem(USERS_KEY)) || []; } catch { return []; }
}
function saveUsers(users){ localStorage.setItem(USERS_KEY, JSON.stringify(users)); }

function getCurrentUser(){
  try { return JSON.parse(localStorage.getItem(CURRENT_KEY)); } catch { return null; }
}
function setCurrentUser(u){
  if(!u) localStorage.removeItem(CURRENT_KEY);
  else localStorage.setItem(CURRENT_KEY, JSON.stringify(u));
}

function renderAuthLink(){
  const link = document.getElementById("authLink");
  if(!link) return;
  const u = getCurrentUser();
  if(u){
    link.textContent = `Xin chào, ${u.name} (Thoát)`;
    link.href = "#";
    link.onclick = (e) => {
      e.preventDefault();
      setCurrentUser(null);
      renderAuthLink();
      alert("Đã đăng xuất!");
    };
  } else {
    link.textContent = "Đăng nhập";
    link.href = "login.html";
    link.onclick = null;
  }
}

function initMenuToggle() {
  document.querySelectorAll('.category-header.has-sub').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const item = this.parentElement;
      item.classList.toggle('open');
    });
  });
}

const state = {
  q: "",
  category: "ALL",
  sub: "",
  sort: "default",
  priceRange: "ALL",
  page: 1,
  perPage: 8,
};

function applyFilters(list) {
  let out = [...list];

  const q = state.q.trim().toLowerCase();
  if (q) out = out.filter(p => p.name.toLowerCase().includes(q));

  if (state.category !== "ALL") {
    out = out.filter(p => p.category === state.category);
    if (state.sub) out = out.filter(p => p.sub === state.sub);
  }

  if (state.priceRange !== "ALL") {
    const [min, max] = state.priceRange.split("-").map(Number);
    out = out.filter(p => p.price >= min && p.price <= max);
  }

  if (state.sort === "price_asc") out.sort((a,b) => a.price - b.price);
  if (state.sort === "price_desc") out.sort((a,b) => b.price - a.price);
  if (state.sort === "name_asc") out.sort((a,b) => a.name.localeCompare(b.name, "vi"));

  return out;
}

function renderProductsHome() {
  const grid = document.getElementById("productGrid");
  const pagi = document.getElementById("pagination");
  if (!grid || !pagi) return;

  const filtered = applyFilters(PRODUCTS);
  const totalPages = Math.max(1, Math.ceil(filtered.length / state.perPage));
  if (state.page > totalPages) state.page = totalPages;

  const start = (state.page - 1) * state.perPage;
  const pageItems = filtered.slice(start, start + state.perPage);

  grid.innerHTML = pageItems.map(p => `
    <article class="product-card">
      <span class="product-badge">${p.badge || ""}</span>
      <div class="product-img-wrapper">
        <img class="product-img" src="${p.img}" alt="${p.name}">
      </div>
      <h3 class="product-name">${p.name}</h3>
      <div class="product-price">
        <span class="price-main">${money(p.price)}</span>
        <span class="price-old">${p.oldPrice ? money(p.oldPrice) : ""}</span>
      </div>
      <div class="product-actions">
        <a class="btn-outline" href="product-detail.html?id=${p.id}">Xem chi tiết</a>
        <button class="btn-primary" data-add="${p.id}" type="button">Thêm vào giỏ hàng</button>
      </div>
    </article>
  `).join("");

  grid.querySelectorAll("[data-add]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-add"));
      addToCart(id, 1);
      alert("Đã thêm vào giỏ hàng!");
    });
  });

  const buttons = [];
  for (let i = 1; i <= totalPages; i++) {
    buttons.push(`<button class="page-btn ${i===state.page?'active':''}" data-page="${i}" type="button">${i}</button>`);
  }
  pagi.innerHTML = buttons.join("");

  pagi.querySelectorAll("[data-page]").forEach(b => {
    b.addEventListener("click", () => {
      state.page = Number(b.getAttribute("data-page"));
      renderProductsHome();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });
}

function initHomeControls() {
  const searchInput = $("#searchInput");
  const searchBtn = $("#searchBtn");
  const sortSelect = $("#sortSelect");
  const priceFilter = $("#priceFilter");
  const clearFilter = $("#clearFilter");

  if (searchInput && searchBtn) {
    searchBtn.addEventListener("click", () => {
      state.q = searchInput.value;
      state.page = 1;
      renderProductsHome();
    });
    searchInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter") searchBtn.click();
    });
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", () => {
      state.sort = sortSelect.value;
      state.page = 1;
      renderProductsHome();
    });
  }

  if (priceFilter) {
    priceFilter.addEventListener("change", () => {
      state.priceRange = priceFilter.value;
      state.page = 1;
      renderProductsHome();
    });
  }

  document.querySelectorAll(".category-header[data-category]").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".category-item").forEach(li => li.classList.remove("active"));
      btn.parentElement.classList.add("active");

      state.category = btn.getAttribute("data-category");
      state.sub = "";
      state.page = 1;
      renderProductsHome();
    });
  });

  document.querySelectorAll(".subcategory-list li[data-category]").forEach(li => {
    li.addEventListener("click", () => {
      state.category = li.getAttribute("data-category");
      state.sub = li.getAttribute("data-sub") || "";
      state.page = 1;
      renderProductsHome();
    });
  });

  if (clearFilter) {
    clearFilter.addEventListener("click", () => {
      state.q = "";
      state.category = "ALL";
      state.sub = "";
      state.sort = "default";
      state.priceRange = "ALL";
      state.page = 1;

      if (searchInput) searchInput.value = "";
      if (sortSelect) sortSelect.value = "default";
      if (priceFilter) priceFilter.value = "ALL";

      document.querySelectorAll(".category-item").forEach(li => li.classList.remove("active"));
      const first = document.querySelector(".category-item");
      if (first) first.classList.add("active");

      renderProductsHome();
    });
  }
}

function renderCartPage() {
  const box = document.getElementById("cartPage");
  if (!box) return;

  const cart = getCart();
  if (cart.length === 0) {
    box.innerHTML = `<p class="muted">Giỏ hàng đang trống. <a href="doan.html">Quay lại mua sắm</a></p>`;
    return;
  }

  const rows = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return "";
    return `
      <tr>
        <td>
          <div style="display:flex; gap:10px; align-items:center;">
            <img src="${p.img}" alt="${p.name}" style="width:56px;height:56px;object-fit:cover;border-radius:6px;border:1px solid #f0f0f0;">
            <div>
              <div style="font-weight:bold">${p.name}</div>
              <div class="muted">${p.category} • ${p.sub}</div>
            </div>
          </div>
        </td>
        <td>${money(p.price)}</td>
        <td>
          <div class="qty">
            <button class="btn-outline" data-dec="${p.id}" type="button">-</button>
            <input type="number" min="1" value="${item.qty}" data-qty="${p.id}">
            <button class="btn-outline" data-inc="${p.id}" type="button">+</button>
          </div>
        </td>
        <td>${money(p.price * item.qty)}</td>
        <td><button class="btn-outline" data-remove="${p.id}" type="button">Xóa</button></td>
      </tr>
    `;
  }).join("");

  box.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Sản phẩm</th>
          <th>Đơn giá</th>
          <th>Số lượng</th>
          <th>Thành tiền</th>
          <th></th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
    </table>

    <div class="total-box">Tổng: ${money(cartTotal())}</div>

    <div class="cart-actions">
      <a class="btn-outline" href="doan.html">← Tiếp tục mua</a>
      <a class="btn-primary" href="checkout.html">Thanh toán</a>
    </div>
  `;

  box.querySelectorAll("[data-inc]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-inc"));
      const current = getCart().find(i => i.id === id)?.qty || 1;
      setQty(id, current + 1);
      renderCartPage();
    });
  });

  box.querySelectorAll("[data-dec]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-dec"));
      const current = getCart().find(i => i.id === id)?.qty || 1;
      setQty(id, current - 1);
      renderCartPage();
    });
  });

  box.querySelectorAll("[data-qty]").forEach(inp => {
    inp.addEventListener("change", () => {
      const id = Number(inp.getAttribute("data-qty"));
      const v = Number(inp.value || 1);
      setQty(id, v);
      renderCartPage();
    });
  });

  box.querySelectorAll("[data-remove]").forEach(btn => {
    btn.addEventListener("click", () => {
      const id = Number(btn.getAttribute("data-remove"));
      removeFromCart(id);
      renderCartPage();
    });
  });
}

function renderDetailPage() {
  const root = document.getElementById("detailPage");
  if (!root) return;

  const id = Number(getQuery("id"));
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) {
    root.innerHTML = `<p class="muted">Không tìm thấy sản phẩm. <a href="doan.html">Về trang chủ</a></p>`;
    return;
  }

  root.innerHTML = `
    <div class="detail">
      <div>
        <img class="detail-img" src="${p.img}" alt="${p.name}">
      </div>
      <div>
        <div class="badge">${p.badge || "SP"}</div>
        <h2>${p.name}</h2>
        <p class="muted">Danh mục: <b>${p.category}</b> • <b>${p.sub}</b></p>
        <div style="margin:10px 0;">
          <span class="price-main" style="font-size:18px;">${money(p.price)}</span>
          <span class="price-old">${p.oldPrice ? money(p.oldPrice) : ""}</span>
        </div>

        <div class="qty" style="margin:10px 0;">
          <span class="muted">Số lượng:</span>
          <input id="detailQty" type="number" min="1" value="1">
        </div>

        <div style="display:flex; gap:10px; flex-wrap:wrap;">
          <button class="btn-primary" id="detailAdd" type="button">Thêm vào giỏ</button>
          <a class="btn-outline" href="cart.html">Xem giỏ hàng</a>
          <a class="btn-outline" href="doan.html">← Quay lại</a>
        </div>

        <hr style="margin:14px 0;border:none;border-top:1px solid #f0f0f0;">
        <p class="muted">
          Mô tả: hình ảnh chỉ mang tính chất minh hoạ. Sản phẩm thực tế có thể khác biệt về màu sắc và kích thước do điều kiện ánh sáng và đo lường khi chụp ảnh và sản suất. Mong các bạn thông cảm!
        </p>
      </div>
    </div>
  `;

  $("#detailAdd").addEventListener("click", () => {
    const qty = Math.max(1, Number($("#detailQty").value || 1));
    addToCart(p.id, qty);
    alert("Đã thêm vào giỏ hàng!");
  });
}

function renderCheckoutPage() {
  const box = document.getElementById("checkoutPage");
  if (!box) return;

  const cart = getCart();
  if (cart.length === 0) {
    box.innerHTML = `<p class="muted">Chưa có sản phẩm để thanh toán. <a href="doan.html">Mua hàng</a></p>`;
    return;
  }

  const itemsHtml = cart.map(item => {
    const p = PRODUCTS.find(x => x.id === item.id);
    if (!p) return "";
    return `<li>${p.name} × ${item.qty} — <b>${money(p.price * item.qty)}</b></li>`;
  }).join("");

  const user = getCurrentUser();

  box.innerHTML = `
    <h2 style="margin-bottom:10px;">Thanh toán</h2>
    <p class="muted">Tổng: <b>${money(cartTotal())}</b></p>
    <ul style="margin:10px 0 14px 18px;">${itemsHtml}</ul>

    <form class="form" id="checkoutForm">
      <div class="form-row">
        <label>Họ tên</label>
        <input name="name" required value="${user?.name || ""}" placeholder="Nhập họ tên">
      </div>
      <div class="form-row">
        <label>Số điện thoại</label>
        <input name="phone" required placeholder="VD: 09xx..." />
      </div>
      <div class="form-row">
        <label>Địa chỉ</label>
        <input name="address" required placeholder="Nhập địa chỉ giao hàng" />
      </div>
      <div class="form-row">
        <label>Phương thức thanh toán</label>
        <select name="payment" required>
          <option value="COD">COD (nhận hàng trả tiền)</option>
          <option value="BANK">Chuyển khoản</option>
        </select>
      </div>
      <div class="form-row">
        <label>Ghi chú</label>
        <textarea name="note" placeholder="Ghi chú thêm (không bắt buộc)"></textarea>
      </div>

      <div class="form-actions">
        <a class="btn-outline" href="cart.html">← Quay lại giỏ</a>
        <button class="btn-primary" type="submit">Đặt hàng</button>
      </div>
    </form>
  `;

 $("#checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const order = {
      id: "OD" + Date.now(),
      name: fd.get("name"),
      phone: fd.get("phone"),
      address: fd.get("address"),
      payment: fd.get("payment"),
      note: fd.get("note") || "",
      total: cartTotal(),
      items: getCart(),
      createdAt: new Date().toISOString(),
    };

    localStorage.setItem("last_order_v1", JSON.stringify(order));
    localStorage.removeItem(CART_KEY);
    updateCartCount();

    alert("Đặt hàng thành công! Mã đơn: " + order.id);
    window.location.href = "doan.html";
  });
}

function initRegisterPage(){
  const form = document.getElementById("registerForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const name = String(fd.get("name") || "").trim();
    const email = String(fd.get("email") || "").trim().toLowerCase();
    const pass = String(fd.get("pass") || "").trim();

    if(!name || !email || !pass) return alert("Vui lòng nhập đủ thông tin!");

    const users = getUsers();
    if(users.some(u => u.email === email)) return alert("Email đã tồn tại!");

    const newUser = { id: Date.now(), name, email, pass };
    users.push(newUser);
    saveUsers(users);

    alert("Đăng ký thành công! Hãy đăng nhập.");
    window.location.href = "login.html";
  });
}

function initLoginPage(){
  const form = document.getElementById("loginForm");
  if(!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const fd = new FormData(form);
    const email = String(fd.get("email") || "").trim().toLowerCase();
    const pass = String(fd.get("pass") || "").trim();

    const users = getUsers();
    const u = users.find(x => x.email === email && x.pass === pass);
    if(!u) return alert("Sai email hoặc mật khẩu!");

    setCurrentUser({ id: u.id, name: u.name, email: u.email });
    alert("Đăng nhập thành công!");
    window.location.href = "doan.html";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  updateCartCount();
  renderAuthLink();
  initMenuToggle();
  initHomeControls();
  renderProductsHome();
  renderCartPage();
  renderDetailPage();
  renderCheckoutPage();
  initLoginPage();
  initRegisterPage();
});

/* =========================
   DOAN.JS - FULL EFFECTS
   ========================= */

// ---- Helpers ----
  const qs = (s, root = document) => root.querySelector(s);
  const qsa = (s, root = document) => [...root.querySelectorAll(s)];

// ---- Active nav highlight ----
(function activeNav(){
  const path = location.pathname.split("/").pop() || "index.html";
  const links = $$('a[data-nav]');
  links.forEach(a => {
    const href = (a.getAttribute("href") || "").split("/").pop();
    if (href === path) a.classList.add("is-active");
  });
})();

// ---- Sticky header shadow on scroll ----
(function headerShadow(){
  const header = $(".header");
  if (!header) return;
  const onScroll = () => {
    header.classList.toggle("is-shadow", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
})();

// ---- Mobile menu toggle ----
(function mobileMenu(){
  const btn = $("[data-menu-btn]");
  const nav = $("[data-mobile-nav]");
  if (!btn || !nav) return;

  btn.addEventListener("click", () => nav.classList.toggle("is-open"));

  // Close when clicking a link
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (a) nav.classList.remove("is-open");
  });
})();

// ---- Reveal on scroll ----
(function reveal(){
  const els = $$(".reveal");
  if (!els.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add("is-show");
    });
  }, { threshold: 0.15 });

  els.forEach(el => io.observe(el));
})();

// ---- Back to top button ----
(function backToTop(){
  const btn = $(".to-top");
  if (!btn) return;

  const onScroll = () => btn.classList.toggle("is-show", window.scrollY > 400);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  btn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
})();

// ---- Simple Slider auto (optional) ----
// Markup required:
// <div class="slider" data-slider>
//   <div class="slide is-active">...</div>
//   <div class="slide">...</div>
//   <div class="slider__dots"></div>
// </div>
(function slider(){
  const root = $("[data-slider]");
  if (!root) return;

  const slides = $$(".slide", root);
  if (slides.length <= 1) return;

  const dotsWrap = $(".slider__dots", root);
  if (dotsWrap) dotsWrap.innerHTML = "";

  let idx = slides.findIndex(s => s.classList.contains("is-active"));
  if (idx < 0) idx = 0;

  const set = (i) => {
    slides.forEach((s,k) => s.classList.toggle("is-active", k === i));
    const dots = $$(".dot", root);
    dots.forEach((d,k) => d.classList.toggle("is-active", k === i));
    idx = i;
  };

  // build dots
  if (dotsWrap){
    slides.forEach((_,i) => {
      const b = document.createElement("button");
      b.className = "dot" + (i === idx ? " is-active" : "");
      b.type = "button";
      b.addEventListener("click", () => set(i));
      dotsWrap.appendChild(b);
    });
  }

  set(idx);

  let timer = setInterval(() => set((idx + 1) % slides.length), 3500);

  // pause on hover
  root.addEventListener("mouseenter", () => clearInterval(timer));
  root.addEventListener("mouseleave", () => {
    clearInterval(timer);
    timer = setInterval(() => set((idx + 1) % slides.length), 3500);
  });
})();

// ---- Cart count using localStorage (works for all pages) ----
// Save cart as array: [{id, qty}, ...]
(function cartCount(){
  const badge = $("#cartCount");
  if (!badge) return;

  const readCart = () => {
    try { return JSON.parse(localStorage.getItem("cart") || "[]"); }
    catch { return []; }
  };

  const calc = () => readCart().reduce((sum, it) => sum + (Number(it.qty) || 0), 0);

  const render = () => {
    const n = calc();
    badge.textContent = String(n);
    badge.classList.toggle("hidden", n <= 0);
  };

  render();

  // allow other pages to call: window.updateCartCount()
  window.updateCartCount = render;

  // sync across tabs
  window.addEventListener("storage", (e) => {
    if (e.key === "cart") render();
  });
})();
