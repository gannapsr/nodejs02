// Import the catalog plugin created  --- 

//  While exposing the catalog service ,, make this catalog_Service as a server
//  who is listening to the client on the same port no 

const seneca = require('seneca')();
const entities = require('seneca-entity');

// Import seneca-mongo-store module to store teh data 
const mongostore = require('seneca-mongo-store');

seneca.quiet();
seneca.use(entities);
seneca.use(mongostore,{
    name:'cns_egrocer',
    host:'127.0.0.1',
    port:27017
});

seneca.use('catalog_plugin');
// To initialize the cart service with ready()
seneca.ready((err)=>{
    console.log("Catalog Service is ready at port # 9001");
})
// To listen to the cart service at port no 9000
seneca.listen(9001);