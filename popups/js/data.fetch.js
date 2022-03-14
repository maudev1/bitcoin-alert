jQuery(($) => {

    // list currencies 

    let currencyList = $('#currency-list');

    fetch('../currencies.json').then(response => response.json())
        .then((data) => {
            data.forEach(i => {
                if (i.name) {
                    $(`<option value="${i.prefix}">${i.name}</option>`)
                        .appendTo(currencyList)
                }
            });

        })
        .catch(error => console.log(error));


    $('#currency-list').on('change', () => {
        
        fetchData($('#currency-list').val());

    });

    // fetch data mercadonBitcoin

    function fetchData(value) {
        $('#price').val('');
        $.get(`https://www.mercadobitcoin.net/api/${value}/ticker/`, {

        }).then((data) => {
            $('#price').val(data.ticker.last);
            $('#price-no-formatted').val(data.ticker.last);

        }).catch((err) => {
            console.log(err);

        })

    }

});