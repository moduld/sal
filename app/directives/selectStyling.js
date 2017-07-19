/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .directive('selectStyling', selectStyling);

function selectStyling()
{
    var directive = {
        restrict: 'A',
        link: linkFunction
    };

    return directive;

    function linkFunction(scope, element, attrs)
    {
        $(element).select2(scope.$eval(attrs.selectStyling));
    }
}