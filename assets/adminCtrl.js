module.exports = function ($scope, io) {
  $scope.users = [];
  $scope.flairAppError = "";
  $scope.adminok = {
    appFlair: {}
  };
  $scope.adminspin = {
    appFlair: {}
  };

  $scope.denyApp = function (id, $index) {
    var url = "/flair/app/deny";
    $scope.flairAppError = "";

    io.socket.post(url, {id: id}, function (data, res) {
      if (res.statusCode === 200) {
        $scope.flairApps.splice($index, 1);
        $scope.$apply();
      } else {
        $scope.flairAppError = "Couldn't deny, for some reason.";
        $scope.$apply();
        console.log(data);
      }
    });
  };

  $scope.approveApp = function (id, $index) {
    $scope.adminok.appFlair[id] = false;
    $scope.adminspin.appFlair[id] = true;
    $scope.flairAppError = "";
    var url = "/flair/app/approve";

    io.socket.post(url, {id: id}, function (data, res) {
      if (res.statusCode === 200) {
        $scope.adminok.appFlair[id] = true;
        $scope.flairApps.splice($index, 1);
      } else {
        $scope.flairAppError = "Couldn't approve, for some reason.";
        console.log(data);
      }
      $scope.adminspin.appFlair[id] = false;
      $scope.$apply();
    });
  };
};
