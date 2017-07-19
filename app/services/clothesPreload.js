/**
 * Created by User on 14.04.2017.
 */
angular.module('app')
    .factory('clothesPreload', clothesPreload);

function clothesPreload()
{
    var methods = {
        defaultClothes: defaultClothes
    };

    return methods;

    function defaultClothes(items, scopeObject, compScope)
    {
        for (var key in items){
            var img = document.createElement('img');
            if (items[key].name != undefined){
                img.setAttribute('pos', items[key].name);
                img.src = items[key].image;
            }
            if (key == 'mannequin'){
                img.setAttribute('mann', 'mann');
                img.src = items.mannequin;
            }


            img.addEventListener('load', listenerEvent);

            function listenerEvent (event)
            {
                if(event.target.getAttribute('pos') === 'top'){
                    scopeObject.topLoaded = true;
                }
                if(event.target.getAttribute('pos') === 'middle'){
                    scopeObject.middleLoaded = true;
                }
                if(event.target.getAttribute('pos') === 'bottom'){
                    scopeObject.bottomLoaded = true;
                }
                if(event.target.getAttribute('mann')){
                    scopeObject.bodyLoaded = true;
                }

                if (scopeObject.bodyLoaded && scopeObject.topLoaded && scopeObject.middleLoaded && scopeObject.bottomLoaded){
                    compScope.$broadcast('defaultClothesAndMannequineSuccess')
                }

                event.target.removeEventListener('load', listenerEvent);
            }

        }
        return scopeObject.bodyLoaded && scopeObject.topLoaded && scopeObject.middleLoaded && scopeObject.bottomLoaded
    }

}