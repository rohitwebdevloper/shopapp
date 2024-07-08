
async function getallcategory() {
    try {
        let row = "";
        let res = await axios.get('https://fakestoreapi.com/products/categories');
        res.data.forEach((items) => {
            row += `<a class="dropdown-item" href="#">${items}</a>`
        })
        document.getElementById('categories').innerHTML = row;
    } catch (error) {

    }
} getallcategory();

async function homepageproducts() {
    try {
        let row = "";
        let res = await fetch('https://fakestoreapi.com/products');
        let data = await res.json();
        data.slice(0, 9).forEach((items) => {
            row += `<div class='col-md-4 '>
            <div class="card">
                <img class="card-img-top" src=${items.image} alt="Card image">
                <div class="card-body">
                <h4 class="card-title">${items.category}</h4>
                <p class="card-text">Price : ${items.price}</p>
                <button class="btn btn-primary" onclick='single_prouct(${items.id})'>View</button>
                <button class="btn btn-primary" onclick='addtocart(${items.id})'>Add to Cart</button>
                </div>
            </div>
       </div>`
        });
        document.getElementById('result').innerHTML = row;
    } catch (error) {

    }
}
homepageproducts();
//singal_productdata
async function single_prouct(pid) {
    try {
        let res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
        localStorage.setItem('singal-productdata', JSON.stringify(res.data));
        window.location = 'singal-product.html';
    } catch (error) {

    }
}

function getsingleproduct() {
    try {
        let data = localStorage.getItem('singal-productdata');
        if (data != null) {
            details = JSON.parse(data)
        }
        document.getElementById('singlecartbtn').innerHTML = `<button class="btn btn-dark" onclick='addtocart(${details.id})'>Add To Cart</button>`
        document.getElementById('productimage').src = details.image
        document.getElementById('title').innerText = details.title
        document.getElementById('category-name').innerText = details.category
        document.getElementById('desc').innerText = details.description
        document.getElementById('price').innerText = details.price
    } catch (error) {

    }
} getsingleproduct();
//all product
async function products() {
    try {
        let row = "";
        let res = await fetch('https://fakestoreapi.com/products');
        let data = await res.json();
        data.forEach((items) => {
            row += `<div class='col-md-4'>
            <div class="card">
                <img class="card-img-top" src=${items.image} alt="Card image">
                <div class="card-body">
                <h4 class="card-title">${items.category}</h4>
                <p class="card-text">Price : ${items.price}</p>
                <button class="btn btn-primary" onclick='single_prouct(${items.id})'>View</button>
                <a href="#" class="btn btn-primary">Add to Cart</a>
                </div>
            </div>
       </div>`
        });
        document.getElementById('allproduct').innerHTML = row;
    } catch (error) {

    }
}
products();
getallcategory
async function getAllCategory() {
    try {
        let row = "";
        let res = await axios.get('https://fakestoreapi.com/products/categories');
        res.data.forEach((items) => {
            row += `<a class="dropdown-item" onclick='productCategory(this)' href="#">${items}</a>`
        });
        document.getElementById('categories').innerHTML = row;
    } catch (error) {

    }

}
getAllCategory();

// get all product category 
async function productCategory(t) {
    try {
        let categoryName = t.innerText;
        let res = await axios.get(`https://fakestoreapi.com/products/category/${categoryName}`);
        localStorage.setItem("categoryproduct8batch", JSON.stringify(res.data));
        window.location = "category-products.html";
    } catch (error) {

    }

}
// get category products from localstorage 
function getCategoryProductsStorage() {
    try {
        let res = localStorage.getItem('categoryproduct8batch');
        if (res != null) {
            data = JSON.parse(res);
        }
        else {
            data = [];
        }
        let row = "";
        data.forEach((items) => {
            row += `<div class='col-md-4'>
             <div class="card">
                 <img class="card-img-top" src=${items.image} alt="Card image">
                 <div class="card-body">
                 <h4 class="card-title">${items.category}</h4>
                 <p class="card-text">Price : ${items.price}</p>
                 <button class="btn btn-primary" onclick='single_product( ${items.id})'>View</button>
                 <a href="#" class="btn btn-primary">Add to Cart</a>
                 </div>
             </div>
        </div>`
        });
        document.getElementById('catrgoryproducts').innerHTML = row;
    } catch (error) {

    }

}
getCategoryProductsStorage()
// add to card   
async function addtocart(pid) {
    console.log(pid)
    try {
        let res = await axios.get(`https://fakestoreapi.com/products/${pid}`);
        let data = localStorage.getItem('cart8new');
        if (data != null) {
            cartArray = JSON.parse(data);
        }
        else {
            cartArray = [];
        }
        //check items allaready axite to card
        let resultArray = cartArray.filter((items, index) => {
            return items.id == pid;
        });
        if (resultArray.length > 0) {
            alert("Item already exists int the cart");
        }
        else {
            cartArray.push(res.data)
            localStorage.setItem("cart8new", JSON.stringify(cartArray));
            showCart();
            alert("item added into the cart..")

        }
        // cartArray.push(res.data);
        // localStorage.setItem('cart8new', JSON.stringify(cartArray));
        // showCart()
        // //window.location = 'cart.html';
    }
    catch (error) {
    }
}
// show cart data 
function showCart() {
    try {
        let data = localStorage.getItem('cart8new');
        if (data != null) {
            carts = JSON.parse(data);
        }
        let row = "";
        carts.forEach((items) => {
            row += `<tr>
            <td><img src=${items.image} style='width: 80px !important; height: 50px'/></td>
            <td>${items.title}</td>
            <td>${items.price}</td>
         <td><button class="btn btn-danger" onclick="removeItems(${items.id})" >Remove</button></td>
        </tr>`;
        });
        let element = document.querySelectorAll(".count");
        element[0].innerText = carts.length;
        document.getElementById('cartitems').innerHTML = row;
        // document.getElementById('count').innerText = carts.length;

    } catch (error) {

    }
}
showCart();

// remove items
function removeItems(pid) {
    let data = localStorage.getItem("cart8new");
    if (data != null) {
        carts = JSON.parse(data);
    }else{
        carts = [];
    }
    let newData = carts.filter((items, index) => {
        return items.id !== pid;
    });
    console.log(newData)
    localStorage.setItem("cart8new", JSON.stringify(newData));
    showCart();
    total();
}



// total amount
function total() {
    try {
        let data = localStorage.getItem("cart8new");
        if (data != null) {
            carts = JSON.parse(data);
        }
        let totaldata = carts.reduce((current_value, next_value) => {
            return current_value + next_value.price;
        }, 0);
        document.getElementById("totalamount").innerText = totaldata;
    } catch (error) {

    }
}
total();