setInterval(() => {

    getData('BTC');

}, 2000)

function getData(coin) {

    let request = new XMLHttpRequest();

    if (!request) {
        console.log('Não foi possivel criar uma instancia XMLHTTP...');
    }
    request.onreadystatechange = messages;
    request.open('GET', `https://www.mercadobitcoin.net/api/${coin}/ticker/`, true);
    request.send()

    function messages() {

        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {

                console.log(request.responseText);

            } else {

                console.log('erro ao trazer dados...')
            }
        }

    }

    function alert() {

        chrome.notifications.create('test', {
            type: 'basic',
            iconUrl: 'icon.png',
            title: 'Test Message',
            message: 'You are awesome!',
            priority: 2
        });

    }


}




