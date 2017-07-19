/**
 * Created by user on 10.04.17.
 */

angular.module('app')
    .directive('slickSlider', slickSlider);

function slickSlider($timeout)
{
    var directive = {
        restrict: 'A',
        link: linkFunction
    };

    return directive;

    function linkFunction (scope, element, attrs)
    {
        var timeout = $timeout(runSliders, 0);

        var sliderRun = false;

        function runSliders()
        {

            var containerWidth = $('.container-man').width();
            $(window).on('resize', onResize);

            function onResize()
            {
                var currentContainerWidth =  $('.container-man').width();

                if( settings.customKey && containerWidth !== currentContainerWidth){
                    $(element).slick('unslick');
                    $(window).off('resize', onResize);
                    runSliders();
                }

                if (!settings.customKey && $(window).width() >= 769 && sliderRun){
                    $(element).slick('unslick');
                    sliderRun = false;
                    console.log($(window).width())
                }

                if (!settings.customKey && $(window).width() < 769 && !sliderRun){
                    $(element).slick(settings);
                    sliderRun = true;
                }

            }

           var settings = scope.$eval(attrs.slickSlider);


            if (settings.customKey === 'topSlider'){

                scope.$on('sl_top_left', function ()
                {
                    $(element).slick('slickNext');
                });
                scope.$on('sl_top_right', function ()
                {
                    $(element).slick('slickPrev');
                });
                $(element).on('afterChange', function(event, slick, currentPosition)
                {
                    scope.$parent.$broadcast('topSliderChangedPosition', currentPosition);

                    var timeout = $timeout(function () {
                        scope.$parent.topSliderNotStarted = false;
                        $timeout.cancel(timeout)
                    }, 0)
                });

                $(element).slick(settings);

                $(element).slick('slickGoTo', scope.$parent.currentIndexes.top, true);
            }

            if (settings.customKey === 'middleSlider'){

                scope.$on('sl_middle_left', function ()
                {
                    $(element).slick('slickNext');
                });
                scope.$on('sl_middle_right', function ()
                {
                    $(element).slick('slickPrev');
                });
                $(element).on('afterChange', function(event, slick, currentPosition)
                {
                    scope.$parent.$broadcast('middleSliderChangedPosition', currentPosition);
                    var timeout = $timeout(function () {
                        scope.$parent.middleSliderNotStarted = false;
                        $timeout.cancel(timeout)
                    }, 0)
                });

                $(element).slick(settings);

                $(element).slick('slickGoTo',  scope.$parent.currentIndexes.middle, true)
            }

            if (settings.customKey === 'bottomSlider'){

                scope.$on('sl_bottom_left', function ()
                {
                    $(element).slick('slickNext');
                });
                scope.$on('sl_bottom_right', function ()
                {
                    $(element).slick('slickPrev');
                });
                $(element).on('afterChange', function(event, slick, currentPosition)
                {
                    scope.$parent.$broadcast('bottomSliderChangedPosition', currentPosition);

                    var timeout = $timeout(function () {
                        scope.$parent.bottomSliderNotStarted = false;
                        $timeout.cancel(timeout)
                    }, 0)

                });

                $(element).slick(settings);

                $(element).slick('slickGoTo',  scope.$parent.currentIndexes.bottom, true)
            }

            if (!settings.customKey && $(window).width() < 769 && !sliderRun){
                $(element).slick(settings);
                sliderRun = true;
            }

            $timeout.cancel(timeout)

        }
    }
}

