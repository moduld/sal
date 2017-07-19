/**
 * Created by user on 04.04.17.
 */
angular.module('app')
    .controller('userDetailsCtrl', userDetailsCtrl);

function userDetailsCtrl($scope, $mdDialog, requestService, $timeout, storeService)
{
    var self = this;
    $scope.current;
    $scope.newDefaultMannequine;
    self.activated = false;
    self.runMannequineSlider = false;
    self.allMannequins = [];
    self.closeModal = closeModal;
    self.mannequinsListToggle = mannequinsListToggle;
    self.saveMannequine = saveMannequine;

    function closeModal()
    {
        $mdDialog.cancel();
    }

    function mannequinsListToggle(state)
    {
        if (state && !self.allMannequins.length){
            self.activated = true;
            requestService.getAllMannequins().then(mannequinGotSuccess).catch(errorHandle)
        }
    }

    function mannequinGotSuccess(request)
    {
        console.log(request);
        self.allMannequins = request.data.data;
        self.runMannequineSlider = true;
        $timeout(removeSpinner, 1000);
        for (var i = 0; i < self.allMannequins.length; i++){
            if (storeService.currentMannequineId){
                storeService.currentMannequineId === self.allMannequins[i].id ? self.allMannequins[i].currentMan = true : self.allMannequins[i].currentMan = false;
                $scope.current = storeService.currentMannequineId;
                console.log($scope.current)
            }

        }
    }

    function removeSpinner()
    {
        self.activated = false;
    }

    function errorHandle(error)
    {

    }

    function saveMannequine()
    {
        $scope.newDefaultMannequine && requestService.setDefaultMannequine($scope.newDefaultMannequine).then(mannequineSetSuccess).catch(errorHandle)
    }

    function mannequineSetSuccess(data)
    {
        console.log(data)
    }

}