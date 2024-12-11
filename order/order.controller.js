const OrderService = require("./order.service")

const createOrder = async(req,res)=>{
    try {
        const order = await OrderService.createOrder(req)
        res.status(200).json({order})
        
    } catch (error) {
        res.status(500).json({ error: error.message });
        
    }
}

module.exports= {
    createOrder
}