/**
 * Created by itunu.babalola on 1/16/17.
 */
function contactCtrl(contacts, $routeParams, $timeout,$location){
    var self = this;
    self.contacts = [];
    self.notice = [];
    self.errors =[];
    self.success = [];
    self.newContact = {};
    var actionStates = {
        SAVE:'save',
        UPDATE:'update'
    };
    self.btnActionState = actionStates.SAVE;

    $timeout(function () {
        self.getContacts();
    },1);


    self.getContacts = function () {

        contacts.allContacts({user_id:$routeParams.userId}).then(function (response) {
            if(response.status == 'success'){
                self.contacts = response.data.contacts;
            }else if(response.status == 'Notice'){
                self.notice = response.message;
            }
            else if(response.status == 'error'){
                self.errors = response.message;

            }

        },function (error) {

        });
    };


    self.addNewContact = function () {
        if(self.btnActionState == actionStates.SAVE) {
            self.newContact.user_id = $routeParams.userId;
            var param = self.newContact;
            if(param != null){
                contacts.addContact(param).then(function (response) {
                    if(response.status == 'success'){
                        self.success = 'Contact Added Succesfully';
                    }else if(response.status == 'Notice'){
                        self.notice = response.message;
                    }
                    else if(response.status == 'error'){
                        self.errors = response.message;
                    }
                    self.getContacts();
                },function (error) {

                });
                self.newContact ={};
                self.errors =[];
                self.success =[];
                self.notice = [];

            }
        }else if(self.btnActionState == actionStates.UPDATE) {
            self.update(self.newContact);
        }

    };

    self.removeContact = function (contact_id) {
        if(contact_id != null){
            contacts.deleteContact({contact_id:contact_id}).then(function (response) {
                if(response.status == 'success'){
                    self.success = response.data;
                }
                else if(response.status == 'error'){
                    self.errors = response.message;
                }
                else if(response.status == 'Notice'){
                    self.notice = response.message;
                }
                self.getContacts();
            },function (error) {

            });
        }

    };


    self.getSelectedContact = function (contact) {
        var  param = contact;
        self.btnActionState = actionStates.UPDATE;
        param.contact_id = contact.id;
        if(param != null){
            self.newContact = angular.copy(param);
        }

    }

    self.update = function (contact) {
        var  param = contact;
        param.contact_id = contact.id;
        if(param != null){
            self.newContact = angular.copy(param);
            contacts.updateContact(param).then(function (response) {
                if (response.status == 'success') {
                    self.success = response.message;
                }
                else if (response.status == 'error') {
                    self.errors = response.message;
                }
                else if (response.status == 'Notice') {
                    self.notice = response.message;
                }
                self.getContacts();
            },function (error) {

            });
        };
    }

}