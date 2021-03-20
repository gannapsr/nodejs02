// Order service plugin with the function 

function order(options){
  // pattern checkout
    this.add("component: order, operation: checkout", function (args, respond) {
      console.log("Inside order");
      var order = this.make$("orders");
      const orderid = Math.floor(Math.random() * 100);
      order.orderid = orderid;
  
      order.products = args.products;
      order.save$(function (err) {
        if (err) throw err;
        console.log("order taken");
        respond(null, { orderid });
      });
    });
  }
  module.exports = order;