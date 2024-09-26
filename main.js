function Product(name, price) {
    this.name = name;
    this.price = price;
}

function Category(name, products) {
    this.name = name;
    this.products = products;
}

let categories = [
    new Category('아우터', [
        new Product('코트', 120000),
        new Product('자켓', 80000),
        new Product('패딩', 150000)
    ]),
    new Category('상의', [
        new Product('니트', 60000),
        new Product('셔츠', 50000),
        new Product('티셔츠', 30000)
    ]),
    new Category('하의', [
        new Product('청바지', 70000),
        new Product('면바지', 50000),
        new Product('스커트', 45000)
    ])
];