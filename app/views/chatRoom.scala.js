@(username: String)(implicit r: RequestHeader)

function chatRoomAppController($scope) {
  
    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
    var chatSocket = new WS("@routes.Application.chat(username).webSocketURL()");

    // init models
    $scope.error = false;
    $scope.messages = [];

    // on receive message
    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);

        $scope.$apply(function() {
            // Handle errors
            if(data.error) {
                chatSocket.close();
                $scope.error = data.error;
                return;
            } else {
                $scope.error = '';
            }

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
