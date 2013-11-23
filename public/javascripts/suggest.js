function SuggestCtrl($scope) {

  var baseUrl = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?term=@term&country=JP&entity=musicTrack';

  $scope.term = "";

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

  $scope.addTrack = function(track) {
    alert("add!!");
  };
}