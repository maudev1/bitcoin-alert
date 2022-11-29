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
        // throw('Ok');
        this.dataStorage.createTable("favorites", ['code', 'name', 'price', 'date']);
        this.commit();
    }

    show()
    {
        return this.dataStorage;
    }

    add(){
        return this.dataStorage    
    }


    destroy()
    {

    }



}