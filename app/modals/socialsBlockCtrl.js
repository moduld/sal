/**
 * Created by user on 04.04.17.
 */
angular.module('app')
    .controller('socialsBlockCtrl', socialsBlockCtrl);

function socialsBlockCtrl($scope, $mdDialog)
{
    $scope.closeModal = closeModal;

    function closeModal()
    {
        $mdDialog.cancel();
    }
}