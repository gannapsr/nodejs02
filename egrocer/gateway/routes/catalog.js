// Import the express module 
const express = require('express');

//  Import the router method from express 
const router= express.Router()

// Import the seneca module 
const seneca = require('seneca')();

seneca.quiet();

// Create the seneca client to listen to the cart service running at port 9000
seneca.client(9001);

//  Define the routes associated to the catalog service 

// Get catalog API endpoint -- view the catalog items 
// http://localhost:3003/catalog/view  -route is 

router.get("/view",(req,res,next)=>{
   //logic to get the catalog items 
   seneca.act({component:'catalog',operation:'view'},(err,response)=>{
        if(err) throw err;
        console.log("Catalog view all items");
        console.log(response.result);
        res.json(response.result);
    }); 
});

// Get catalog API endpoint -- view the catalog items by category
// http://localhost:3003/catalog/view/Dairy 
router.get("/view/:cat",(req,res,next)=>{
    //logic to get the catalog items 
    //console.log(req.params.cat);
    seneca.act({component:'catalog',operation:'view',by:req.params.cat},(err,response)=>{
         if(err) throw err;
         console.log('Catalog items for the given category :'+ req.params.cat);
         console.log(response.result);
         res.json(response.result);
         /*
         console.log('===========================================START=======================================================');
         console.log(response.result);
         console.log('============================================END======================================================');
         //console.log(req.params.cat);
            var prodfound;
            for (const prod of response.result) {
                if(prod.cat == req.params.cat){
                    prodfound=prod;
                    console.log(prodfound);
                }
            }
            if(!prodfound){
                console.log('No Catalog items found for the given category :'+ req.params.cat);
            }
            else{
                console.log('Catalog items for the given category :'+ req.params.cat);
            }
        */
     }); 
 });
 
module.exports = router;