/**
 * Created by itunu.babalola on 1/24/17.
 */
function myDirectives() {
    var self = this;
    var directives = {};

    self.directives= function () {
        return{
            restrict :'AE',
            scope :{},
            link: function (scope,element,attr,contacts) {
               element.innerText('huh');
            }

        }

    }


    return directives;
}


