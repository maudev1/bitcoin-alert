jQuery(($) => {

    $('.navbar-burger').on('click', function () {
        
        $('.flipper').toggleClass('flipper-on');

    })


    $('.color').on('change', function () {

        $('.is-maudev').css('background-color', `${$(this).val()}`);

    });

    $('#price').inputmask("currency");
    

    


})