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

function displayCategories() {
  const categoryContainer = document.getElementById("category-container");

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
      productLabel.textContent = `${product.name} - ${product.price}원`;

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
    productItem.textContent = `${product.name} - ${product.price}원`;
    productList.appendChild(productItem);
    totalPrice += product.price;
  });

  const totalPriceProduct = document.createElement("li");
  totalPriceProduct.style.display = "inline-block"; 
  totalPriceProduct.style.border = "1px solid black";
  totalPriceProduct.textContent = `총가격 ${totalPrice} 원`;
  productList.appendChild(totalPriceProduct);

  selectedProductsDiv.appendChild(productList);
}

displayCategories();
checkingProduct();
