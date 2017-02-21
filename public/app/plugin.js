/**
 * Created by itunu.babalola on 1/23/17.
 */
var Contact = {};
var insert_div =  document.querySelector('#trigger');

var contactFrame = document.createElement('iframe');
Contact.attachWindow = function () {

    contactFrame.src =  'http://dev.contact-app.it/';
    contactFrame.setAttribute('overflow','auto');
    contactFrame.setAttribute('frameBorder','0px');
    contactFrame.setAttribute('height','1500px');
    contactFrame.setAttribute('width','1000px');
    insert_div.style.height= '2000px';
    insert_div.style.width = '1200px';
    insert_div.appendChild(contactFrame);
};

Contact.initialize = function (button_show_id,button_remove_id) {
    var button = document.querySelector(button_show_id);
    var remove = document.querySelector(button_remove_id);
    if(button != null && remove != null){
        button.onclick = function () {
            Contact.attachWindow();
        };
        remove.onclick = function () {
            insert_div.removeChild(contactFrame);
        };

    }

};


