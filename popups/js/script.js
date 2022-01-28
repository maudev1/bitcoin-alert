jQuery(($) => {

    //  clearAllData('coins');
    
    let favorites = [];

    chrome.storage.local.get(['coins'], (result) => {

        if(!result.coins){
            saveInLocal(favorites);
        }
     
        favorites = result.coins;
        
        getData(favorites);

        console.log(result);
    });

    $('.add').on('click', function () {

        let coin = $('.coins').val();

        if(!favorites.includes(coin)){

            favorites.push(coin);
        }

        saveInLocal(favorites);

        getData(favorites);

    })

    setInterval(() => {

        getData(favorites);

    }, 20000)


    /**
     * 
     * 
     *
     * 
     *  @param Cryptocurrencies array of cryptocurrency prefix
     *  
     * 
     * 
     * 
     * */


    function getData(values) {

        var quotes = '';

        $('.body').html('');
        $('.progress').removeClass('is-hidden');

        values.forEach(coin => {

            $.get(`https://www.mercadobitcoin.net/api/${coin}/ticker/`, {

            }).then((data) => {

                let open = data.ticker.open;
                let current = data.ticker.last;

                var formatter = new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',

                });

                quotes = $(`<tr>` +
                    `<td><span class="tag is-warning"><b><a class="has-text-maudev" target="_BLANK" href="https://www.google.com.br/search?q=${coin}">${coin}</a></b></span></td>` +
                    `<td>` +
                    `<span class="price"> ${formatter.format(current)}</span>` +
                    `<span class="arrow-up">` +
                    `<i class="material-icons ${current < open ? 'has-text-success' : 'has-text-danger'} ">${current < open ? 'arrow_drop_up' : 'arrow_drop_down'}</i>` +
                    `</span>` +
                    `</td>` +
                    `<td class="has-text-centered">` +
                    `<span class="set-alarm">` +
                    `<a title="definir alarme" ><i class="material-icons has-text-maudev">notifications_active</i></a>` +
                    `</span>` +
                    `</td>` +
                    `</tr>`);

                $('.progress').addClass('is-hidden');

                quotes.appendTo('.body');


            }).catch((error) => {

                console.log(`Houve um erro, tente novamente, error: ${error}`)
            })

        });


    }

    function saveInLocal(values){

        chrome.storage.local.set({ coins: values }, function () {

        });

    }

    function clearAllData(values){
        chrome.storage.local.remove([`${values}`],function(){
            var error = chrome.runtime.lastError;
               if (error) {
                   console.error(error);
               }
           })
    
    }





})

