const express = require("express")
const cors = require("cors")
const stripe = require("stripe")("sk_test_51NqrX2SAya69TUBdcYVQ9wnUqGc4PD33DzDyqIEFXTYStsMZ8bphFHDEuVxsoE1ISjvXNoqhgYjTt4h5MmGmNJFu00AQT73xeq")

const app = express();

app.use(express.json())
app.use(cors())



// app.post("/payment", async(req, res) => {

//     const {cart, token} = req.body
//     // console.log('token', token);
//     // console.log('product', products)

//     const idempotencyKey = uuid()

//     return stripe.customers.create({
//         email: token.email,
//         source: token.id
//     }).then(customer => {
//         stripe.charges.sessions.create({
//             mode:"payment",
//             amount: cart.price,
//             currency: 'inr',
//             customer: customer.id,
//             receipt_email: token.email,
//             description: `purchase of ${cart.name}`,
//             shipping: {
//                 name: token.card.name,
//                 address: {
//                     country: token.card.address_country
//                 }
//             },
//             success_url:"http://localhost:3000/sucess"
            
//         }, {idempotencyKey})
//     }).then(success => {
//         res.status(200).json({success:  true})
//     }).catch(err => console.log(err))
// })

// const lineItems = products.map((product)=>({
//     // price_data:{
//     //     currency:"inr",
//     //     product_data:{
//     //         name:product.name,
//     //         images:product.image
//     //     },
//     // },
//    // quantity:product.total_item
    
//    currency: "inr",
//    name: product.name,
//    images: product.images,
//    quantity: product.total_item

// }));

// const session = await stripe.checkout.sessions.create({
//     line_items: [{
//         name: products.name,
//         description: products.description,
//         images: products.images,
//         amount: products.amount,
//         currency: 'inr',
//         quantity: products.total_item,
//     }],
//     mode:"payment",
//     success_url:"http://localhost:3000/success"
// });

// res.json({id:session.id})

// })


app.post("/payment", async(req, res) => {
    const {product} = req.body;

    const lineItems = product.map((product) =>({

        price_data:{
            currency:"inr",
            product_data:{
                name:product.name,
                images:[product.image]
            },
            unit_amount: product.price
        },
        quantity: product.amount

        
    }))

    const session = await stripe.checkout.sessions.create({
        payment_method_types:["card"],
        line_items: lineItems,
        mode:"payment",
        success_url:`${"http://localhost:3000/success"}?success=true`,
        cancel_url: `${"http://localhost:3000/canceled"}?canceled=true`,
    });

    res.json({id:session.id})


})






app.listen(8282, () => console.log("8282 Port is working"))
