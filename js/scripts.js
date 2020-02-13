const modal = document.querySelector(".modal-background");
modal.addEventListener("click", () => {
    modal.classList.add("hide");
});


fetch("https://kea-alt-del.dk/t5/api/categories")
    .then(function (display) {
        return display.json()
    })
    .then(displayCategories)

function displayCategories(data) {
    //    console.log(data)
    data.forEach(function (eachItem) {

        const a = document.createElement("a");
        a.setAttribute("href", `#${eachItem}`);
        a.textContent = eachItem;
        document.querySelector("#top-nav").appendChild(a);



        const section = document.createElement("section");
        section.id = eachItem;
        const h2 = document.createElement("h2");
        h2.textContent = eachItem;
        section.appendChild(h2);

        document.querySelector("main").appendChild(section);
    })
    showProducts();

}


function showProducts() {
    fetch("https://kea-alt-del.dk/t5/api/productlist")
        .then(function (display) {
            return display.json()
        })
        .then(function (database) {
            uploadData(database)
        })

    function uploadData(onlineDatabase) {
        onlineDatabase.forEach(showData)
        //        console.log(onlineDatabase)

    }
}

function showData(jsonDatabase) {
    //        console.log(jsonDatabase, "this is single data")
    const template = document.querySelector("#saleItems").content;
    const clone = template.cloneNode(true);

    //    clone.querySelector("h1").textContent = jsonDatabase.category;
    clone.querySelector("h2").textContent = jsonDatabase.name;
    clone.querySelector("h3 span").textContent = jsonDatabase.price;
    clone.querySelector("p").textContent = jsonDatabase.shortdescription;
    clone.querySelector(".discount").textContent = jsonDatabase.discount;

    if (jsonDatabase.discount) {
        clone.querySelector(".discount").textContent = jsonDatabase.price;
        const newPrice = Math.round(jsonDatabase.price - jsonDatabase.price * jsonDatabase.discount / 100);
        clone.querySelector(".original").textContent = newPrice;
    } else {
        clone.querySelector(".discount").remove()
        clone.querySelector(".original").textContent = jsonDatabase.price;
    }


    //    const parent = document.querySelector("main");
    //    document.querySelector("main").appendChild(clone)



    const imageName = jsonDatabase.image; // this would be dynamic
    const base = "https://kea-alt-del.dk/t5/site/imgs/";
    const smallImg = base + "small/" + imageName + "-sm.jpg";
    const mediumImg = base + "medium/" + imageName + "-md.jpg";
    const largeImg = base + "large/" + imageName + ".jpg";
    clone.querySelector("img").src = smallImg;



    //    button function

    clone.querySelector("button").addEventListener("click", () => {
        console.log("click", jsonDatabase)
        fetch(`https://kea-alt-del.dk/t5/api/product?id=${jsonDatabase.id}`)
            .then(res => res.json())
            .then(showDetails);
    });


    console.log(`#${jsonDatabase.category}`)
    document.querySelector(`#${jsonDatabase.category}`).appendChild(clone);
}



function showDetails(data) {
    modal.querySelector(".modal-name").textContent = data.name;
    modal.querySelector(".modal-description").textContent = data.longdescription;
    modal.querySelector(".modal-price").textContent = data.price;
    //...
    modal.classList.remove("hide");
}
