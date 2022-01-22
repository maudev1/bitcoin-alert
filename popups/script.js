jQuery(($) => {

    getQuotes('BTC', true, 3000);

    // auto-refresh 

    setInterval(() => {

        getQuotes('BTC', true, 30000);

        // console.log('');

    }, 3000)

    $('#update').on('click', () => {

        getQuotes('BTC', true, 30000);

    })

    /**
     * 
     * 
     *
     * 
     *  @param coin is a prefix of criptocurrency ex: BTC, ETH e etc...
     *  @param autorefresh if set true, this function is auto refresh by time set in next param
     *  @param time, is a time betweens time of executions! 
     * 
     * 
     * 
     * */


    function getQuotes(coin, autorefresh, time) {

        if (autorefresh == true) {

            setInterval(() => {
                
                getData(coin);

            }, time)

        } else {

            getData(coin);

        }

        function getData(coin) {

            $.get(`https://www.mercadobitcoin.net/api/${coin}/ticker/`, {

            }).then((data) => {

                console.log(data.ticker.last)

                $('.price').text(`R$ ${data.ticker.last}`)
            }).catch((error) => {

                console.log(`Houve um erro, tente novamente, error: ${error}`)
            })

        }


    }

})

