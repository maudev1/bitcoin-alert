// Load Databse
let database = new DataBase('coin_alert');

jQuery(($) => {

    $('#add-coin').on('click', function(){
        database.add('favorites', 'BTC', 'Bitcoin', '85000');
    });







});


// console.log(database.show());

// function addFavorite($database) {


// }