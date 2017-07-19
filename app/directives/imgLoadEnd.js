/**
 * Created by user on 05.04.17.
 */
angular.module('app')
    .directive('imgLoadEnd', imgLoadEnd);

function imgLoadEnd()
{
    var directive = {
        restrict: 'A',
        link: linkFunction
    };

    return directive;

    function linkFunction(scope, element, attrs)
    {
        $(element).on('load', changeLoadStatus);
        function changeLoadStatus()
        {
            scope.item.loaded = true;
            scope.$apply();
            $(element).off('load', changeLoadStatus)
        }
    }
}