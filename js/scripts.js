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

    clone.querySelector("h2").textContent = jsonDatabase.name;
    clone.querySelector("h3 span").textContent = jsonDatabase.price;
    clone.querySelector("p").textContent = jsonDatabase.shortdescription;
    clone.querySelector(".discount").textContent = jsonDatabase.discount;
    //        clone.querySelector("img").src=jsonDatabase.image;

    //    const parent = document.querySelector("main");
    //    document.querySelector("main").appendChild(clone)

    console.log(`#${jsonDatabase.category}`)
    document.querySelector(`#${jsonDatabase.category}`).appendChild(clone);
}
