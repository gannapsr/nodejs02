// Import the order plugin and invoke the pattern 

const seneca = require('seneca')();
const entity = require('seneca-entity');
const dbstore = require('seneca-mongo-store');
const senecaamqp = require('seneca-amqp-transport');
//seneca.quiet();
seneca.use(entity);
seneca.use(senecaamqp);
seneca.use(dbstore,{
    name:'cns_egrocer',
    host:'127.0.0.1',
    port:27017
});

seneca.use("order_plugin");

seneca.ready(function (err) {
    console.log("Order service is initialized....");
    // We dont want the order service to be exposed rather we generate the functionality through the cart service
    // Hence, seneca.listen(portno) is not needed rather
    //  communication thru amqp protocol is needed
    seneca.listen({
        type: "amqp",
        pin: "component: order,operation: checkout",
        url: "amqp://guest:guest@localhost:5672",
      });
});


