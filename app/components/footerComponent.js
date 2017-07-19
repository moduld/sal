/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .component('footerComponent', {
        templateUrl: 'app/components/footerComponent.html',
        controller: footerComponentCtrl
    });

function footerComponentCtrl(showModal)
{
    var self = this;

    self.showUserDetailsModal = showUserDetailsModal;
    self.showInfoModal = showInfoModal;

    function showUserDetailsModal()
    {
        showModal.showUserDetails()
    }

    function showInfoModal(flag)
    {
        showModal.showHelpAndAbout(flag)
    }
}