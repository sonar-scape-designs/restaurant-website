fetch("https://kea-alt-del.dk/t5/api/productlist")
.then(function (display) {
    return display.json()
    })
.then(function (database){
    uploadData(database)
})

function uploadData(onlineDatabase) {
    onlineDatabase.forEach(showData)
    console.log(onlineDatabase)

}


function showData(jsonDatabase){
//    console.log("matter")
    const template = document.querySelector("#starter-template").content;
    const clone = template.cloneNode(true);

    clone.querySelector("h2").textContent = jsonDatabase.name;
    clone.querySelector("h3 span").textContent = jsonDatabase.price;
    clone.querySelector("p").textContent = jsonDatabase.shortdescription;
    clone.querySelector(".discount").textContent = jsonDatabase.discount;
//    clone.querySelector("img").src=heroDatabase.selfie;

    //const parent = document.querySelector("main");
    document.querySelector("main").appendChild(clone)

}
