const https = require("https");
const PaytmChecksum = require("paytmchecksum");

// Paytm Transaction
export default async function handler(req, res) {
  if (req.method == "POST") {
    var paytmParams = {};

    // Paytm Body 
    {/*
    OrderId:- Change your order Id with Math.Random And Current Date
    Value:- Amount of Product
    */}
    paytmParams.body = {
      requestType: "Payment",
      mid: process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID,
      websiteName: NEXT_PUBLIC_Website_NAME,
      orderId: "2042",
      callbackUrl: `http://localhost:3000/api/postTransaction`,
      txnAmount: {
        value: "1.00",
        currency: "INR",
      },
      userInfo: {
        custId: "CUST_001",
      },
    };
    const checksum = await PaytmChecksum.generateSignature(
      JSON.stringify(paytmParams.body),
      process.env.PAYTM_MERCHANT_KEY
    );
    paytmParams.head = {
      signature: checksum,
    };
    var post_data = JSON.stringify(paytmParams);
    const requestAsync = () => {
      return new Promise((resolve, reject) => {
        // Change Order Value
        var options = {
          hostname: "securegw-stage.paytm.in",
          port: 443,
          path: `/theia/api/v1/initiateTransaction?mid=${process.env.NEXT_PUBLIC_PAYTM_MERCHANT_ID}&orderId=2042`,
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Content-Length": post_data.length,
          },
        };
        var response = "";
        var post_req = https.request(options, function (post_res) {
          post_res.on("data", function (chunk) {
            response += chunk;
          });
          post_res.on("end", function () {
            const shocket = JSON.parse(response);
            console.log("Response: ", shocket);
            res.status(200).json(shocket);
            resolve(response);
          });
        });
        post_req.write(post_data);
        post_req.end();
      });
    };
    await requestAsync();
  }
}
