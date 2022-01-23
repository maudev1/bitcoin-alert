jQuery(($) => {

        
    getQuotes('BTC', true, 3000);

    // auto-refresh 

    setInterval(() => {


        getQuotes('BTC', true, 30000);

        // console.log('');

    }, 3000)

    $('#teste').on('click', () => {

        console.log(getQuotes('BTC', true, 30000));

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

                let open   = data.ticker.open;
                let current = data.ticker.last;

                // let formated = current.substring(0,9);
                //  console.log(str);

                if(current < open){
                    $('.arrpw-up').hide();
                    $('.arrow-down').show();
                }else{
                    $('.arrow-down').hide();
                    $('.arrow-up').show();
                }

                $('.price').unmask();

                $('.price').text(`${current.substring(0,9)}`);


                $('.price').mask('000,000.00', {reverse: true});

            }).catch((error) => {

                console.log(`Houve um erro, tente novamente, error: ${error}`)
            })

        }


    }



})

