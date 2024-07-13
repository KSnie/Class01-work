const calculate = () => {
    var discount = parseFloat($('#discount').val()) || 0;
    var price = parseFloat($('#price').val()) || 0;
    var vat = (price - discount) * 0.07;
    var total = (price - discount) + vat;
    $('#vat').html('VAT: ' + vat.toFixed(2));
    $('#total').html('TOTAL: ' + total.toFixed(2));
}