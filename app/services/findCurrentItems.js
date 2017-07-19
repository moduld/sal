/**
 * Created by user on 07.04.17.
 */
angular.module('app')
    .factory('findCurrentItems', findCurrentItems);


function findCurrentItems ()
{
    var factory = {
        findItemIndex: findItemIndex
    };

    return factory;

    function findItemIndex(clothesArr, id)
    {
        for (var i = 0; i < clothesArr.length; i++){
            if (clothesArr[i].id == id){
                return i
            }
        }
        return 0
    }

}