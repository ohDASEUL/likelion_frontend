function Product(name, price) {
  this.name = name;
  this.price = price;
}

function Category(name, products) {
  this.name = name;
  this.products = products;
}

let categories = [
  new Category("아우터", [
    new Product("코트", 120000),
    new Product("자켓", 80000),
    new Product("패딩", 150000),
  ]),
  new Category("상의", [
    new Product("니트", 60000),
    new Product("셔츠", 50000),
    new Product("티셔츠", 30000),
  ]),
  new Category("하의", [
    new Product("청바지", 70000),
    new Product("면바지", 50000),
    new Product("스커트", 45000),
  ]),
];

let selectedProducts = [];
let paymentWindow;

function displayCategories() {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = ''; // Clear existing content

  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");

    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category.name;

    const productList = document.createElement("ul");

    category.products.forEach((product) => {
      const productItem = document.createElement("li");

      const productCheckBox = document.createElement("input");
      productCheckBox.type = "checkbox";
      productCheckBox.value = product.name;
      productCheckBox.dataset.price = product.price;

      productCheckBox.addEventListener("change", function () {
        if (this.checked) {
          selectedProducts.push({
            name: this.value,
            price: parseInt(this.dataset.price),
          });
        } else {
          selectedProducts = selectedProducts.filter(
            (product) => product.name !== this.value
          );
        }
        checkingProduct();
      });

      const productLabel = document.createElement("label");
      productLabel.textContent = `${product.name} - ${parseInt(product.price).toLocaleString()}원`;

      productItem.appendChild(productCheckBox);
      productItem.appendChild(productLabel);

      productList.appendChild(productItem);
    });

    categoryDiv.appendChild(categoryTitle);
    categoryDiv.appendChild(productList);
    categoryContainer.appendChild(categoryDiv);
  });
}

function checkingProduct() {
  const selectedProductsDiv = document.getElementById("selected-products");
  selectedProductsDiv.innerHTML = "";

  console.log("현재 선택된 상품: ", selectedProducts);

  if (selectedProducts.length === 0) {
    selectedProductsDiv.textContent = "선택된 상품이 없습니다.";
    return;
  }

  const productList = document.createElement("ul");
  let totalPrice = 0;

  selectedProducts.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.textContent = `${product.name} - ${parseInt(product.price).toLocaleString()}원`;
    productList.appendChild(productItem);
    totalPrice += product.price;
  });

  selectedProductsDiv.appendChild(productList);

  const totalPriceDiv = document.createElement("div");
  totalPriceDiv.id = "total-price";
  totalPriceDiv.textContent = `총가격: ${parseInt(totalPrice).toLocaleString()} 원`;
  selectedProductsDiv.appendChild(totalPriceDiv);
}

const paying = () => {
  if (selectedProducts.length === 0) {
    const selectedProductsDiv = document.getElementById("selected-products");
    selectedProductsDiv.textContent = "선택된 상품이 없습니다.";
    alert("선택된 상품이 없습니다.");
    return;
  } else {
    let totalPrice = selectedProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );

    paymentWindow = window.open(
      `payment.html?totalPrice=${totalPrice}`,
      "_blank",
      "width=800,height=300"
    );

    window.addEventListener('message', function(event) {
      if (event.data === 'paymentComplete') {
        resetSelection();
      }
    });
  }
};

function resetSelection() {
  selectedProducts = [];
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false;
  });
  checkingProduct();
}

displayCategories();
checkingProduct();