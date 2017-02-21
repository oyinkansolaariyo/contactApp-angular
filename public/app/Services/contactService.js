/**
 * Created by itunu.babalola on 1/16/17.
 */
define(['angular'],function ($resource,$routeParams) {
    var contactService = {};
    console.log($resource);
    var url ='http://dev.contact-manager.it/';

    contactService.contacts = function ($resource) {
        var $req = $resource(url+':req_action',{},{
            getContacts:{
                method : 'GET',
                params :{
                    user_id :$routeParams.userId,
                    req_action:'{user_id}/contacts'
                }

            },


            addContact:{
                method :'POST',
                params :{
                    name: '@contact.contact_name',
                    phone_number:'@contact.contact_number',
                    address:'@contact.address',
                    req_action :'{user_id}/addContact'

                }
            }
        });

        return {
            getContacts: allContacts,
            addContact:addContact
        }

        function allContacts() {
            return $req.getContacts().$promise;
        }

        function addContact(contact) {
            return $req.addContact(contact).$promise;
        }



    };


    return contactService;
});

