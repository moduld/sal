/**
 * Created by user on 04.04.17.
 */
angular.module('app')
    .controller('helpAndAboutCtrl', helpAndAboutCtrl);

function helpAndAboutCtrl($scope, $mdDialog, content)
{
    $scope.content = content;
    $scope.closeModal = closeModal;

    function closeModal()
    {
        $mdDialog.cancel();
    }
}