const https = require('https');
const PaytmChecksum = require('paytmchecksum')
import Order from '../../models/Order'
import connectDB from "../../middleware/mongoose"

export default function handler(req, res) {
    const quro = JSON.parse(req.body)

    try{
        // amount, Order_id, email: "email",firstName,lastName,Address,contactNumber,pincode,city,state
        // console.log(req.body);
        // const Cart = JSON.parse(quro.cart)
    const orderedData = new Order({
        // userId: req.body.,
        product: quro.cart,
        orderId: quro.Order_id,
        address:quro.Address,
        City:quro.city,
        contact:quro.contactNumber,
        Region:quro.Region,
        Pincode:quro.pincode,
        amount:quro.amount
        })
        // console.log(JSON.stringify(orderedData));
        orderedData.save()
    }catch(err){ 
console.log(err);
    }


// console.log(quro);
var paytmParams = {};
paytmParams.body = {
    "requestType"   : "Payment",
    "mid"           : `${process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID}`,
    "websiteName"   : "WEBSTAGING",
    "orderId"       : quro.Order_id,
    "callbackUrl"   : `${process.env.NEXT_PUBLIC_HOST}api/postTransaction`,
    "txnAmount"     : {
        "value"     : `${quro.amount}.00`,
        "currency"  : "INR",
    },
    "userInfo"      : {
        "custId"    : "CUST_001",
    },
};

/*
* Generate checksum by parameters we have in body
* Find your Merchant Key in your Paytm Dashboard at https://dashboard.paytm.com/next/apikeys 
*/
PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), process.env.PAYTM_MERCHANT_KEY).then(function(checksum){

    paytmParams.head = {
        "signature"    : checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID}&orderId=${quro.Order_id}`,
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': post_data.length
        }
    };

    var response = "";
    var post_req = https.request(options, function(post_res) {
        post_res.on('data', function (chunk) {
    response += chunk;
        });

        post_res.on('end', function(){
    const shocket = JSON.parse(response)
//             console.log('Response: ', shocket);
              res.status(200).json(shocket)
        });
    });

    post_req.write(post_data);
    post_req.end();
});
}