var form = document.getElementById("candyTracker");
form.addEventListener('submit', submitData);

function submitData(e) {
    e.preventDefault();
    var name = document.getElementById('name').value;
    var price = document.getElementById('price').value;
    var quantity = document.getElementById('quantity').value;

    var objData = {
        name: name,
        price: price,
        quantity: quantity
    };

    axios
        .post("https://crudcrud.com/api/370f668c43934a49a93685af4bc285c9/CandyStock", objData)
        .then((response) => {
            displayData(response.data);
        })
        .catch((error) => {
            console.log(error);
        });

    form.reset();
}
function buy5(e) {
    var li = e.target.parentElement;
    var ID = li.getAttribute('candy-ID');
    
    // Fetching the current candy data from the server
    axios.get("https://crudcrud.com/api/370f668c43934a49a93685af4bc285c9/CandyStock/" + ID)
        .then((response) => {
            var currentQuantity = response.data.quantity;
            var newQuantity = currentQuantity - 5;

            if (newQuantity >= 0) {
                // Update the quantity on the server
                axios.put("https://crudcrud.com/api/370f668c43934a49a93685af4bc285c9/CandyStock/" + ID, { quantity: newQuantity })
                    .then(() => {
                        // Update the quantity on the browser
                        li.remove();
                        displayData(response.data);
                    })
                    .catch((error) => {
                        console.log("Error updating quantity:", error);
                    });
            } else {
                alert("Not enough candies in stock.");
            }
        })
        .catch((error) => {
            console.log("Error fetching candy data:", error);
        });
}



function buy10(e) {
    var li = e.target.parentElement;
    var ID = li.getAttribute('candy-ID');
    
    // Fetching the current candy data from the server
    axios.get("https://crudcrud.com/api/370f668c43934a49a93685af4bc285c9/CandyStock/" + ID)
        .then((response) => {
            var currentQuantity = response.data.quantity;
            var newQuantity = currentQuantity - 10;

            if (newQuantity >= 0) {
                // Update the quantity on the server
                axios.put("https://crudcrud.com/api/370f668c43934a49a93685af4bc285c9/CandyStock/" + ID, { quantity: newQuantity })
                    .then(() => {
                        // Update the quantity on the browser
                        li.remove();
                        displayData(response.data);
                    })
                    .catch((error) => {
                        console.log("Error updating quantity:", error);
                    });
            } else {
                alert("Not enough candies in stock.");
            }
        })
        .catch((error) => {
            console.log("Error fetching candy data:", error);
        });
}









function displayData(objct) {
    var li = document.createElement('li');
    li.className = 'type-of-candies';

    var name = objct.name;
    var price = objct.price;
    var quantity = objct.quantity;
    var itemID = objct._id;

    li.setAttribute('candy-ID', itemID);

    var liname = document.createTextNode(name);
    var liprice = document.createTextNode(price);
    var liquantity = document.createTextNode(quantity);

    li.appendChild(liname);
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode("price:"));
    li.appendChild(liprice);
    li.appendChild(document.createElement('br'));
    li.appendChild(document.createTextNode("quantity:"));
    li.appendChild(liquantity);

    

    var buy5Button = document.createElement('button');
    buy5Button.textContent = 'buy:5';
    buy5Button.addEventListener('click',buy5);
    li.appendChild(buy5Button);

    var buy10Button = document.createElement('button');
    buy10Button.textContent = 'buy:10';
    buy10Button.addEventListener('click',buy10);
    li.appendChild(buy10Button);


    var userList = document.getElementById('candies');
    userList.appendChild(li);
}
