/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .controller('collectionDetailsCtrl', collectionDetailsCtrl);

function collectionDetailsCtrl($scope, $mdDialog, text)
{
    console.log(text)
    $scope.closeModal = closeModal;

    function closeModal()
    {
        $mdDialog.cancel();
    }
}