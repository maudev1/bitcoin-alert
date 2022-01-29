jQuery(($) => {

    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',

    });

    let favorites = [];

    
    chrome.storage.local.get(['coins'], (result) => {

        if (!result.coins) {

            saveInLocal(favorites);

        } else {

            favorites = result.coins;
        }

        getData(favorites);

    });

    $('.coins').on('change',()=>{

        returnVal($('.coins').val());

    })

    $('.add').on('click', () => {

        let coin = $('.coins').val();
        let price = $('#price').val();

        let coins = [coin, price];

        console.log(coins);

        if (!favorites.includes(coins)) {
            
            favorites.push(coins);

            chrome.storage.local.set({ coins: favorites }, function () { });
            
            saveInLocal(favorites);

        }

        console.log(favorites);
             
        getData(favorites);
    })

    $('.reset-data').on('click',()=>{
        
        favorites = [];
       
        clearAllData('coins');
        
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
     *  @param vaalues array of cryptocurrency prefix
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

            $.get(`https://www.mercadobitcoin.net/api/${coin[0]}/ticker/`, {

            }).then((data) => {

                let open = data.ticker.open;
                let current = data.ticker.last;

                quotes = $(`<tr>` +
                    `<td><span class="tag is-warning"><b><a class="has-text-maudev" target="_BLANK" href="https://www.google.com.br/search?q=${coin[0]}">${coin[0]}</a></b></span></td>` +
                    `<td>`+
                    `<span class="alarm"> ${formatter.format(coin[1])}</span>` +
                    `</td>`+
                    `<td>` +
                    `<span class="icon-text">`+
                    `<span class="price"> ${formatter.format(current)}</span>` +
                    `<span class="icon">`+
                    `<i class="material-icons ${current < open ? 'has-text-success' : 'has-text-danger'} ">${current < open ? 'arrow_drop_up' : 'arrow_drop_down'}</i>` +
                    `</span>`+
                    `</span>`+
                    `</td>` +
                    `<td class="has-text-centered">` +
                    `<span class="set-alarm">` +
                    `<a title="excluir moeda" ><i id="´${coin}´" class="material-icons has-text-danger remove">remove_circle</i></a>` +
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

    function returnVal(value){
        $.get(`https://www.mercadobitcoin.net/api/${value}/ticker/`, {

        }).then((data)=>{

            $('#price').val('');
            $('#price').val(data.ticker.last);

        }).catch((err)=>{
            console.log(err);
        })

    }

    function saveInLocal(values) {

        chrome.storage.local.set({ coins: values }, function () {

        });

    }

    function clearAllData(values) {
        chrome.storage.local.remove([`${values}`], function () {
            var error = chrome.runtime.lastError;
            if (error) {
                console.error(error);
            }
        })

    }


})


