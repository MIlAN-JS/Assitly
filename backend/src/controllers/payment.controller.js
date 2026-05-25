import config from "../config/env.config.js";
import stripe from "../config/stripe.js";



const createCheckoutSession = async(req , res , next)=>{

    try {

        const user = req.user

        const checkoutSession = await stripe.checkout.sessions.create({
            mode : "subscription", 
            payment_method_types : ["card"],
            customer_email : user.email, 
            line_items : [
                {
                    price : config.STRIPE_PRICE_ID, 
                    quantity : 1
                }
            ], 
            success_url : 'http://localhost:5173/payment/success?session_id={CHECKOUT_SESSION_ID}', 
            cancel_url :' http://localhost:5173/payment/cancel',
            metadata : {
                userId : user._id.toString()
            }

        })

        res.json(
            {
                url : checkoutSession.url
            }
        )



        
    } catch (error) {
        console.log(error)
        next(error)
        
    }

}