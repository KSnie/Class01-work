
const addItem = (selectedAccessory, selectedAccessoryValue, amountInput) => {
    var price = parseFloat(selectedAccessoryValue);
    var Price = parseFloat($('#price').text().substring(1));
    var totalVat = parseFloat($('#total-vat').text().substring(1));
    var totalPrice = parseFloat($('#total-price').text().substring(1));
    var productTable = $('#product-list')[0];

    var row = productTable.insertRow(-1);
    var accessoryCell = row.insertCell(0);
    var amountCell = row.insertCell(1);
    var priceCell = row.insertCell(2);
    var actionCell = row.insertCell(3);

    var _vat = 0.07;

    accessoryCell.innerHTML = selectedAccessory;
    amountCell.innerHTML = amountInput;
    priceCell.innerHTML = "$" + (price * amountInput).toFixed(2);
    actionCell.innerHTML = '<button class="delete-button">Delete</button>';

    Price += (price * amountInput);
    totalVat += (price * amountInput * _vat);
    totalPrice += ((price * amountInput) + (price * amountInput * _vat));

    $('#price').text("$" + Price.toFixed(2));
    $('#total-vat').text("$" + totalVat.toFixed(2));
    $('#total-price').text("$" + totalPrice.toFixed(2));
}

$(document).on('click', '.delete-button', function() {
    var row = $(this).closest('tr');
    var priceCell = row.find('td:eq(2)').text().substring(1);
    var price = parseFloat(priceCell);
    var Price = parseFloat($('#price').text().substring(1));
    var totalVat = parseFloat($('#total-vat').text().substring(1));
    var totalPrice = parseFloat($('#total-price').text().substring(1));
    var _vat = 0.07;

    Price -= price;
    totalVat -= (price * _vat);
    totalPrice -= (price + (price * _vat));

    $('#price').text("$" + Price.toFixed(2));
    $('#total-vat').text("$" + totalVat.toFixed(2));
    $('#total-price').text("$" + totalPrice.toFixed(2));

    row.remove();
});

$(document).ready(function() {
    var modal = $('#myModal');
    var openModalBtn = $('#openModal');
    var closeModalSpan = $('.close');

    openModalBtn.on('click', function() {
        modal.show();
    });

    closeModalSpan.on('click', function() {
        modal.hide();
    });

    $(window).on('click', function(event) {
        if ($(event.target).is(modal)) {
            modal.hide();
        }
    });

    $('#add-modal-button').on('click', function() {
        var accessorySelect = $('#modal-accessory-select');
        var selectedAccessory = accessorySelect.find('option:selected').text();
        var selectedAccessoryValue = accessorySelect.find('option:selected').val();
        var amountInput = $('#modal-amount-input').val();

        addItem(selectedAccessory, selectedAccessoryValue, amountInput);
        modal.hide();
    });
});
