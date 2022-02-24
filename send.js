var amqp = require('amqplib/callback_api');
const express = require('express')
const app = express()
const port = 3000

app.get('/:data', (req, res) => {

    amqp.connect('amqp://rabbit', function(error0, connection) {
        if (error0) {
            throw error0;
        }
        connection.createChannel(function(error1, channel) {
            if (error1) {
                throw error1;
            }
            var queue = 'hello';
            var msg = req.params.data;

            channel.assertQueue(queue, {
                durable: false
            });

            channel.sendToQueue(queue, Buffer.from(msg));
            console.log(" [x] Sent %s", msg);
        });

        setTimeout(function() {
            connection.close();
            process.exit(0)
        }, 500);
    });

})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
