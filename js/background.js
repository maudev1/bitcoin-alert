


chrome.extension.onConnect.addListener(function(port) {
    console.log("Connected .....");
    port.onMessage.addListener(function(msg) {

        chrome.storage.local.set({key: msg, coin:['BTC']}, function() {
            console.log('Value is set to ' + msg);
          });
          



// chrome.storage.local.get(['key'], function(result) {
//     //console.log('Value currently is ' + result.key);

    
//     if(result.key != 'maudev1'){
        
//         let value = 'maudev1';
//         console.log('teste')
//         chrome.storage.local.set({key: value}, function() {
//             console.log('Value is set to ' + value);
//           });
          

//     }else{
//         console.log('Chave:' + result.key)
//     }


//   })


         






         port.postMessage("Hi Popup.js");
    });
})


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




