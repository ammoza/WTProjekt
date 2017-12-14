//import VueResource from "vue-resource";


//Host-Adressen und token variable

var hostlog = "https://legitjokes.herokuapp.com/api/user/authenticate";
var hostreg = "https://legitjokes.herokuapp.com/api/user/register";
var token;

//Log-in Request

var loginform = new Vue({


el: "#loginform",
data: {

// seen:false,
 username:"",
 password:"" 
 
},


methods: {
login: function(e){ 
    e.preventDefault();
	this.$http.post(hostlog,{username: this.username,password: this.password})
	.then(function(res){
		if(res.body.Status === "Success") 
        {
			console.log("Success");
            token = res.body.token;  
            console.log("Token: " +token);

        }
       if(res.body.Status === "Error") 
        {
            this.username = "";
            this.password = "";
            this.seen = true;

        }

        }



        )}}
        

});
//Google Login


function onSignIn(){
    var googleUser = gapi.auth2.getAuthInstance().currentUser.get()
    var profile = googleUser.getBasicProfile()
    console.log("ID: " + profile.getId()); // Don't send this directly to your server!
    console.log('Full Name: ' + profile.getName());
    console.log('Given Name: ' + profile.getGivenName());
    console.log('Family Name: ' + profile.getFamilyName());
}

function signOut() {
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }



//Account-Registrieren Register-Request


var registerform = new Vue ({


el: "#register-div",
data: {

 seen: false,
 username:"",
 password:"" 
 
},



methods: {
register: function(e){ 
    e.preventDefault();
    this.$http.post(hostreg,{username: this.username,password: this.password})
    .then(function(res){
        if(res.body.Status === "Success"){
            console.log("Success");}
    
        if(res.body.Status === "Error"){
        //$("#UserErrordiv").css("visibility","visible");
             this.$data.seen = true;
             this.username = "";
             this.password = "";
             console.log("Error");
    
        }})          
},

backToLogin: function(){



     this.$data.seen = false;
     
     $("#register-div").animate({opacity: 0}, {duration: 500, queue:false});
    
     setTimeout(function(){
     $(".form").fadeIn(1000);},1000);

     setTimeout(function(){
     $("#google-btn").fadeIn(1500);},2000);
      

}

}
});

// LoginForm erscheint nach Button Click

var firstButton = new Vue({

   el: "#start",

   methods:{

   loginform: function(){





    

/*
            $("#Menubutton").fadeToggle();
            setTimeout(function(){
            $("ul").fadeToggle("slow");
            },1000);
            setTimeout(function(){
            $(".form").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow')
            },2000);

            setTimeout(function(){
            $("#google-btn").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow')
            },3000);

            $("ul").addClass('Hidden');
            $("#Menubutton").addClass('hiddenButton');
*/
   }
    


   }


});


$(document).ready(function(){

/*Einblenden von Legit */

setTimeout(function(){
$("ul").removeClass('Hidden');
},500);

setTimeout(function(){
$("#Menubutton").removeClass('hiddenButton');
},3000);

/*Wenn noch kein Account dann click --> Login verschwindet Registerform kommt */

$("#toRegisterForm").click(function(){
$('.form, #google-btn').fadeOut(1000);
setTimeout(function(){
$("#register-div").animate({opacity: 1}, {duration: 500, queue:false});
    
},1500);

})

/*Von Register-Form zurück zu Login-Form*/
/*
$("#backToLogin").click(function(){

$("#UserErrordiv").css("visibility","hidden");
$("#register-div").animate({opacity: 0}, {duration: 500, queue:false});
    
setTimeout(function(){
$(".form").fadeIn(1000);},1000);
setTimeout(function(){
$("#google-btn").fadeIn(1500);},2000);


});


*/


});