const calculateVAT = () => {
    var _Price = parseFloat(document.getElementById("input-price-value").value)

    if (isNaN(_Price)){

    }

    var _vatRate = 0.07

    var _vatvalue = _Price * _vatRate
    var _TotalPrice = _Price + _vatvalue

    document.getElementById("VAT-amount").innerHTML = _vatvalue.toFixed(2)
    document.getElementById("Total-price").innerHTML = _TotalPrice.toFixed(2)
}