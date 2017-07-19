/**
 * Created by User on 19.04.2017.
 */

angular.module('app')
    .directive('addScopeToClonedItems', addScopeToClonedItems);

function addScopeToClonedItems($timeout, $compile)
{
    var directive = {
        restrict: 'A',
        link: linkFunction
    };

    return directive;

    function linkFunction(scope, element)
    {
        var timeout = $timeout(function ()
        {
           var blocks = $(element).find('.slick-cloned');
            for (var i = 0; i < blocks.length; i++){
               var newScope = scope.$parent.$new(true);
                newScope.item = {};
                newScope.item.loaded = false;
                newScope.$index = blocks[i].getAttribute('data-id');
                var imgs = $(blocks[i]).find('.slider_img[data-source]');

                var src = $(imgs[0]).attr('data-source');

                $(imgs[0]).attr('ng-src', src);

                var compiled = $compile($(blocks[i]).html())(newScope);
                $(blocks[i]).html(compiled);
                scope.$apply();
                clearTimeout(timeout)
           }
        }, 0);

    }
}