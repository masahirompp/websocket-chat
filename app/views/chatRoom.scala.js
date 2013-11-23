@(username: String)(implicit r: RequestHeader)

var app = angular.module('app', []);

app.controller('chatRoomAppController', function($scope) {
  
    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
    var chatSocket = new WS("@routes.Application.chat(username).webSocketURL()");

    $scope.sendTrack = function(e) {
      if (e.keyCode === 13) {
          chatSocket.send(JSON.stringify(
              //{text: $scope.selectedTrack = ""}
              {text: new track()}
          ));
         
          $scope.track = '';
      }
    };

    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);

        // Handle errors
        if(data.error) {
            chatSocket.close();
            $scope.error = data.error;
            return;
        } else {
            $scope.error = '';
        }

        // Create the message element
        var el = $('<div class="message"><span></span><p></p></div>');
        $("span", el).text(data.user);
        $("p", el).text(data.message);
        $(el).addClass(data.kind);
        if(data.user == '@username') $(el).addClass('me');
        $('#messages').append(el);

        // Update the members list
        $("#members").html('');
        $(data.members).each(function() {
            var li = document.createElement('li');
            li.textContent = this;
            $("#members").append(li);
        });
    }

});
