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