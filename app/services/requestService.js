/**
 * Created by user on 28.03.17.
 */
angular.module('app')
    .factory('requestService', requestService);

requestService.$inject = ['$http', 'storeService'];

function requestService ($http, storeService)
{
    // var self = this;
    var commonUrl = 'http://api-test.shake-a-look.com/v1/';

    var paramses = 'xczvcytz234werdfv&sec_hash=bb350feded5b5979bbd6a26d726dc57f';

    // this.token = 'ntC_G4SUmnxlU-xXFRMjFfsiUOkBCnw5i-o5-l_uPGCRRXx7Pev_uNMKD-9EdtzO17UKiMOvQGIG2c6Rmq-L_myMUjwjb7uNKWVxrN9k9A7wEBGjGj8UewH9g0QyJjCrU5wFizg-NaSQTgeW2vl1Z-KMrhfvl8mIwRM28-gQMFB4fI5QgciF8UyX5rbgTMVTt_8AMEra8JMip8qFBS7WO7hQCn7D3HR6tia16aXZqtb7icQ_bn2v3efAVUpxvMZ'
    // storeService.saveToken(this.token);


    var methoods = {
        getCurrentUser: currentUser,
        getAllMannequins: getAllMannequins,
        getCurrentUserManequien: getCurrentMannequine,
        setDefaultMannequine: setMannequine,
        getDefaultMannequineClothes: getDefaultMannequineClothes,
        getClothIdInCollection: getClothIdInCollection,
        getClothForTopSection: getClothForTopSection,
        getClothForMiddleSection: getClothForMiddleSection,
        getClothForBottomSection: getClothForBottomSection,
        getGroupList: getGroupList,
        getCollectionList: getCollectionList,
        newUserAuth: newUserAuth,
        restoreLooks: restoreLooks,
        custom: customRequest
    };

    return methoods;

    function currentUser ()
    {
        var settings = {
            method: "POST",
            url: commonUrl ,
            params: {
                oauth_token: this.token
            }
        };

        return customRequest(settings)
    }

    function newUserAuth()
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'user/auth'
        };
        return customRequest(settings)
    }

    function restoreLooks(shared_key)
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'collection/restore-looks',
            params: {
                user_token: this.token,
                sec_string: paramses,
                key: shared_key
            }
        };

        return customRequest(settings)
    }

    function getAllMannequins()
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'mannequin/list',
            params: {
                user_token: this.token,
                sec_string: paramses
            }
        };
        console.log('settings', settings)

        return customRequest(settings)
    }

    function setMannequine(man_id)
    {
        console.log(man_id)
        var form = new FormData();
        form.append('id', man_id)
        var settings = {
            method: "POST",
            url: commonUrl + 'user/set-mannequin',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded'
                // 'Content-Type': 'multipart/form-data'
                // 'Content-Type': 'application/json'
            },
            params: {
                user_token: this.token,
                sec_string: paramses
            },
            data: form

        };
        return customRequest(settings)
    }

    function getGroupList()
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'group/list',
            params: {
                user_token: this.token,
                sec_string: paramses
            }
        };

        return customRequest(settings)
    }

    function getCollectionList(group_id)
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'collection/list',
            params: {
                user_token: this.token,
                sec_string: paramses,
                group_id: group_id
            }
        };

        return customRequest(settings)
    }

    function getCurrentMannequine()
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'user/get-mannequin',
            params: {
                user_token: this.token,
                sec_string: paramses
            }
        };

        return customRequest(settings)
    }

    function getClothIdInCollection(coll_id)
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'product/list',
            params: {
                user_token: this.token,
                sec_string: paramses,
                collection_id: coll_id,
                limit: 1000000
            }
        };

        return customRequest(settings)
    }

    function getClothForTopSection(array_id)
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'product/get',
            params: {
                user_token: this.token,
                sec_string: paramses,
                id: array_id.join(',')
            }
        };
        return customRequest(settings)
    }

    function getClothForMiddleSection(array_id)
    {
        // console.log(array_id)
        var settings = {
            method: "GET",
            url: commonUrl + 'product/get',
            params: {
                user_token: this.token,
                sec_string: paramses,
                id: array_id.join(',')
            }
        };
        return customRequest(settings)
    }

    function getClothForBottomSection(array_id)
    {
        // console.log(array_id)
        var settings = {
            method: "GET",
            url: commonUrl + 'product/get',
            params: {
                user_token: this.token,
                sec_string: paramses,
                id: array_id.join(',')
            }
        };
        return customRequest(settings)
    }

    function getDefaultMannequineClothes()
    {
        var settings = {
            method: "GET",
            url: commonUrl + 'section/list',
            params: {
                user_token: this.token,
                sec_string: paramses
            }
        };

        return customRequest(settings)
    }

    function customRequest(settings)
    {
        return $http(settings).then(successFunc, errorFunc)
    }

    function successFunc(data)
    {
        return data
    }

    function errorFunc(error)
    {
        return error
    }

}