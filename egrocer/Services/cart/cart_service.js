// Import the cart plugin created  --- 

//  While exposing the cart service ,, make this cart_Service as a server
//  who is listening to the client on the same port no 

const seneca = require("seneca")();

const entities = require("seneca-entity");
const mongo_store = require("seneca-mongo-store");
const seneca_amqp_transport = require("seneca-amqp-transport");
seneca
  .quiet()
  .use(entities)
  .use(seneca_amqp_transport)
  .use(mongo_store, { name: "cns_egrocer", host: "127.0.0.1", port: 27017 })

  .use("cart_plugin");
    seneca.ready(function (err) {
    console.log("cart service ready");
    seneca.listen(9000);
});
