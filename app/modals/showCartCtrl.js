/**
 * Created by user on 04.04.17.
 */
angular.module('app')
    .controller('showCartCtrl', showCartCtrl);

function showCartCtrl($scope, $mdDialog)
{
    $scope.closeModal = closeModal;

    function closeModal()
    {
        $mdDialog.cancel();
    }
}