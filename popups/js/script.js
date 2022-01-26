




jQuery(($) => {


    $('.add').on('click', function () {

        let coin = $('.coins').val();

        chrome.storage.local.set({ coins: coin }, function () {

        });

        chrome.storage.local.get(['coins'], (result) => {
            //console.log(result.coins)
            let Data = [];
    
            Data.push(result.coins);
    
            getData(Data);
        });

        coin = '';
    })

    chrome.storage.local.get(['coins'], (result) => {
        //console.log(result.coins)
        let Data = [];

        Data.push(result.coins);

        getData(Data);
    });

    // auto-refresh 

    setInterval(() => {

        chrome.storage.local.get(['coins'], (result) => {
            //console.log(result.coins)
            let Data = [];
    
            Data.push(result.coins);
    
            getData(Data);
        });

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


    function getData(Cryptocurrencies) {

        var quotes = '';

        $('.body').html('');
        $('.progress').removeClass('is-hidden');

        Cryptocurrencies.forEach(coin => {

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

        // $('.body').html(quotes);

    }





})

