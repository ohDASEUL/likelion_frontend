"use strict"

// 상품을 나타내는 생성자 함수. 이름과 가격을 입력 받음
function Product(name, price) {
  this.name = name;
  this.price = price;
}

// 카테고리를 나타내는 생성자 함수. 카테고리 이름과 상품 배열을 입력 받음.
function Category(name, products) {
  this.name = name; 
  this.products = products; 
}

// 카테고리 목록 각 카테고리는 이름과 해당하는 상품 배열을 가지고 있음.
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

// 사용자가 선택한 상품을 담을 배열
let selectedProducts = [];
// 결제 창을 열 때 사용할 변수
let paymentWindow;

// 카테고리와 상품을 화면에 표시하는 함수
function displayCategories() {
  const categoryContainer = document.getElementById("category-container");
  categoryContainer.innerHTML = ''; // 기존 내용 지우기

  // 각 카테고리를 순회하며 화면에 카테고리와 상품 목록을 추가
  categories.forEach((category) => {
    const categoryDiv = document.createElement("div");

    const categoryTitle = document.createElement("h3");
    categoryTitle.textContent = category.name;

    const productList = document.createElement("ul");

    // 각 상품을 순회하며 상품을 화면에 추가
    category.products.forEach((product) => {
      const productItem = document.createElement("li");

      const productCheckBox = document.createElement("input");
      productCheckBox.type = "checkbox";
      productCheckBox.value = product.name; // 상품 이름
      productCheckBox.dataset.price = product.price; // 상품 가격 (데이터셋을 이용해 가격 저장)

      // 체크박스가 변경될 때마다 선택된 상품을 업데이트
      productCheckBox.addEventListener("change", function () {
        if (this.checked) {
          // 체크박스가 체크되면 선택된 상품 배열에 추가
          selectedProducts.push({
            name: this.value,
            price: parseInt(this.dataset.price),
          });
        } else {
          // 체크박스가 해제되면 선택된 상품 배열에서 제거
          selectedProducts = selectedProducts.filter(
            (product) => product.name !== this.value
          );
        }
        checkingProduct(); // 선택된 상품 목록을 업데이트하는 함수 호출
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

// 선택된 상품을 화면에 표시하는 함수
function checkingProduct() {
  const selectedProductsDiv = document.getElementById("selected-products");
  selectedProductsDiv.innerHTML = "";

  console.log("현재 선택된 상품: ", selectedProducts); // 디버깅용 콘솔 출력

  if (selectedProducts.length === 0) {
    selectedProductsDiv.textContent = "선택된 상품이 없습니다."; // 선택된 상품이 없을 때 표시
    return;
  }

  const productList = document.createElement("ul");
  let totalPrice = 0;

  // 선택된 각 상품을 화면에 추가하고 총 가격을 계산
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

// 결제 버튼을 눌렀을 때 호출되는 함수
const paying = () => {
  if (selectedProducts.length === 0) {
    const selectedProductsDiv = document.getElementById("selected-products");
    selectedProductsDiv.textContent = "선택된 상품이 없습니다."; // 선택된 상품이 없을 때 경고 메시지
    alert("선택된 상품이 없습니다.");
    return;
  } else {
    // 선택된 상품의 총 가격을 계산
    let totalPrice = selectedProducts.reduce(
      (sum, product) => sum + product.price,
      0
    );

    // 결제 페이지에 총 가격을 쿼리로 전달
    paymentWindow = window.open(
      `payment.html?totalPrice=${totalPrice}`,
      "_blank",
      "width=800,height=300"
    );

    // 결제가 완료되면 선택한 상품을 초기화
    window.addEventListener('message', function(event) {
      if (event.data === 'paymentComplete') {
        resetSelection(); // 선택 초기화 함수 호출
      }
    });
  }
};

// 선택을 초기화하는 함수
function resetSelection() {
  selectedProducts = []; // 선택된 상품 배열을 초기화
  const checkboxes = document.querySelectorAll('input[type="checkbox"]');
  checkboxes.forEach(checkbox => {
    checkbox.checked = false; // 모든 체크박스를 해제
  });
  checkingProduct(); // 선택된 상품 목록을 업데이트
}

// 페이지 로드 시 카테고리와 상품을 표시하고 초기 상품 목록을 확인
displayCategories();
checkingProduct();