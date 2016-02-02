(function() {
    'use strick';
    var app = angular.module('main',[])
        .controller('ChatCtrl', function($scope) {
            var socket = io.connect('http://localhost:8090');
            var self = this;
            self.msgs={};
            self.login = function(user) {
                socket.emit('login', {
                    user: user
                })
                //after login, can show online user list and msg panel
                socket.on('online.users',function(data){
                    console.log('online.user', data)
                    self.onlineUsers=data.users;
                    $scope.$digest();
                });
                socket.on('msg', function(data) {
                    self.msgs[data.from] = data.msg;
                    $scope.$digest();
                });
            }

            self.chat = function(msg) {
                socket.emit('msg', {
                    to: self.to,
                    msg: msg
                })

            }
            self.select = function(usr,e) {
                self.to = usr;
                $('.active').removeClass('active');
                angular.element(e.target).addClass('active');
            }
            
        })
})();
