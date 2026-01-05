const SHEET_URL = "https://opensheet.elk.sh/1Hrhh7xGwlUL9-Nh_gBPJGVE4ZuLuhC56IQcCpN2kKG8/Sayfa1";

const categoryImages = {
    "Tavuk": "images/TAVUK.jpg",
    "Doyuran Lezzetler": "images/DOYURAN LEZEETLER.jpg",
    "Makarna": "images/MAKARNA.jpg",
    "Hamburger": "images/Hamburger.jpg",
    "Aparatifler": "images/ATIŞTIRMALIK.jpg",
    "Wrap": "images/WRAP.jpg",
    "Tost": "images/Tost.jpg",
    "Soğuk İçecekler": "images/SOĞUK İÇECEKLER.jpeg",
    "Sıcak İçecekler": "images/SICAK İÇECEKLER.jpeg",
    "MilkShake": "images/MİLKSHAKE.jpg",
    "Kahve": "images/KAHVE.jpg",
    "KOKTEYL": "images/KOKTEYL.jpg",
    "Bitki Çayı": "images/BİTKİ ÇAYI.jpeg",
    );
  
const categoriesContainer = document.getElementById("categories");
const menuContainer = document.getElementById("menu");
const backBtn = document.getElementById("backBtn");

let menuData = [];

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    menuData = data;
    showCategories();
  });

function showCategories() {
 <img src="${categoryImages[category] || 'images/default.jpg'}" />
;

  const categoryNames = [...new Set(menuData.map(item => item.kategori))];

  categoryNames.forEach(category => {
    const card = document.createElement("div");
    card.className = "category-card";

    card.innerHTML = `
      <img src="https://source.unsplash.com/600x400/?food,${category}" />
      <div class="overlay">
        <h2>${category}</h2>
      </div>
    `;

    card.onclick = () => showMenu(category);
    categoriesContainer.appendChild(card);
  });
}

function showMenu(category) {
  categoriesContainer.style.display = "none";
  menuContainer.style.display = "block";
  menuContainer.innerHTML = "";

  const title = document.createElement("h2");
  title.textContent = category;
  menuContainer.appendChild(title);

  const items = menuData.filter(item => item.kategori === category);

  items.forEach(item => {
    const div = document.createElement("div");
    div.className = "item";

    div.innerHTML = `
      <span>${item.urun}</span>
      <span class="price">${item.fiyat ? item.fiyat + "₺" : ""}</span>
    `;

    menuContainer.appendChild(div);
  });
}

backBtn.onclick = () => {
  menuContainer.style.display = "none";
  categoriesContainer.style.display = "grid";
};
