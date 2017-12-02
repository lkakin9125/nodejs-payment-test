
var io = null;
var clientMap = {};
/**
 * make use of server of to init io object
 * @param {object} server 
 */
function init(server) {
    io = require('socket.io', { rememberTransport: false, transports: ['WebSocket', 'Flash Socket', 'AJAX long-polling'] })(server);
    io.on('connection', (client) => {

        console.log(`on connection, client.ip : `, client);
        var time = new Date().getTime();
        clientMap[`${time}`] = client;

        client.on('disconnect', function () {
            console.log(`io disconnect`);
            delete clientMap[`${time}`];
        });

    });
}
/**
 * send a message to all client with us
 * @param {string} channel 
 * @param {string} message 
 */
function sendToAllClient(channel, message) {
    for (var key in clientMap) {
        try {
            if (clientMap[key]) {
                clientMap[key].emit(channel, message);
            }
        } catch (e) {
            console.error('sendToAllClient error');
            console.error(e);
        }
    }
}

export default {
    init,
    sendToAllClient
}

