/**
 * Created by user on 04.04.17.
 */
angular.module('app')
    .controller('firstTimeLogInWindowCtrl', firstTimeLogInWindowCtrl);

function firstTimeLogInWindowCtrl($scope, $mdDialog)
{
    $scope.closeModal = closeModal;

    function closeModal()
    {
        $mdDialog.cancel();
    }
}