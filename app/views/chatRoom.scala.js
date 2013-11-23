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

    // send track to all user
    $scope.sendMessage = function(track) {
        chatSocket.send(
            JSON.stringify({
                text: track.trackName + ',' + encodeURIComponent(track.artworkUrl100) + ',' + track.trackTimeMillis
            })
        );
    };

    // on receive message
    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);
       
        $scope.$apply(function() {
            // Create the message element
            $scope.messages.push({
                user: data.user,
                trackName: data.message.split(',')[0],
                image: decodeURIComponent(data.message.split(',')[1]),
                trackTimeMillis: data.message.split(',')[2],
                kind: data.kind,
                me: data.user === '@username',
            });

            // Update the members list
            $scope.members = data.members;
        });
    };

}
