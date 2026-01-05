const SHEET_URL = "https://opensheet.elk.sh/1Hrhh7xGwlUL9-Nh_gBPJGVE4ZuLuhC56IQcCpN2kKG8/Sayfa1";

const categoryImages = {
  "Tavuk": "images/tavuk.jpg",
  "Doyuran Lezzetler": "images/doyuran_lezzetler.jpg",
  "Makarna": "images/makarna.jpg",
  "Hamburger": "images/hamburger.jpg",
  "Aparatifler": "images/aparatifler.jpg",
  "Wrap": "images/wrap.jpg",
  "Tost": "images/tost.jpg",
  "Soğuk İçecekler": "images/soguk_icecekler.jpg",
  "Sıcak İçecekler": "images/sicak_icecekler.jpeg",
  "Serinleten Lezzetler": "images/milkshake.jpg",
  "Çay&Kahve": "images/kahve.jpg",
  "Mix&Kokteyl": "images/koktyl.jpg",
  "Bitki Çayı": "images/bitki_cayi.jpeg"
};

const categoriesContainer = document.getElementById("categories");
const menuContainer = document.getElementById("menu");
const backBtn = document.getElementById("backBtn");

let menuData = [];

// Verileri çek
fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    menuData = data;
    showCategories();
  })
  .catch(err => console.error(err));

// Kategorileri göster
function showCategories() {
  backBtn.style.display = "none";

  menuContainer.classList.remove("slide-in");
  menuContainer.style.display = "none";

  categoriesContainer.innerHTML = "";
  categoriesContainer.style.display = "grid";
  categoriesContainer.classList.add("fade-in");

  const categoryNames = [...new Set(menuData.map(item => item.kategori))];

  categoryNames.forEach(category => {
    const card = document.createElement("div");
    card.className = "category-card";

    const imgSrc = categoryImages[category] || "images/default.jpg";

    card.innerHTML = `
      <img src="${imgSrc}" alt="${category}">
      <div class="overlay">
        <h2>${category}</h2>
      </div>
    `;

    card.onclick = () => showMenu(category);
    categoriesContainer.appendChild(card);
  });
}

// Menü gösterme fonksiyonu
function showMenu(category) {
  backBtn.style.display = "inline-block";

  categoriesContainer.classList.remove("fade-in");
  categoriesContainer.style.display = "none";

  menuContainer.innerHTML = "";
  menuContainer.style.display = "block";
  menuContainer.classList.add("slide-in");

  const title = document.createElement("h2");
  title.textContent = category;
  title.className = "menu-title";
  menuContainer.appendChild(title);

  const items = menuData.filter(item => item.kategori === category);

  items.forEach(item => {
    // Ürünleri ve fiyatları ayır (\n ile)
    const urunler = item.urun.split('\n').map(u => u.trim()).filter(u => u);
    const fiyatlar = item.fiyat ? item.fiyat.split('\n').map(f => f.trim()) : [];

    urunler.forEach((urunAdi, index) => {
      const fiyat = fiyatlar[index] || "";
      const div = document.createElement("div");
      div.className = "menu-item";

      div.innerHTML = `
        <div class="menu-item-left">
          <span class="menu-item-name">${urunAdi}</span>
        </div>
        <div class="menu-item-right">
          ${fiyat ? `<span class="menu-item-price">${fiyat}₺</span>` : ""}
        </div>
      `;

      menuContainer.appendChild(div);
    });
  });
}

// Geri butonu
backBtn.onclick = () => {
  showCategories();
};
