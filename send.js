var amqp = require('amqplib/callback_api');
const express = require('express')
const app = express()
const port = 3000

app.get('/:data', (req, res) => {

    amqp.connect({protocol: 'amqp',hostname: '10.104.102.101',vhost: 'storage-collector-dev'}, function(error0, connection) {
        if (error0) {
            res.json({
                "status": error0,
            })
        }
        console.log(connection)
        connection.createChannel(function(error1, channel) {
            if (error1) {
                res.json({
                    "status": error0,
                })
            }
            var queue = 'youniq.microservices.branddetection.emailbrandnotfoundevent';
            var msg = req.params.data;

            // channel.assertQueue(queue, {
            //     durable: false
            // });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });
        res.json({
            "status": "success",
        })
    });

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
