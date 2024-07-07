const addItem = () => {
    var accessorySelect = $('#accessory-select');
    var selectedAccessory = accessorySelect.find('option:selected').text();
    var selectedAccessoryValue = accessorySelect.find('option:selected').val();
    var amountInput = $('#amount-input').val();
    var price = parseFloat(selectedAccessoryValue);
    var Price = parseFloat($('#price').text().substring(1));
    var totalVat = parseFloat($('#total-vat').text().substring(1));
    var totalPrice = parseFloat($('#total-price').text().substring(1));
    var productTable = $('#product-list')[0];

    var row = productTable.insertRow(-1);
    var accessoryCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var priceCell = row.insertCell(2);

    var _vat = 0.07;

    accessoryCell.innerHTML = selectedAccessory;
    amountCell.innerHTML = amountInput;
    priceCell.innerHTML = "$" + (price * amountInput).toFixed(2);

    Price += (price * amountInput);
    totalVat += (price * amountInput * _vat);
    totalPrice += ((price * amountInput) + (price * amountInput * _vat));

    $('#price').text("$" + Price.toFixed(2));
    $('#total-vat').text("$" + totalVat.toFixed(2));
    $('#total-price').text("$" + totalPrice.toFixed(2));
}
