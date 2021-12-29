import * as net from 'net';

import { SimpleResponse } from './response.js';

var server = null
var port = null
var connection = null

export function setup(s, p){
    server = s
    port = p
}

function command(cmd, callback=null){

    var client = new net.Socket({allowHalfOpen: false});
    client.setEncoding("utf-8");

    if (callback !== null) client.on('data', callback)

    client.connect(port, server, function(){
        client.write(cmd)
        client.end()
    })
}

export function get(cmd, callback){
    console.debug(`get(${cmd})`)

    command(cmd, callback);
}

export function set(cmd, args, callback=null){
    console.debug(`set(${cmd}, ${args})`)

    if ( typeof args === 'array' || args instanceof Array){
        var _args = args.join(' ')
    }else{
        var _args = args
    }

    command(`${cmd} ${_args}`, callback);
}

export function dump_caps(){
    this.get('1')
}

