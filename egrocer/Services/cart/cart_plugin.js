// CART plugin 

// Patterns are : 
// 1. Add items to cart 
// 2. View items from cart
// 3. Removing items from cart 
    //  --- remove one item 
    //  --- remove all items from the cart


    function cart(operationtions){

        // define all the patterns 
    
        // Add items to the cart pattern
        this.add({component:'cart',operation:'add'},(args,reply)=>{
            // Create a cart entity
            const prod = this.make('cart');
            prod.id= args.id;
            prod.cat = args.cat;
            prod.pname= args.pname;
            prod.price= args.price;
            prod.qty= args.qty;
            prod.save$((err,prods)=>{
                if(err) return console.log(err);
                console.log(prods);
            });
            reply(null,{result:args.pname + " Item got added successfully"});
        });
        
        // Display the items to the cart pattern 
        this.add({component: "cart",operation: "view"},(args,reply)=>{
            const product = this.make("cart");
            product.list$({},(err,products)=>{
                if(err) return console.log(err);
                reply(null,{result: products});
            });
        });

        // Remove all items from the cart pattern 
        this.add({component:'cart',operation:'remove'},(args,reply)=>{
            const prod = this.make('cart');
            prod.remove$({all$: true,pname: args.by},(err,prods)=>{
                if(err) return console.log(err);
                console.log(prods)
                if (!args.by)
                    reply(null,{result:"All item(s) got removed successfully"});
                else
                    reply(null,{result:args.by + " item(s) got removed successfully "}); 
            });
        });

        // Remove particular items from the cart pattern 
        this.add({component:'cart',operation:'remove/:pna'},(args,reply)=>{
            const prod = this.make('cart');
            prod.remove$({pname: args.pname},(err,prods)=>{
                if(err) return console.log(err);
                reply(null,{result:"Item got removed successfully" + args.pname});
            });
        });
    
        // Checkout pattern from the cart
        // CAlling the order component - checkout pattern thru amqp protocol
    
        // GET API endpoint

        this.add({ component: "cart", operation: "checkout" }, (args, reply) => {
            this.act({ component: "cart", operation: "view" }, (error, response) => {
              if (error) console.log(error);
              console.log("Product list" + response.result);
              this.client({
                type: "amqp",
                pin: "component: order, operation:checkout",
                url: "amqp://guest:guest@localhost:5672",
              }).act(
                { component: "order", operation: "checkout", products: response.result },
                (err, res) => {
                  if (err) throw err;
        
                  reply(null, { result: "Thanks for placing an order!" });
                });
            });
          });
    }
    
    module.exports=cart;