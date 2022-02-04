jQuery(($) => {

    // $("#price").inputmask('decimal', {
    //     'alias': 'numeric',
    //     'groupSeparator': ',',
    //     'autoGroup': true,
    //     'digits': 2,
    //     'radixPoint': ".",
    //     'digitsOptional': false,
    //     'allowMinus': false,
    //     // 'prefix': 'R$ ',
    //     'placeholder': ''
    // });


    $('.color').on('change', function () {

        console.log($(this).val());

        $('.is-maudev').css('background-color', `${$(this).val()}`);


    })

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

    $('.coins').on('change', () => {

        returnVal($('.coins').val());

    })

    $('.add').on('click', () => {

        let coin = $('.coins').val();
        let price = $('#price').val();

        console.log(price);

        let coins = [coin, price];

        if (!favorites.includes(coins)) {

            favorites.push(coins);

            chrome.storage.local.set({ coins: favorites }, function () { });

            saveInLocal(favorites);

        }

        console.log(favorites);

        getData(favorites);
    })

    $('.reset-data').on('click', () => {

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
                //API DATA
                let open = data.ticker.open;
                let current = data.ticker.last;

                //USER DATA
                let currencyInitials = coin[0];
                let priceAlert = coin[1];
                let percent = null;

                if (current > priceAlert) {
                    let x = current - priceAlert;
                    let y = x / current * 100;
                    percent = y.toFixed(2);

                }
                else {
                    let x = current - priceAlert;
                    let y = x / priceAlert * 100;
                    percent = y.toFixed(2);


                }


                quotes = $(
                    `<tr>
                    <td>
                    <div class="field is-grouped is-grouped-multiline">
                        <div class="control">
                            <div class="tags has-addons">
                                <span class="tag is-dark"><i class="cf cf-${currencyInitials.toLowerCase()}"></i></span>
                                <span class="tag is-warning">
                                    <a class="has-text-dark" target="_BLANK" href="https://www.google.com.br/search?q=${coin[0]}">${coin[0]}</a>
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    </td>` +
                    `<td>` +
                    `<span class="alarm"> ${formatter.format(priceAlert)}</span>` +
                    `<span class="icon-text">` +
                    `<span class="icon">` +
                    `<i class="material-icons ${current < priceAlert ? 'has-text-success' : 'has-text-danger'}">${current < priceAlert ? 'arrow_drop_up' : 'arrow_drop_down'}</i>` +
                    `</span>` +
                    `<span style="font-size:10px" class="percent ${current < priceAlert ? 'has-text-success' : 'has-text-danger'}">${Math.abs(percent)}%</span>` +
                    `</span>` +
                    `</td>` +
                    `<td>` +
                    `<span class="price"> ${formatter.format(current)}</span>` +
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

    function returnVal(value) {
        $.get(`https://www.mercadobitcoin.net/api/${value}/ticker/`, {

        }).then((data) => {

            $('#price').val('');
            $('#price').val(data.ticker.last);

        }).catch((err) => {
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


