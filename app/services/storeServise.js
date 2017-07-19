/**
 * Created by user on 30.03.17.
 */
angular.module('app')
    .factory('storeService', storeService);

function storeService()
{
    var store = {
        getToken: getToken,
        saveToken: saveToken
    };

    return store;

    function getToken()
    {
        return  localStorage.getItem('shake_a_look') && JSON.parse(localStorage.getItem('shake_a_look')) || ''
    }

    function saveToken(token)
    {
        console.log(token)
        localStorage.setItem('shake_a_look', JSON.stringify(token))
    }
}