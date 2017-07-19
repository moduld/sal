/**
 * Created by user on 03.04.17.
 */
angular.module('app')
    .directive('changeNavOnScroll', changeNavOnScroll);

function changeNavOnScroll()
{
    var directive = {
        restrict: 'A',
        link: linkFunction
    };

    return directive;

    function linkFunction(scope, element)
    {
        window.addEventListener('scroll', onScroll);
        function onScroll()
        {
            var win_width = window.innerWidth;
            var scrolled = window.pageYOffset || document.documentElement.scrollTop;
            if (win_width > 550){
                scrolled ? element.addClass('scrolled_navbar') : element.removeClass('scrolled_navbar');
            }
        }
    }
}