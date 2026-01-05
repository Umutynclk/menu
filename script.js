const SHEET_URL = "https://opensheet.elk.sh/1Hrhh7xGwlUL9-Nh_gBPJGVE4ZuLuhC56IQcCpN2kKG8/Sayfa1";

const menuContainer = document.getElementById("menu");

fetch(SHEET_URL)
  .then(response => response.json())
  .then(data => {
    const categories = {};

    data.forEach(row => {
      if (!row.kategori || !row.urun) return;

      if (!categories[row.kategori]) {
        categories[row.kategori] = [];
      }

      categories[row.kategori].push(row);
    });

    for (const category in categories) {
      const categoryDiv = document.createElement("div");
      categoryDiv.className = "category";

      const title = document.createElement("h2");
      title.textContent = category;
      categoryDiv.appendChild(title);

      categories[category].forEach(item => {
        const itemDiv = document.createElement("div");
        itemDiv.className = "item";

        const nameSpan = document.createElement("span");
        nameSpan.textContent = item.urun;

        const priceSpan = document.createElement("span");
        priceSpan.className = "price";
        priceSpan.textContent = item.fiyat ? item.fiyat + "₺" : "";

        itemDiv.appendChild(nameSpan);
        itemDiv.appendChild(priceSpan);

        categoryDiv.appendChild(itemDiv);
      });

      menuContainer.appendChild(categoryDiv);
    }
  })
  .catch(error => {
    menuContainer.innerHTML = "Menü yüklenemedi.";
    console.error(error);
  });
