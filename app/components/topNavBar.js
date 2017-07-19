/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .component('topNavBar', {
        templateUrl: 'app/components/topNavBar.html',
        controller: topNavBarCtrl
    });

function topNavBarCtrl($scope, showModal)
{
    var self = this;

    self.showUserDetailsModal = showUserDetailsModal;
    self.showCartModal = showCartModal;

    $scope.$on('headerNameChange', function (event, data)
    {
       // console.log(data)
        self.title = data.name;
    });

    function showUserDetailsModal()
    {
        showModal.showUserDetails()
    }

    function showCartModal()
    {
        showModal.showCart()
    }
}