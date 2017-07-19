/**
 * Created by User on 18.04.2017.
 */
angular.module('app')
    .factory('addLoadFalsePropertyForImg', addLoadFalsePropertyForImg);

function addLoadFalsePropertyForImg()
{
    var factory = {
        addFalseProperty: addFalseProperty
    };

    return factory;

    function addFalseProperty(array)
    {
        array && array.forEach(function (item)
        {
            item.loaded = false;

        });

        return array


    }


}