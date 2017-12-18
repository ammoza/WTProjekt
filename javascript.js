// Session-Storage Elemente
sessionStorage.setItem('coins', coins);
sessionStorage.setItem('token', token);

//Host-Adressen und TOKEN,COINS variable

var hostlog = "https://legitjokes.herokuapp.com/api/user/authenticate";
var hostreg = "https://legitjokes.herokuapp.com/api/user/register";
var token;
var coins;

//ZÄHLER

var failcounterRegistration = 0;  //zählt die Anzahl der fehlgeschlagenen Registrierungsversuche
var failcounterLogin = 0; //zählt die Anzahl der fehlgeschlagenen Loginversuche 

//Log-in Request

var loginform = new Vue({


    el: "#loginform",
    data: {

       seen:false,
       username:"",
       password:"",
       RegisterLink:"Don't have an Account? Click here to Register",
       ErrorMessage:"Username or password is wrong!",
       annoy:false,
       AnnoyingMessage:""

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
         coins = res.body.coins;
         console.log("Token: " +token);
         console.log("Coins: "+ coins);

     }
     else if(res.body.Status === "Error") 
     {

        failcounterLogin++;
        console.log("Number of Login fails: "+failcounterLogin);

        if(failcounterLogin>1){
          
          this.$data.annoy=true;
          this.AnnoyingMessage = this.AnnoyingMessage +" YOU ARE NOT THE SMARTEST";
        }


        console.log();
        this.username = "";
        this.password = "";
        this.$data.seen = true;

    }

})

},


toRegisterForm: function(){

this.$data.seen = false;

}



}


});

//Account-Registrieren Register-Request

var registerform = new Vue ({


    el: "#register-div",
    data: {

       seen: false,
       username:"",
       password:"" ,
       RegHeading:"Create an Account",
       ErrorMessage:"Name is already used take another one !"

   },



   methods: {

//AJAX REQUEST

    register: function(e){ 
        
       e.preventDefault();

       console.log("Welcome to the Registration");



        this.$http.post(hostreg,{username: this.username,password: this.password})
        .then(function(res){
            if(res.body.Status === "Success"){
                console.log("Success");}

                if(res.body.Status === "Error"){

                  failcounterRegistration++;
                  console.log("Number of Register fails: "+failcounterRegistration);

                   this.$data.seen = true;
                   this.username = "";
                   this.password = "";
                   console.log("Error");

               }})          
    },

   // VON REGISTER ZURÜCK ZU LOGIN FORM 

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


// VUE für ANFANG 

var firstVue = new Vue({

 el: "#start",

/*
 data:{
Hidden: true,
active: true

 },
*/
 mounted: function(){


    setTimeout(function(){
        $("ul").removeClass('Hidden');
         //this.$data.Hidden = false;
     },500);


     setTimeout(function(){
         $("#Menubutton").removeClass('hiddenButton');
     },3000);

 },



 methods:{
  
  //VERSCHWINDEN DES STARTBILDSCHIRMS UND ERSCHEINEN DER LOGINFORM

     loginform: function(){


        $("#Menubutton").fadeToggle();
        setTimeout(function(){
            $("ul").fadeToggle("slow");
        },1000);
        setTimeout(function(){
            $(".form").css({opacity: 0, visibility: "visible"}).animate({opacity: 1}, 'slow')
        },2000);
        $("ul").addClass('Hidden');
        $("#Menubutton").addClass('hiddenButton');

    }
    


}


});




// JQUERY für den Wechsel von LOGIN zu REGISTER 


$(document).ready(function(){


    $("#toRegisterForm").click(function(){
        $('.form, #google-btn').fadeOut(1000);
        setTimeout(function(){
            $("#register-div").animate({opacity: 1}, {duration: 500, queue:false});

        },1500);

    })



});












