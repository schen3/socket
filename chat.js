var init = function(server) {
var io = require('socket.io')(server);
var sockets = {};
io.on('connection', function(socket) {
    var curUser;
    socket.on('login', function(data) {
        var user = data.user;
        if (!user) {
            socket.emit('error', {
                msg: 'user is needed'
            });
            return;
        }
        curUser = user;
        //regist to global
        sockets[user] = socket;
        sendOnlineUsers();
        /**
         *msg should be like
         *{
         * to:'another
         * msg:' ....'
         *}
         */
        socket.on('msg', function(data) {

            console.log('msg', data);
            socket.emit('onmsg', {
                status: 1
            })
            if (data && data.to && sockets[data.to]) {
                //TODO, data.to is valid user
                sockets[data.to].emit('msg', {
                    from: user,
                    msg: data.msg
                });
                return;
            }
            //TODO: offline msg
        });
    });
    socket.on('my other event', function(data) {
        console.log('on other', data);
        socket.emit('end', {
            msg: 'end'
        });
    });
    socket.on('disconnect', function() {
        console.log('disconnect');
        delete sockets[curUser]
    });
    var sendOnlineUsers = function() {
        var users = [];
        for (var user in sockets) {
            users.push(user);
        }
        socket.emit('online.users', {
            users: users
        });
    }
    });
};
module.exports = init;
