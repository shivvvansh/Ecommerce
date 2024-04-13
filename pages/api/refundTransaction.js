const https = require('https');
const PaytmChecksum = require('paytmchecksum');
export default function handler(req, res) {
console.log(JSON.parse(req.body));
var paytmParams = {};

// Refund Of your Amount
// Change all your Details

paytmParams.body = {
    "mid"          : "TvobXq25742928665683",
    "txnType"      : "REFUND",
    "orderId"      : "1656573962979",
    "txnId"        : "e51e1681eb234e0fbd3ab11a3f6724201656573958936",
    "refId"        : "20001",
    "refundAmount" : "100.00",
};


PaytmChecksum.generateSignature(JSON.stringify(paytmParams.body), "2@y1CQG#v1dkI53Y").then(function(checksum){

    paytmParams.head = {
        "signature"  : checksum
    };

    var post_data = JSON.stringify(paytmParams);

    var options = {

        /* for Staging */
        hostname: 'securegw-stage.paytm.in',

        /* for Production */
        // hostname: 'securegw.paytm.in',

        port: 443,
        path: '/refund/apply',
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
            console.log('Response: ', shocket);
           res.status(200).json(shocket)
        });
    });

    post_req.write(post_data);
    post_req.end();
});
}