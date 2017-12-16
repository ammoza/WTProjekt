
//Host-Adressen und token variable

var hostlog = "https://legitjokes.herokuapp.com/api/user/authenticate";
var hostreg = "https://legitjokes.herokuapp.com/api/user/register";
var token;
var coins;

//Log-in Request

var loginform = new Vue({


    el: "#loginform",
    data: {

       seen:false,
       username:"",
       password:"",
       RegisterLink:"Don't have an Account? Click here to Register",
       ErrorMessage:"Username or password is wrong!"

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
         coins = res.body.token;
         console.log("Token: " +token);
         console.log("Coins: "+ coins);

     }
     else if(res.body.Status === "Error") 
     {
        this.username = "";
        this.password = "";
        this.$data.seen = true;

    }

})

},

/*toRegisterForm: function(){

$('.form').fadeOut(1000);
setTimeout(function(){
$("#register-div").animate({opacity: 1}, {duration: 500, queue:false});
},1500);


}*/



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
    register: function(e){ 
        e.preventDefault();
        this.$http.post(hostreg,{username: this.username,password: this.password})
        .then(function(res){
            if(res.body.Status === "Success"){
                console.log("Success");}

                if(res.body.Status === "Error"){

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

// Mounted-Funktion 
// LoginForm erscheint nach Button Click

var firstVue = new Vue({

 el: "#start",


 mounted: function(){


     setTimeout(function(){
         $("ul").removeClass('Hidden');
     },500);


     setTimeout(function(){
         $("#Menubutton").removeClass('hiddenButton');
     },3000);


 },



 methods:{

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



$(document).ready(function(){


    $("#toRegisterForm").click(function(){
        $('.form, #google-btn').fadeOut(1000);
        setTimeout(function(){
            $("#register-div").animate({opacity: 1}, {duration: 500, queue:false});

        },1500);

    })



});



