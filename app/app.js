angular.module('app', ['ngMaterial'])
    .config(function($mdThemingProvider, $locationProvider) {
    //     $mdThemingProvider.disableTheming();
        $mdThemingProvider.theme('shakeAndLook')
            .primaryPalette('blue')
            .accentPalette('cyan')
            .warnPalette('red');
        $mdThemingProvider.setDefaultTheme('shakeAndLook');
        $locationProvider.html5Mode(true);
    })
    .run(function(storeService, requestService, $location, $rootScope)
    {
        if (storeService.getToken()){
            requestService.token = storeService.getToken().user_token;
            console.log(storeService.getToken())
            $rootScope.runWhenDataLoad = true;
            // localStorage.removeItem('shake_a_look')
        } else {
            requestService.newUserAuth().then(userCreatedSuccess).catch(userCreatedError)
        }

        function userCreatedSuccess(response)
        {
            storeService.saveToken(response.data.data);
            requestService.token = storeService.getToken().user_token;
            $rootScope.runWhenDataLoad = true;
        }
        function userCreatedError(error)
        {
            console.log(error)
        }

    });
