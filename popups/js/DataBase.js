class DataBase{

    constructor(dbName){

        this.dataStorage = new localStorageDB(dbName);

        if(this.dataStorage.isNew()){
            this.createTables();
        }
    }

    // create all tables
    createTables()
    {
        this.dataStorage.createTable("coins", ['code', 'name', 'price', 'date']);
        this.dataStorage.commit();
    }

    show()
    {
        return this.dataStorage;
    }

    add(table, code, name, price){
        this.dataStorage.insert(table, {code:code, name:name, price:price, date:'teste'});
        this.dataStorage.commit();

        console.log('Moeda adicionada!');
    }


    destroy()
    {

    }



}