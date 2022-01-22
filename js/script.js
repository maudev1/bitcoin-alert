

// let text = 'meu texto possui bosta';

//     if(text.includes('bosta') == true){
//         // text.style['color', 'red'];
//         console.log(text);

//     }

let doc = document.querySelectorAll('p');

for(word of doc){

   //let name = (/^bbb$/i).test(source)


    if(word.innerText.includes('BBB') == true){
        word.style.display= 'none';
        console.log(word);

    }

    
    // if(word.text == 'bbb' && word.text == 'BBB'){

    // }


}

