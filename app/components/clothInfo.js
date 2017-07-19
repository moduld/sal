/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .component('clothInfo', {
        templateUrl: 'app/components/clothInfo.html',
        controller: clothInfoCtrl
    });

function clothInfoCtrl($scope, $timeout)
{
    var self = this;

    $scope.$on('topSliderCurrentCloth', rigthClothChange);
    $scope.$on('middleSliderCurrentCloth', leftClothChange);
    $scope.$on('bottomSliderCurrentCloth',  middleClothChange);

    self.sliderSettings = {
        centerMode: true,
        slidesToShow: 1,
        infinite: false,
        initialSlide: 1,
        arrows: false,
        centerPadding: 0,
        variableWidth: true,
        accessibility: true
    };

    self.rightClotsReady = false;
    self.middleClothReady = false;
    self.leftClothReady = false;

    function rigthClothChange(event, data)
    {
        // console.log(data)
        self.rightClothData = data;
        self.rightClotsReady = true;
    }

    function middleClothChange(event, data)
    {
        console.log(data)
        self.middleClothData = data;
        self.middleClothReady = true;
    }

    function leftClothChange(event, data)
    {
        console.log(data)
        self.leftClothData = data;
        self.leftClothReady = true;
    }


}