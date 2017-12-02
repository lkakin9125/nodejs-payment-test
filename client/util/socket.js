
import io from 'socket.io-client';
import Config from '../config';
var socket = null;
var disconnectCallbackMap = {};
var allChannelSocketCallback = {};
/**
 * connect to socket server in config
 * @param {function} callback 
 */
function connectSocket(callback) {
    socket = io('http://localhost:3000/')
    if (callback) {
        socket.on('connect', callback)
    }
    socket.on('disconnect', () => {
        for (var key in disconnectCallbackMap) {
            if (disconnectCallbackMap[key]) {
                disconnectCallbackMap[key]();
            }
        }
    })
}
/**
 * add disconnect listener
 * @param {string} tag 
 * @param {function} callback 
 */
function addDisconnectCallback(tag, callback) {
    disconnectCallbackMap[tag] = callback;
}
/**
 * remove disconnect listener
 * @param {string} tag 
 */
function removeDisconnectCallback(tag) {
    delete disconnectCallbackMap[tag];
}
/**
 * add listener to the channel, if no listener before, add listen to the channel
 * @param {string} channel 
 * @param {string} tag 
 * @param {function} callback 
 */
function addChannelListener(channel, tag, callback) {
    if (allChannelSocketCallback[channel]) {
        allChannelSocketCallback[channel][tag] = callback
    } else {
        allChannelSocketCallback[channel] = { [tag]: callback };
        socket.on(channel, (data) => {
            for (var key in allChannelSocketCallback[channel]) {
                if (allChannelSocketCallback[channel][key]) {
                    allChannelSocketCallback[channel][key](data);
                }
            }
        })
    }
}
/**
 * remove listener from the channel
 * @param {string} channel 
 * @param {string} tag 
 */
function removeChannelListener(channel, tag) {
    if (allChannelSocketCallback[channel]) {
        delete allChannelSocketCallback[channel][tag]
    }
}

export default {
    connectSocket,
    addDisconnectCallback,
    removeDisconnectCallback,
    addChannelListener,
    removeChannelListener
}