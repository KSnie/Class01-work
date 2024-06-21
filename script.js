function addItem() {
    var accessorySelect = document.getElementById("accessory-select");
    var selectedAccessory = accessorySelect.options[accessorySelect.selectedIndex].text;
    var selectedAccessoryValue = accessorySelect.options[accessorySelect.selectedIndex].value;
    var amountInput = document.getElementById("amount-input");
    var amount = amountInput.value;
    var accessoryTable = document.getElementById("accessory-table");
    var price = parseFloat(selectedAccessoryValue)
    var Price = document.getElementById("price");
    var totalVat = document.getElementById("total-vat");
    var totalPrice = document.getElementById("total-price");
    var productTable = document.getElementById("product-list");

    var row = productTable.insertRow(-1);
    var accessoryCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var priceCell = row.insertCell(2);
    
    var _vat = 0.07

    accessoryCell.innerHTML = selectedAccessory;
    amountCell.innerHTML = amount;
    priceCell.innerHTML = "$" + (price * amount);
    
    Price.innerHTML = "$" + (parseFloat(Price.innerHTML.substring(1)) + (price * amount));
    totalVat.innerHTML = "$" + (parseFloat(totalVat.innerHTML.substring(1)) + ((price * amount)*_vat)).toFixed(2);
    totalPrice.innerHTML = "$" + (parseFloat(totalPrice.innerHTML.substring(1)) + ((price * amount) + (price * amount)*_vat)).toFixed(2);
}