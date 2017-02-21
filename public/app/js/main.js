/**
 * Created by itunu.babalola on 1/11/17.
 */
require.config({
    removeCombined: true,
    paths :{
        "angular" : "/app/js/angular-lib-min",
        "app" : "/app/js/app",
        "Directives" :"/app/js/directives-lib-min",
        "Services" : "/app/js/services-lib-min",
        "Controllers" : "/app/js/controller-libs-min"


    },

    shim :{
        angular :{
            exports : "angular"
        },

        ngRoute  :{
            deps: ['angular']
        },

        app :{
            deps : ["angular", "Services","Controllers","Directives"]
        },


        Services : {
            deps :["angular"]
        },

        Controllers :{
            deps :["angular", "Services"]
        },
        Directives :{
            deps :["angular","Services","Controllers"]
        }

    },

    baseUrl: 'app/'


});

require(["app"],
    function (App) {
        App.initialize();
    }
);
