require('dotenv').config()

const cors = require("cors")
const express = require("express")
//todo: add stripe key
const stripe = require("stripe")(process.env.SECRET_KEY)//paste secret key;
const { v4: uuid } = require("uuid")

const app = express()

//middleware
app.use(express.json())
app.use(cors()) //for cross object references 

//routes
app.get("/", (req, res) => {
    res.send("works")
})


app.post("/payment", (req, res)=>{
    const { product, token} = req.body
    console.log("product", product)
    console.log("price", product.price)
    const idempotencyKey = uuid()

    return stripe.customers.create({
        email: token.email,
        source: token.id
    }).then(customer => {
        stripe.charges.create({
            amount: product.price * 100,
            currency: 'usd',
            customer: customer.id,
            receipt_email: token.email,
            description: `purchase of ${product.name}`,
            shipping:{
                name: token.card.name,
                address: {
                    country: token.card.address_country
                }
            }
        },{idempotencyKey})
    }).then(result => res.status(200).json(result))
    .catch(err => console.log(err))

})

//listening
app.listen(8282, ()=>{
    console.log("running on 8282")
})