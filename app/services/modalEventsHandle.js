/**
 * Created by user on 04.04.17.
 */
angular.module('app')
    .factory('modalEventsHandle', modalEventsHandle);

function modalEventsHandle()
{
    var factory = {
        handleCollectionDetails: handleCollectionDetails,
        handleSocialBlock: handleSocialBlock,
        handleUserDetails: handleUserDetails
    };

    return factory;

    function handleCollectionDetails(data)
    {

    }

    function handleSocialBlock(data)
    {

    }

    function handleUserDetails(data)
    {

    }
}