function SuggestCtrl($scope) {

  var baseUrl = 'http://ax.itunes.apple.com/WebObjects/MZStoreServices.woa/wa/wsSearch?term=perfume&country=JP&entity=musicTrack';

  $.ajax({
    url: baseUrl,
    dataType: 'jsonp',
    success: function(data){
      alert(data.results[0].trackName);
      $scope.tracks = data.results;
    },
    error: function(data){
      alert('error');
    }
  });
}