/**
 * Created by itunu.babalola on 1/11/17.
 */
module.exports = function(grunt){


    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            angular: {
                src:['!js/angular-libs.js', 'bower_components/angular/angular.js', 'bower_components/angular-route/angular-route.js','bower_components/angular-resource/angular-resource.js'],
                dest:'js/angular-libs.js'
            },

            controllers: {
                src:['!js/controller-lib.js','Controllers/userCtrl.js','Controllers/contactCtrl.js'],
                dest:'js/controller-libs.js'

            },

            services:{
                src: ['!js/services-lib.js','Services/userServices.js','!Services/contactService.js'],
                dest:'js/services-lib.js'
            },

            directives :{
                src :['!js/directives-lib.js','Directives/directives.js' ],
                dest :'js/directives-lib.js'
            }
        },

        uglify:{
            options: {
                sourceMap: false,
                mangle: false,
                compress: false,
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            angular:{
                src:'js/angular-libs.js',
                dest:'js/angular-lib-min.js'
            },

            controllers:{
                src:'js/controller-libs.js',
                dest:'js/controller-libs-min.js'

            },

            services:{
                src: 'js/services-lib.js',
                dest:'js/services-lib-min.js'
            },

            directives :{
                src : 'js/directives-lib.js',
                dest :'js/directives-lib-min.js'
            }


        }

    });


    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');


    grunt.registerTask('default', ['concat','uglify']);














};
