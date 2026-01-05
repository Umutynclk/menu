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
  "MilkShake": "images/milkshake.jpg",
  "Çay&kahve": "images/kahve.jpg",
  "Mix&Kokteyl": "images/koktyl.jpg",
  "Bitki Çayı": "images/bitki_cayi.jpeg"
};

const categoriesContainer = document.getElementById("categories");
const menuContainer = document.getElementById("menu");
const backBtn = document.getElementById("backBtn");

let menuData = [];

fetch(SHEET_URL)
  .then(res => res.json())
  .then(data => {
    menuData = data;
    showCategories();
  })
  .catch(err => console.error(err));

function showCategories() {
  categoriesContainer.innerHTML = "";
  categoriesContainer.style.display = "grid";
  menuContainer.style.display = "none";

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
  showCategories();
};
