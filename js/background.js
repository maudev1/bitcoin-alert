setInterval(() => {

    chrome.storage.local.get(['coins'], (result) => {

        if (result.coins) {

            result.coins.forEach(alarm => {

                GetData(alarm[0]);

            });

        }


    });

    // console.log(GetData('BTC'));

}, 2000);


function GetData(alarm) {

    let request = new XMLHttpRequest();

    if (!request) {
        console.log('Não foi possivel criar uma instancia XMLHTTP...');

        throw ('Não foi possivel criar uma instancia XMLHTTP...');
    }

    request.onreadystatechange = messages;
    request.open('GET', `https://www.mercadobitcoin.net/api/${alarm}/ticker/`, true);
    request.send();

    var formatter = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',

    });


    function messages() {

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {

                let response = JSON.parse(request.response);


                chrome.storage.local.get(['coins'], (result) => {

                    if (result.coins) {

                        result.coins.forEach(alarm => {

                            if (response.ticker.last == alarm[1]) {

                                console.log(response.ticker.last);

                                alertMessage(`A cotação do ${alarm[0]} está em ${formatter.format(response.ticker.last)}`, true);

                            }

                        });

                    }


                });

            } else {

                console.log('erro ao trazer dados...')
            }
        }

    }

    function alertMessage(alarm, audio) {

        chrome.notifications.create('test', {
            type: 'basic',
            iconUrl: 'bitcoin.png',
            title: 'Atenção',
            message: alarm,
            priority: 2
        });

        if(audio == true){
            audioNotification();
        }


    }

    function audioNotification() {
       
            var yourSound = new Audio('../sounds/mystery2.wav');
            yourSound.play();
        
    }



}


