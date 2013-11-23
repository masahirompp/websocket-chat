function SuggestCtrl($scope) {

  var baseUrl = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?term=@term&country=JP&entity=musicTrack';

  $scope.term = '';

  $scope.suggest = function() {

    $.ajax({
      url: baseUrl.replace('@term',$scope.term),
      dataType: 'jsonp',
      success: function(data){
        $scope.$apply(function(){
          $scope.tracks = data.results;
        });
      }
    });
  };

  // add Track
  $scope.addTrack = function(track) {
    $scope.term = track.trackName;
    $scope.sendMessage(track);
    $('#track').focus();
  };
}
