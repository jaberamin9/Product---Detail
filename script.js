const openModalButton = document.getElementById('openModal');
const closeModalButton = document.getElementById('closeModal');
const modal = document.getElementById('modal');
const addToCart = document.getElementById("add-to-cart");
const addToCartMob = document.getElementById("add-to-cart-mob");
const decrementBtn = document.getElementById("decrement-btn");
const decrementBtnMob = document.getElementById("decrement-btn-mob");
const incrementBtn = document.getElementById("increment-btn");
const incrementBtnMob = document.getElementById("increment-btn-mob");
const itemCount = document.getElementById("item-count");
const itemCountMob = document.getElementById("item-count-mob");
const totalItem = document.getElementById("total-item");
const tbody = document.querySelector("tbody");
const totalItemQnt = document.getElementById("total-item-qnt");
const totalItemPrice = document.getElementsByClassName("item-totla-price-mob");

const baseURL = "https://raw.githubusercontent.com/jaberamin9/Product---Detail/refs/heads/main";

let storeData = {};
let colorData = { value: "purple", colorCode: "#816BFF", imgUrl: "/assets/purple.jpg" };
let priceData = { value: "S", price: 69 };
let quantity = 1;

const prices = [
    { value: "S", price: 69 },
    { value: "M", price: 79 },
    { value: "L", price: 89 },
    { value: "XL", price: 99 },
];
const colors = [
    { value: "purple", colorCode: "#816BFF" },
    { value: "cyan", colorCode: "#1FCEC9" },
    { value: "blue", colorCode: "#4B97D3" },
    { value: "black", colorCode: "#3B4747" },
];

openModalButton.addEventListener('click', () => {
    modal.style.display = 'flex';
    tbody.innerHTML = '';
    if (window.innerWidth <= 650) {
        showAllItemInModalMob();
    } else {
        showAllItemInModal();
    }
});

closeModalButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

const colorSelector = () => {
    const radioGroupContainer = document.getElementById("radio-group-container");

    colors.forEach((color, idx) => {
        const label = document.createElement("label");

        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "color";
        radio.value = color.value;
        idx == 0 ? radio.checked = true : '';

        const customRadio = document.createElement("span");
        customRadio.className = "custom-radio";
        customRadio.style.setProperty("--color", color.colorCode);

        label.appendChild(radio);
        label.appendChild(customRadio);

        radioGroupContainer.appendChild(label);
    });

    radioGroupContainer.addEventListener("change", (event) => {
        if (event.target.name === "color") {
            const selectedColor = event.target.value;
            const mainImage = document.getElementById("main-image");
            mainImage.src = `${baseURL}/assets/${selectedColor}.jpg`;
            colorData.value = selectedColor;
            colorData.imgUrl = `${baseURL}/assets/${selectedColor}.jpg`;
        }
    });
}


const sizeSelector = () => {
    const buttonGroupContainer = document.getElementById("button-group-container");

    prices.forEach((price, idx) => {
        const button = document.createElement("button");
        button.className = `size-selector ${idx == 0 ? "active-size-selector" : ''}`;

        const span = document.createElement("span");
        span.textContent = price.value;
        button.appendChild(span);

        const priceText = document.createTextNode(` $${price.price}`);
        button.appendChild(priceText);

        button.addEventListener("click", (event) => {
            document.querySelectorAll(".size-selector").forEach((btn) => {
                btn.classList.remove("active-size-selector");
            });
            event.currentTarget.classList.add("active-size-selector");
            priceData.value = price.value;
            priceData.price = price.price;
        });

        buttonGroupContainer.appendChild(button);
    });
}

const decrementBtnFun = (event) => {
    if (quantity <= 1) return;
    quantity -= 1;
    itemCount.value = quantity;
    itemCountMob.value = quantity;
}
decrementBtn.addEventListener("click", (event) => {
    decrementBtnFun();
});
decrementBtnMob.addEventListener("click", (event) => {
    decrementBtnFun();
});

const incrementBtnFun = (event) => {
    if (quantity >= 100) return;
    quantity += 1;
    itemCount.value = quantity;
    itemCountMob.value = quantity;
}
incrementBtn.addEventListener("click", (event) => {
    incrementBtnFun();
});
incrementBtnMob.addEventListener("click", (event) => {
    incrementBtnFun();
});

const itemCountFun = (event) => {
    const val = Number(event.target.value);
    if (val <= 1) {
        quantity = 1;
        itemCount.value = 1;
        itemCountMob.value = 1;
        return;
    }
    if (val >= 100) {
        quantity = 100;
        itemCount.value = 100;
        itemCountMob.value = 100;
        return;
    }
    quantity = val;
}
itemCount.addEventListener("change", (event) => {
    itemCountFun(event);
});
itemCountMob.addEventListener("change", (event) => {
    itemCountFun(event);
});

const addToCartFun = () => {
    if (!priceData.value) { console.error("No size selected."); return };
    if (!colorData.value) { console.error("No color selected."); return }
    if (quantity == 0) { console.error("Add 1 item."); return }

    const key = `${priceData.value}_${colorData.value}`;
    if (!storeData[key]) {
        storeData[key] = {
            price: priceData.price,
            colorName: colorData.value,
            imgUrl: colorData.imgUrl,
            quantity: 0,
        };
    }
    storeData[key].colorName = colorData.value;
    storeData[key].imgUrl = colorData.imgUrl;
    storeData[key].quantity = quantity;
    totalItem.textContent = Object.keys(storeData).length;
}

addToCart.addEventListener("click", (event) => {
    addToCartFun();
});
addToCartMob.addEventListener("click", (event) => {
    addToCartFun();
});


const showAllItemInModal = () => {
    let totalQuantity = 0;
    let totalPrice = 0.0;

    const tr1 = document.createElement("tr");
    tr1.style.position = "sticky";
    tr1.style.top = 0;
    tr1.style.backgroundColor = "white";

    const tdItem1 = document.createElement("td");
    tdItem1.textContent = "Item";
    tdItem1.className = "th";
    tr1.appendChild(tdItem1);

    const tdColor1 = document.createElement("td");
    tdColor1.textContent = "Color";
    tdColor1.className = "th";
    tr1.appendChild(tdColor1);

    const tdSize1 = document.createElement("td");
    tdSize1.textContent = "Size";
    tdSize1.className = "th";
    tr1.appendChild(tdSize1);

    const tdQuantity1 = document.createElement("td");
    tdQuantity1.textContent = "Qnt";
    tdQuantity1.className = "th";
    tr1.appendChild(tdQuantity1);

    const tdPrice1 = document.createElement("td");
    tdPrice1.textContent = "Price";
    tdPrice1.className = "th";
    tr1.appendChild(tdPrice1);

    tbody.appendChild(tr1);

    Object.entries(storeData).forEach(([key, value]) => {
        totalQuantity += value.quantity;
        totalPrice += (value.quantity * value.price);

        const tr = document.createElement("tr");

        const tdItem = document.createElement("td");
        const divItem = document.createElement("div");
        divItem.className = "item";

        const img = document.createElement("img");
        img.src = value.imgUrl;
        img.alt = key;

        const span = document.createElement("span");
        span.textContent = "Classy Modern Smart Watch";

        divItem.appendChild(img);
        divItem.appendChild(span);
        tdItem.appendChild(divItem);
        tr.appendChild(tdItem);

        const tdColor = document.createElement("td");
        tdColor.className = "color";
        tdColor.textContent = value.colorName.charAt(0).toUpperCase() + value.colorName.slice(1);
        tr.appendChild(tdColor);

        const tdSize = document.createElement("td");
        const strong = document.createElement("strong");
        strong.textContent = key.split("_")[0];
        tdSize.appendChild(strong);
        tr.appendChild(tdSize);

        const tdQuantity = document.createElement("td");
        tdQuantity.textContent = value.quantity;
        tr.appendChild(tdQuantity);

        const tdPrice = document.createElement("td");
        tdPrice.textContent = `$${value.price}`;
        tr.appendChild(tdPrice);

        tbody.appendChild(tr);
    });
    const tr = document.createElement("tr");
    tr.style.position = "sticky";
    tr.style.bottom = 0;

    const tdItem = document.createElement("td");
    tdItem.textContent = "Total";
    tdItem.className = "total";
    tr.appendChild(tdItem);

    const tdColor = document.createElement("td");
    tdColor.className = "no-style";
    tr.appendChild(tdColor);

    const tdSize = document.createElement("td");
    tdSize.className = "no-style";
    tr.appendChild(tdSize);

    const tdQuantity = document.createElement("td");
    tdQuantity.className = "total-qun";
    tdQuantity.textContent = totalQuantity;
    tr.appendChild(tdQuantity);

    const tdPrice = document.createElement("td");
    tdPrice.className = "total-price";
    tdPrice.textContent = `$${totalPrice}`;
    tr.appendChild(tdPrice);

    tbody.appendChild(tr);
}

const showAllItemInModalMob = () => {
    let totalQuantity = 0;
    let totalPrice = 0.0;

    Object.entries(storeData).forEach(([key, value]) => {
        totalQuantity += value.quantity;
        totalPrice += (value.quantity * value.price);

        const itemRowMob = document.createElement('div');
        itemRowMob.className = 'item-row-mob';
        itemRowMob.style.marginBottom = "10px"

        const itemLeftMob = document.createElement('div');
        itemLeftMob.className = 'item-left-mob';

        const img = document.createElement('img');
        img.src = value.imgUrl;
        img.alt = key;

        const itemInfoMob = document.createElement('div');
        itemInfoMob.className = 'item-info-mob';

        const itemDescriptionMob = document.createElement('p');
        itemDescriptionMob.className = 'item-description-mob';
        itemDescriptionMob.textContent = 'Classy Modern Smart Watch';

        const itemExtraInfoMob = document.createElement('p');
        itemExtraInfoMob.className = 'item-extra-info-mob';
        itemExtraInfoMob.innerHTML = `Color: <span class="item-extra-info-text-mob">${value.colorName.charAt(0).toUpperCase() + value.colorName.slice(1)}</span> - Size: <span class="item-extra-info-text-mob">${key.split("_")[0]}</span>`;

        itemInfoMob.appendChild(itemDescriptionMob);
        itemInfoMob.appendChild(itemExtraInfoMob);

        itemLeftMob.appendChild(img);
        itemLeftMob.appendChild(itemInfoMob);

        const itemRightMob = document.createElement('div');
        itemRightMob.className = 'item-right-mob';

        const itemQuantity = document.createElement('p');
        itemQuantity.className = 'item-extra-info-mob item-extra-info-mob-end';
        itemQuantity.innerHTML = `Qnt: <span class="item-extra-info-text-mob">${value.quantity}</span>`;

        const itemPrice = document.createElement('p');
        itemPrice.className = 'item-price-mob';
        itemPrice.textContent = `$${value.price}`;

        itemRightMob.appendChild(itemQuantity);
        itemRightMob.appendChild(itemPrice);

        itemRowMob.appendChild(itemLeftMob);
        itemRowMob.appendChild(itemRightMob);

        tbody.appendChild(itemRowMob);
    });

    totalItemQnt.textContent = totalQuantity;
    totalItemPrice[0].textContent = totalPrice;
}

sizeSelector();
colorSelector();
