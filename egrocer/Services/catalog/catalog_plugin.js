// catalog plugin 

// Patterns are : 
// 1. View all items 
// 2. View items by categoery

    function catalog(options){

        // define all the patterns 
    
        // Display all items
        this.add({component:'catalog',operation:'view'},(args,reply)=>{
            const product = this.make('catalog');
            product.list$({cat: args.by, sort$:{pname:1}},(err,products)=>{
                if(err) return console.log(err);
                
                if(products.length == 0)
                {
                    reply(null,{result:'No items for given criteria'});
                }
                else
                {
                    reply(null,{result:products});
                }
            });
        });
        
        // Display items by category
        this.add({component:'catalog',operation:'view/:cat'},(args,reply)=>{
            const catitems = this.make('catalog');
            catitems.list$({cat: args.cat},(err,listitems)=>{
                if(err) return console.log(err);
                reply(null,{result:listitems});
            });
        });
        
    }
    
    module.exports=catalog;