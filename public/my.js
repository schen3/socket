(function() {
    'use strict';
    var socket = io.connect('http://localhost:8090');
    socket.on('news', function(data) {
        console.log('on news', data);
        socket.emit('my other event', {
            my: 'data'
        })
    });
    socket.on('end', function(data){
        console.log('on end', data)
        setTimeout(function(){
            socket.close();
        }, 3000);
    })
})()
