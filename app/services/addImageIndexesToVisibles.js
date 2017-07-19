/**
 * Created by User on 25.04.2017.
 */
angular.module('app')
    .factory('addImageIndexesToVisibles', addImageIndexesToVisibles);

function addImageIndexesToVisibles()
{
    var factory = {
        makeArrayOfVisibleImg: makeArrayOfVisibleImg
    };

    return factory;

   function makeArrayOfVisibleImg(arrayLength, data, shownIndexes)
   {
       if (data > 1 && data < arrayLength - 2){
           var newIndexes = [data - 2, data - 1 , data, data + 1, data + 2];
       }
       if (data == 1){
           var newIndexes = [arrayLength - 1, 0 , data, data + 1, data + 2];
       }
       if (data == 0){
           var newIndexes = [arrayLength - 2, arrayLength - 1, data, data + 1, data + 2];
       }
       if (data == arrayLength - 2){
           var newIndexes = [data - 2, data - 1, data, arrayLength - 1, 0];
       }
       if (data == arrayLength - 1){
           var newIndexes = [data - 2, data - 1, data, 0, 1];
       }
       newIndexes = newIndexes.filter(function (item)
       {
           return shownIndexes.indexOf(item) < 0
       });

       var result = shownIndexes.concat(newIndexes);

       return result;

   }


}