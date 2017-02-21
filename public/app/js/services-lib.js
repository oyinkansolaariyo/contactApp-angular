/**
 * Created by itunu.babalola on 1/16/17.
 */
define(['angular'],function ($resource,$routeParams) {
    var userService = {};
    var url ='http://dev.contact-manager.it/';

    userService.users = function ($resource) {
         var $req = $resource(url+':req_action',{},{
            login:{
                method : 'POST',
                params :{
                    phone_number :'@$user.phone_number',
                    req_action:'login',
                    password :'@$user.password'
                }

            },


             addUser:{
                method :'POST',
                 params :{
                    name: '@user.user_name',
                    phone_number:'@user.phone_number',
                    password:'@user.password',
                    address:'@user.address',
                    req_action :'register'

                 }
             }
        });

        return {
            getUser: getUser,
            addUser:addUser
        }

        function getUser(user) {
            return $req.login(user).$promise;
        }

        function addUser(user) {
            return $req.addUser(user).$promise;
        }



    };

    userService.contacts = function ($resource) {
        var $creq = $resource(url+':user_id/:req_action',{},{
            allContacts:{
                method : 'GET',
                isArray: false,
                params :{
                    req_action:'contacts',
                    user_id :'@user_id'

                }

            },


            addContact:{
                method :'POST',
                params :{
                    name: '@contact.contact_name',
                    phone_number:'@contact.phone_number',
                    address:'@contact.address',
                    req_action :'addContact',
                    user_id :'@user_id'

                }
            }


        });

        var $dreq = $resource(url+':contact_id/:req_action',{},{

             deleteContact :{
                 method : 'POST',
                 params :{
                     contact_id :'@contact_id',
                     req_action : 'delete'
                 }
             },

            updateContact :{
                 method : 'POST',
                params :{
                    name: '@contact.contact_name',
                    phone_number:'@contact.phone_number',
                    address:'@contact.address',
                    req_action :'update',
                    contact_id :'@contact_id'

                }
            }



        });
        return {
            allContacts: allContacts,
            addContact:addContact,
            deleteContact :deleteContact,
            updateContact :updateContact
        };

        function allContacts(params) {
            return $creq.allContacts(params).$promise;
        }

        function addContact(params) {
            return $creq.addContact(params).$promise;
        }

        function  deleteContact(params) {
            return $dreq.deleteContact(params).$promise;
        }

        function updateContact(params) {
            return $dreq.updateContact(params).$promise;
        }



    };


    return userService;
});

