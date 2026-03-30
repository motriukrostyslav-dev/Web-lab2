let cars = [{name:"Audi A3", years: "2023", fuel:"Petrol", Gearbox: "Automatic", Mileage: "35000", price: 23500, image: "images/audi-a3.jpg"},
    {name:"Audi A4", years: "2021", fuel:"Disel", Gearbox: "Automatic", Mileage: "48000", price: 27900, image: "images/audi-a4.jpg"},
    {name:"Audi A6", years: "2020", fuel:"Petrol", Gearbox: "Automatic", Mileage: "62000", price: 34000, image: "images/audi-a6.jpg"},
    {name:"Audi Q5", years: "2023", fuel:"Hybrid", Gearbox: "Automatic", Mileage: "12000", price: 45000, image: "images/audi-q5.jpg"},
    {name:"Audi Q7", years: "2019", fuel:"Disel", Gearbox: "Automatic", Mileage: "85000", price: 38500, image: "images/audi-q7.jpg"},
    {name:"Audi e-tron", years: "2022", fuel:"Electro", Gearbox: "Automatic", Mileage: "20000", price: 56000, image: "images/audi-etron.jpg"},
    {name:"Audi RS6", years: "2021", fuel:"Petrol", Gearbox: "Automatic", Mileage: "28000", price: 89000, image: "images/audi-rs6.jpg"}];

    let searchElement = document.getElementById("search");
    let filterElement = document.getElementById("filter-fuel");
    let sortingElement = document.getElementById("sorting");
    let minPriceElement = document.getElementById("min-price");
    let maxPriceElement = document.getElementById("max-price");

    let visibleCount = 3;
    let cart = [];

    function displaydata(){
       
        let carsContainer = document.getElementById("cars");

        let searchQuery = searchElement.value.trim().toLowerCase();

        let filtered = cars.filter(b => b.years.toLowerCase().includes(searchQuery) || 
            b.name.toLowerCase().includes(searchQuery));

        let filtredQuery = filterElement.value.toLowerCase();

        if(filtredQuery != "all"){
            filtered = filtered.filter(b => b.fuel.toLowerCase() === filtredQuery);
        }

        let min = Number(minPriceElement.value) || 0;
        let max = Number(maxPriceElement.value) || Infinity;

        filtered = filtered.filter(b => b.price >= min && b.price <=max);

        let sortElementValue = sortingElement.value;

        if(sortElementValue === "asc"){
            filtered = filtered.sort((a,b) => a.price - b.price);
        }

        if(sortElementValue === "desc"){
            filtered = filtered.sort((a,b) => b.price - a.price);
        }

        if(sortElementValue === "name"){
            filtered = filtered.sort((a,b) => a.name.localeCompare(b.name));
        }


        carsContainer.innerHTML = "";

        filtered.slice(0, visibleCount).forEach(b =>{ 
            let newElement = document.createElement("article");
            newElement.className = "car";

            let name = document.createElement("h2");
            name.innerText = b.name;

            let image = document.createElement("img");
            image.src = b.image;

            let details = document.createElement("div");
            details.style.display = "none";

            details.innerHTML = `
                <p>${b.years}</p>
                <p>${b.fuel}</p>
                <p>${b.Gearbox}</p>
                <p>${b.Mileage}</p>
                <p>${b.price.toLocaleString()} $</p>
            `;

            let toggle = document.createElement("button");
            toggle.innerText = "Детальніше";

            toggle.onclick = () => {
                details.style.display = 
                    details.style.display === "none" ? "block" : "none";
            };

            let addbtn = document.createElement("button");
            addbtn.innerText = "В кошик";

            addbtn.onclick = () =>{
                cart.push(b.name);
                let cartBox = document.getElementById("cartBox");

                cartBox.innerHTML = "<h4>Кошик:</h4>";

                cart.forEach(item => {
                    let p = document.createElement("p");
                    p.innerText = item;
                    cartBox.appendChild(p);
                });
            };
            
            newElement.appendChild(name);
            newElement.appendChild(image);
            newElement.appendChild(addbtn);
            newElement.appendChild(toggle);
            newElement.appendChild(details);

            carsContainer.appendChild(newElement);
        })
    }

displaydata();

searchElement.addEventListener("input", displaydata);
filterElement.addEventListener("change", displaydata);
sortingElement.addEventListener("change", displaydata);
minPriceElement.addEventListener("input", displaydata);
maxPriceElement.addEventListener("input", displaydata);

document.getElementById("load-more").onclick = () =>{
    visibleCount +=3;
    displaydata();
};


let upBtn = document.getElementById("scrollTop");

window.addEventListener("scroll", () => {
    if(window.scrollY > window.innerHeight * 2/3){
        upBtn.style.display = "block";
    }else{
        upBtn.style.display = "none";
    }
});

upBtn.onclick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
};


let popup = document.getElementById("subscribe");
let acceptBtn = document.getElementById("accept");
let declineBtn = document.getElementById("decline");

if(!localStorage.getItem("subscribed")){
    setTimeout(() => {
        popup.style.display = "block";
    },3000);
}

acceptBtn.onclick = () => {
    localStorage.setItem("subscribed", "yes");
    popup.innerHTML = "<p>Дякуємо за підписку!</p>";

    setTimeout(() => {
        popup.style.display = "none";
    },2000);
}

declineBtn.onclick = () =>{
    popup.style.display= "none";
}

function updateCart(){
    let cartBox = document.getElementById("cartBox");

    cartBox.innerHTML = "<h4>Кошик:</h4>";

    cart.forEach(item => {
        let p = document.createElement("p");
        p.innerText = item;
        cartBox.appendChild(p);
    });
}