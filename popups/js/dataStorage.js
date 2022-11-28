class Database {


    constructor() {

    }

    fetch(value) {

        $('#price').val('');
        $.get(`https://www.mercadobitcoin.net/api/${value}/ticker/`, {
    
        }).then((data) => {
            $('#price').val(data.ticker.last);
            $('#price-no-formatted').val(data.ticker.last);
    
        }).catch((err) => {
            console.log(err);
    
        })

    }





}




// function fetchData(value) {
//     $('#price').val('');
//     $.get(`https://www.mercadobitcoin.net/api/${value}/ticker/`, {

//     }).then((data) => {
//         $('#price').val(data.ticker.last);
//         $('#price-no-formatted').val(data.ticker.last);

//     }).catch((err) => {
//         console.log(err);

//     })

// }