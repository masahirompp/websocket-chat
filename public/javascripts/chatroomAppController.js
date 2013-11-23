@(username: String)(implicit r: RequestHeader)

var chatRoomApp = angular.module('chatRoomApp', []);

chatRoomApp.controller('chatRoomAppController', function($scope) {
  
    var WS = window['MozWebSocket'] ? MozWebSocket : WebSocket;
    var chatSocket = new WS("@routes.Application.chat(username).webSocketURL()");
    
    var sendMessage = function() {
        chatSocket.send(JSON.stringify(
            //{text: $("#talk").data('selected-track')}
            {text: new track()}
        ));
     
        $scope.talk = '';
    };

    $("#talk").keypress(handleReturnKey);

    chatSocket.onmessage = function(e) {
        var data = JSON.parse(e.data);

        // Handle errors
        if(data.error) {
            chatSocket.close();
            $("#onError span").text(data.error);
            $("#onError").show();
            return;
        } else {
            $("#onChat").show();
        }

        console.log(JSON.stringify(data));

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
