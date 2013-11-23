@(username: String)(implicit r: RequestHeader)

function chatRoomAppController($scope) {
  
    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
    var chatSocket = new WS("@routes.Application.chat(username).webSocketURL()");

    // init models
    $scope.error = false;
    $scope.messages = [];

    // handle errors
    chatSocket.onerror = function(error) {
        chatSocket.close();
        $scope.$apply(function() { $scope.error = error; });
    };

    // add track (&& send track to all user)
    $scope.addTrack = function(track) {
        // FIXME: send simple object for test.
        chatSocket.send({text: JSON.stringify(new Object())});
        //chatSocket.send({text: JSON.stringify(track)});
        $scope.term = '';
    };

    // on receive message
    chatSocket.onmessage = function(e) {
        alert('onmessage: ' + e.data);
      
        var data = JSON.parse(e.data);
       
        $scope.$apply(function() {
            // Create the message element
            $scope.messages.push({
                user: data.user,
                message: data.message,
                kind: data.kind,
                me: data.user === '@username'
            });

            // Update the members list
            $scope.members = data.members;
        });
    };

}
