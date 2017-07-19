/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .component('headerSlider', {
        templateUrl: 'app/components/headerSlider.html',
        controller: headerSliderCtrl
    });

function headerSliderCtrl($rootScope, $scope, showModal, requestService, storeService, findCurrentItems, $location, clothesPreload, addLoadFalsePropertyForImg, addImageIndexesToVisibles)
{
    var self = this;
    //mannequine_id=5&collection_id=4&top_id=3&middle_id=5&bottom_id=10

    var locationParams = $location.path().replace('/', '');
    var startCollection = locationParams !== '';

    var restoredData;

    $scope.currentIndexes = {
        top: 0,
        middle: 0,
        bottom: 0
    };
    $scope.headerSliderLoaded = {
        bodyLoaded: false,
        topLoaded: false,
        middleLoaded: false,
        bottomLoaded: false
    };
    $scope.topSliderNotStarted = true;
    $scope.middleSliderNotStarted = true;
    $scope.bottomSliderNotStarted = true;

    $scope.showImgFlag = false;
    self.runTopSlider = false;
    self.runMiddleSlider = false;
    self.runBottomSlider = false;
    self.topSectionClothes = [];
    self.middleSectionClothes = [];
    self.bottomSectionClothes = [];

    $scope.shownTopIndexes = [];
    $scope.shownMiddleIndexes = [];
    $scope.shownBottomIndexes = [];

    self.topSliderSettings = {
        centerMode: true,
        slidesToShow: 3,
        arrows: false,
        centerPadding: 0,
        variableWidth: true,
        accessibility: false,
        customKey: 'topSlider'
    };

    self.middleSliderSettings = {
        centerMode: true,
        slidesToShow: 3,
        arrows: false,
        centerPadding: 0,
        variableWidth: true,
        accessibility: false,
        customKey: 'middleSlider'
    };

    self.bottomSliderSettings = {
        centerMode: true,
        slidesToShow: 3,
        arrows: false,
        centerPadding: 0,
        variableWidth: true,
        accessibility: false,
        customKey: 'bottomSlider'
    };

    self.callModal = callModal;
    self.makeSwiperStep = makeSwiperStep;

    activate();

    function activate()
    {
        $scope.$on('defaultClothesAndMannequineSuccess', function ()
        {
            $scope.showImgFlag = true;
            var coll_id = startCollection ? restoredData.collection_id : 4;
            requestService.getClothIdInCollection(coll_id).then(arrayOfIdClothesSuccess).catch(arrayOfIdClothesError)
        });

        $scope.$on('topSliderChangedPosition', function (event, data)
        {
            $scope.shownTopIndexes = addImageIndexesToVisibles.makeArrayOfVisibleImg(self.topSectionClothes.length, data, $scope.shownTopIndexes);
            self.topClothPrice = self.topSectionClothes[data].productPrice.price;
            $rootScope.$broadcast('topSliderCurrentCloth', self.topSectionClothes[data])
        });

        $scope.$on('middleSliderChangedPosition', function (event, data)
        {
            $scope.shownMiddleIndexes = addImageIndexesToVisibles.makeArrayOfVisibleImg(self.middleSectionClothes.length, data, $scope.shownMiddleIndexes);
            self.middleClothPrice = self.middleSectionClothes[data].productPrice.price;
            $rootScope.$broadcast('middleSliderCurrentCloth', self.middleSectionClothes[data])
        });

        $scope.$on('bottomSliderChangedPosition', function (event, data)
        {
            $scope.shownBottomIndexes = addImageIndexesToVisibles.makeArrayOfVisibleImg(self.bottomSectionClothes.length, data, $scope.shownBottomIndexes);
            self.bottomClothPrice = self.bottomSectionClothes[data].productPrice.price;
            $rootScope.$broadcast('bottomSliderCurrentCloth', self.bottomSectionClothes[data])
        });

        startCollection ? requestService.restoreLooks(locationParams).then(restoredDataSuccess).catch(restoredDataError) :
            requestService.getCurrentUserManequien().then(mannequineRequestSuccess).catch(mannequineRequestError);

        function restoredDataSuccess(response)
        {
            // console.log(response)
            restoredData = response.data.data;
            requestService.getAllMannequins().then(mannequineRequestSuccess).catch(mannequineRequestError)
        }
        function restoredDataError(error)
        {

        }

        function mannequineRequestSuccess(response)
        {
            // requestService.getGroupList().then(function (request) {
            //     console.log(request)
            // }).catch(function () {
            //
            // })
            requestService.getCollectionList("GROUP_NEW_COLLECTIONS").then(function (request) {
                console.log(request)
                $rootScope.$broadcast('headerNameChange', request.data.data.items[4])
            }).catch(function () {

            })


            console.log('startCollection', startCollection);
            console.log(response)
           if (startCollection){
               var index = findCurrentItems.findItemIndex(response.data.data, restoredData.mannequin_id);
               self.mannequine = response.data.data[index].mannequin;
               storeService.currentMannequineId = response.data.data[index].id;
               clothesPreload.defaultClothes(response.data.data[index],  $scope.headerSliderLoaded, $scope);
           } else {
               self.mannequine = response.data.data.mannequin;
               storeService.currentMannequineId = response.data.data.id;
               clothesPreload.defaultClothes(response.data.data,  $scope.headerSliderLoaded, $scope);
           }

            requestService.getDefaultMannequineClothes().then(defaultClothSuccess).catch(defaultClothError);
        }

        function mannequineRequestError(error)
        {
            console.log(error)
        }

        function defaultClothSuccess(response)
        {
            // console.log(response)
            self.defaultTop = response.data.data[1].image;
            self.defaultMiddle = response.data.data[2].image;
            self.defaultBottom = response.data.data[3].image;
            clothesPreload.defaultClothes(response.data.data,  $scope.headerSliderLoaded, $scope)

        }

        function defaultClothError(error)
        {
            console.log(error)
        }
    }




    function callModal(flag)
    {
        flag ? showModal.showCollectionDetails('qqqqqqq') : showModal.showSocialBlock()
    }


    function arrayOfIdClothesSuccess(response)
    {
        // console.log(response)
        response.data.data[1].items.length && requestService.getClothForTopSection(response.data.data[1].items).then(topClothSuccess).catch(commonClothError);
        response.data.data[2].items.length && requestService.getClothForMiddleSection(response.data.data[2].items).then(middleClothSuccess).catch(commonClothError);
        response.data.data[3].items.length && requestService.getClothForBottomSection(response.data.data[3].items).then(bottomClothSuccess).catch(commonClothError);
    }

    function topClothSuccess(response)
    {
        // console.log(response)
        if (startCollection){
            $scope.currentIndexes = {
                top: findCurrentItems.findItemIndex(response.data.data, restoredData.top_id)
            };
        }
        self.topSectionClothes =  addLoadFalsePropertyForImg.addFalseProperty(response.data.data);
        self.runTopSlider = true;
    }

    function middleClothSuccess(response)
    {
        if (startCollection){
            $scope.currentIndexes = {
                middle: findCurrentItems.findItemIndex(response.data.data,  restoredData.middle_id)
            };
        }
        self.middleSectionClothes = addLoadFalsePropertyForImg.addFalseProperty(response.data.data);
        self.runMiddleSlider = true;
    }

    function bottomClothSuccess(response)
    {
        if (startCollection){
            $scope.currentIndexes = {
                bottom:  findCurrentItems.findItemIndex(response.data.data,  restoredData.bottom_id)
            };
        }
        self.bottomSectionClothes = addLoadFalsePropertyForImg.addFalseProperty(response.data.data);
        self.runBottomSlider = true;
    }

    function commonClothError(error)
    {
        console.log(error)
    }

    function arrayOfIdClothesError(error)
    {
        console.log(error)
    }

    function makeSwiperStep(slider, flag)
    {
        if (slider === 'top'){
            flag ? $scope.$broadcast('sl_top_left') : $scope.$broadcast('sl_top_right')
        }
        if (slider === 'middle'){
            flag ? $scope.$broadcast('sl_middle_left') : $scope.$broadcast('sl_middle_right')
        }
        if (slider === 'bottom'){
            flag ? $scope.$broadcast('sl_bottom_left') : $scope.$broadcast('sl_bottom_right')
        }

    }



}

