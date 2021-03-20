// Import the express module 
const express = require('express');

//  Import the router method from express 
const router= express.Router()

// Import the seneca module 
const seneca = require('seneca')();

seneca.quiet();

// Create the seneca client to listen to the cart service running at port 9000
seneca.client(9000);

//  Define the routes associated to the cart service 

// POST CART API endpouint  -- to add the item 
// route - http://localhost:3003/cart/add
router.post("/add",(req,res,next)=>{
    //logic to add an item 
    seneca.act({component:'cart',operation:'add',id:1,cat:'Fruits',pname:'Papaya',price:29,qty:2},(err,response)=>{
        if(err) throw err;
        console.log(response.result);
        res.json(response.result);
    });
    seneca.act({component:'cart',operation:'add',id:2,cat:'Vegetables',pname:'Carrot',price:20,qty:1},(err,response)=>{
        if(err) throw err;
        console.log(response.result);
        res.json(response.result);
    });
    seneca.act({component:'cart',operation:'add',id:3,cat:'Vegetables',pname:'Onion',price:55,qty:3},(err,response)=>{
        if(err) throw err;
        console.log(response.result);
        res.json(response.result);
    });
    seneca.act({component:'cart',operation:'add',id:4,cat:'Dairy',pname:'Milk',price:25,qty:1},(err,response)=>{
        if(err) throw err;
        console.log(response.result);
        res.json(response.result);
    });
    seneca.act({component:'cart',operation:'add',id:4,cat:'Dairy',pname:'Curd',price:40,qty:1},(err,response)=>{
        if(err) throw err;
        console.log(response.result);
        res.json(response.result);
    });
});

// POST CART API endpouint  -- to remove all items 
// route - http://localhost:3003/cart/remove
router.post("/remove",(req,res,next)=>{
    //logic to remove all items 
    seneca.act({component:'cart',operation:'remove'},(err,response)=>{
        if(err) throw err;
        console.log(response.result);
        res.json(response.result);
    });
});

// POST CART API endpouint  -- to remove particular item by pname
// route - http://localhost:3003/cart/remove/Carrot
router.post("/remove/:pna",(req,res,next)=>{
    //logic to remove an item 
    seneca.act({component:'cart',operation:'remove',by:req.params.pna},(err,response)=>{
        if(err) throw err;
        console.log(response.result);
        res.json(response.result);
    });
});

// Get CART API endpoint -- view the cart items 
// http://localhost:3003/cart/view  -route is 

router.get("/view",(req,res,next)=>{
   //logic to get the cart items 
   seneca.act({component:'cart',operation:'view'},(err,response)=>{
        if(err) throw err;
        console.log("Cart View is successful");
        //res.json("Cart View is successful")
        console.log(response.result);
        res.json(response.result);
    }); 
});

// Get checkout API endpoint -- checkout the cart items 
// http://localhost:3003/cart/checkout  -route is 
router.get("/checkout",(req,res,next)=>{
    //logic to get the cart items 
    seneca.act({component:'cart',operation:'checkout'},(err,response)=>{
         if(err) throw err;
         console.log("checkout is successful");
         console.log(response.result);
         res.json("checkout is successful");
     }); 
 });

// GEt the cart module ready to be exported 
module.exports = router;