/**
 * Created by itunu.babalola on 1/16/17.
 */
function userCtrl(users,$location){
 var self = this;
 self.users = users.users;
 self.newUser = {};
 self.userLogin ={};
 self.errors_login =[];
 self.notice =[];
 self.errors_register =[];


 self.loginUser = function (user) {
     user = self.userLogin;
     if(user.phone_number != null){
     users.getUser(user).then(function (response) {
         if(response.status == 'success'){
             userId = response.data[0].id;
             $location.path('/user/'+userId);

         }else if(response.status == 'error'){
             self.errors_login= response.message;
         }
         else if(response.status == 'Notice'){
             self.notice = response.message;
         }

     },function (error) {
     });
     }
     else{
         self.errors_login ='You have to fill in your number and password';
     }



 };

 self.createUser = function () {
     if(self.newUser.phone_number != null && self.newUser.address != null && self.newUser.password != null && self.newUser.user_name != null){
         users.addUser(self.newUser).then(function (response) {
             if(response.status == 'success'){
                 userId = response.data.id;
                 $location.path('/user/'+userId);
             }
             else if(response.status == 'error'){
                 self.errors_register = response.message;
             }
             else if(response.status == 'error_database'){
                 self.errors_register = 'Another user is registered with this phone number already'
             }
             else if( response.status =='Notice'){
                 self.notice = response.message;
             }


         },function (error) {
         });
     }
     else{
         self.errors_register = 'You have to fill in the required fields';
     }



 }

}
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