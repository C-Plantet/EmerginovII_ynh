
let vm=new Vue({
  el: '#app',
  data:{
    errors: [],
     name: null,
     Email: null,
     location: null,
     school: null,
     login: null,
     Job: null,
     gitusername:null,
     gitToken:null,
     mastodon:null,
     school:null,
     password:null
  },
  methods:{

    checkForm: function (e) {
     this.errors = [];
     if (!this.password) {
       this.errors.push("Password required.");
     }else if (this.password.length<6) {
         this.errors.push("Password required should have more than 6 caracters.");


     }else if (this.password!=this.Newpassword) {
         this.errors.push("The passwords are not similar");
       }

     if (!this.Newpassword) {
       this.errors.push("Repeat password");
     }

     if (!this.mastodon) {
       this.errors.push("Mastodon Token required.");
     }
     if (!this.location) {
       this.errors.push("Location required.");
     }
     if (!this.gitusername) {
       this.errors.push("GitUsername required.");
     }
     if (!this.gittoken) {
       this.errors.push("GitToken required.");
     }
     if (!this.email) {
       this.errors.push("Email required.");
     }
     if (!this.Job) {
       this.errors.push("Job required.");
     }
     if (!this.school) {
       this.errors.push("School required.");
     }
     if (!this.name) {
       this.errors.push("Name required.");
     }
     if (!this.login) {
       this.errors.push('Login required.');
     }/* else if (!this.validEmail(this.profession)) {
       this.errors.push('profession required.');
     }*/

     if (!this.errors.length) {
//       sweetAlert("files pushed successfully ! ", "Thank you", "success");
       return true;

     }
     e.preventDefault();
   },
   validEmail: function (profession) {
     var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
     return re.test(profession);
   }

  }

})
let vm1=new Vue({
  el: '#app1',
  data:{
    errors: [],
     login: null,
     password:null
  },
  methods:{

    checkLogin: function (e) {

     this.errors = [];
     if (!this.password) {
       this.errors.push("Password required.");

     }

     if(!this.login) {
       this.errors.push('Login required.');
     }



     if (!this.errors.length) {
       return true;
     }
     e.preventDefault();

   },

 }
})
