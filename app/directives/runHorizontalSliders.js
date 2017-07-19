/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .directive('runHorizontalSliders', runHorizontalSliders);

function runHorizontalSliders($timeout)
{
    var directive = {
        restrict: 'A',
        link: linkFunction
    };

    return directive;

    function linkFunction (scope, element, attrs)
    {
        var sly;
        $timeout(runSliders, 0);

        window.addEventListener('resize', onResize);

        function onResize()
        {
            sly.reload();
        }

        function runSliders()
        {
            var settings = scope.$eval(attrs.runHorizontalSliders);
            settings.scrollBar ? settings.scrollBar = $(element).parent().find('.scrollbar') : '';
            sly = new Sly($(element), settings).init();
            sly.toCenter('.default_slide', true);
            sly.activate();
            sly.on('active', setActiveIndex);
        }

        function setActiveIndex(name, index)
        {
            console.log(name)
            console.log(index)
            console.log(scope.$parent)
            scope.$parent.current && scope.$parent.current != index + 1 ? scope.$parent.newDefaultMannequine = index + 1 : ''
        }
    }
}