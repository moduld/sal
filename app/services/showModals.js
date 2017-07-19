/**
 * Created by user on 04.04.17.
 */
angular.module('app')
    .factory('showModal', showModal);

function showModal($mdDialog, modalEventsHandle)
{
    var factory = {
        showCollectionDetails: showCollectionDetails,
        showSocialBlock: showSocialBlock,
        showUserDetails: showUserDetails,
        showHelpAndAbout: showHelpAndAbout,
        showCart: showCart,
        showFirstTimeModal: showFirstTimeModal
    };

    var helpAndAboutContent = {
        help: {
            title: 'Help',
            text: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, totam.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur dignissimos distinctio ipsum itaque. Distinctio dolorum ducimus possimus quibusdam suscipit!']
        },
        about: {
            title: 'About',
            text: ['Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aperiam, totam.', 'Lorem ipsum dolor sit amet.', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi consequuntur dignissimos distinctio ipsum itaque. Distinctio dolorum ducimus possimus quibusdam suscipit!']
        }
    };

    return factory;

    function showCollectionDetails(text)
    {
            $mdDialog.show({
            controller: collectionDetailsCtrl,
            templateUrl: 'app/modals/collectionDetails.html',
            clickOutsideToClose: false,
            locals : {
                    text : text
            }
        }).then(function (answer) {
            console.log(answer)
                modalEventsHandle.handleCollectionDetails()
        }, function (error) {
            console.log(error)

        });
    }

    function showSocialBlock()
    {
        return $mdDialog.show({
            controller: socialsBlockCtrl,
            templateUrl: 'app/modals/socialsBlock.html',
            clickOutsideToClose: false
        }).then(function (answer) {
            modalEventsHandle.handleSocialBlock()
        }, function (error) {

        });
    }

    function showUserDetails()
    {
        $mdDialog.show({
            controller: userDetailsCtrl,
            controllerAs: 'ctrl',
            templateUrl: 'app/modals/userDetails.html',
            clickOutsideToClose: false
        }).then(function (answer) {
            modalEventsHandle.handleUserDetails()
        }, function (error) {

        });
    }

    function showHelpAndAbout(flag)
    {
        $mdDialog.show({
            controller: helpAndAboutCtrl,
            templateUrl: 'app/modals/helpAndAbout.html',
            clickOutsideToClose: false,
            locals : {
                content : flag ? helpAndAboutContent.about : helpAndAboutContent.help
            }
        }).then(function (answer) {

        }, function (error) {

        });
    }

    function showCart()
    {
        $mdDialog.show({
            controller: showCartCtrl,
            templateUrl: 'app/modals/showCart.html',
            clickOutsideToClose: false

        }).then(function (answer) {

        }, function (error) {

        });
    }

    function showFirstTimeModal()
    {
        $mdDialog.show({
            controller: firstTimeLogInWindowCtrl,
            templateUrl: 'app/modals/firstTimeLogInWindow.html',
            clickOutsideToClose: false

        }).then(function (answer) {

        }, function (error) {

        });
    }
}