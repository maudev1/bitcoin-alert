jQuery(($) => {

    // Initialise local database doesn't exist, it is created

    const lib = new localStorageDB("favorites", localStorage);

    $('.add').on('click', function () {

        let prefix = $('#currency-list').val();
        let name = $('#currency-list option:selected').text();
        let quote = $('#price-no-formatted').val();

        alert(quote);

        let currency =
        {
            prefix: prefix,
            name: name,
            quote: quote,
            alarm: 1

        }

        saveFavorite(currency);
    });

    if (query('currencies')) {

        let quotes = '';

        let all = query('currencies');

        var formatter = new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',

        });


        all.forEach((c) => {

             let last;

            priceRealTime(c.prefix).then(result=>{
            
                $(`.price-${c.ID}`).text(formatter.format(result.ticker.last));
                
            });
            
            quotes = $(
                `<tr>
                <td>
                <div class="field is-grouped is-grouped-multiline">
                    <div class="control">
                        <div class="tags has-addons">
                            <span class="tag is-dark"><i class="cf 
                            cf-${c.prefix.toLowerCase()}"></i></span>
                            <span class="tag is-warning">
                                <a class="has-text-dark" title="${c.name}" target="_BLANK" 
                                href="https://www.google.com.br/search?q=${c.name}">
                                ${c.prefix}</a>
                            </span>
                        </div>
                    </div>
                </div>
                
                </td>` +
                `<td>` +
                `<span class="alarm"> ${formatter.format(c.quote)}</span>` +
                `<span class="icon-text">` +
                `<span style="margin-right:0" class="icon indicator">` +
                `<i class="material-icons ${last} < c.quote ? 'has-text-success' : 'has-text-danger'}">${last < c.quote ? 'trending_up' : 'trending_down'}</i>` +
                `</span>` +
                `<span style="font-size:10px" class="percent ${last < c.quote ? 'has-text-success' : 'has-text-danger'}">${Math.abs(2)}%</span>` +
                `</span>` +
                `</td>` +
                `<td>` +
                `<span class="price price-${c.ID}">`+
                `</span>` +
                `</td>` +
                `<td class="has-text-centered">` +
                `<span class="set-alarm">` +
                `<a title="excluir moeda" ><i id="´${c.prefix}´" class="material-icons has-text-danger remove">remove_circle</i></a>` +
                `</span>` +
                `</td>` +
                `</tr>`);

            quotes.appendTo('.body');

        })
    }

    if (lib.isNew()) {

        // create the "books" table
        lib.createTable("currencies", ["code", "prefix", "name", "quote", "alarm"]);
        // lib.insert("currencies",{code:'001', prefix:'BTC', name:'bitcoin', alarm:1})
        // commit the database to localStorage
        // all create/drop/insert/update/delete operations should be committed
        lib.commit();
    }

    function saveFavorite(currency) {

        const { code, prefix, name, quote, alarm } = currency;

        lib.insert('currencies', { code, prefix, name, quote, alarm });
        lib.commit();

        console.log('salvando');

        console.log(lib.queryAll("currencies"));

    }

    function query(table) {
        return lib.queryAll(table);
    }

    function priceRealTime(prefix) {

        const url = `https://www.mercadobitcoin.net/api/${prefix}/ticker/`;

        return fetch(url).then(response => response.json());

    }


})