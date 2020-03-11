var firebaseConfig = {
  apiKey: "AIzaSyDH-6oUQO9x_MJsRPjMBYVO4xFTCl1t1f0",
  authDomain: "fir-web-auth-e1ba1.firebaseapp.com",
  databaseURL: "https://fir-web-auth-e1ba1.firebaseio.com",
  projectId: "fir-web-auth-e1ba1",
  storageBucket: "fir-web-auth-e1ba1.appspot.com",
  messagingSenderId: "918406012339",
  appId: "1:918406012339:web:8a151ea34e4fa059f8bfc6",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    window.location.href = "home.html"

    var user = firebase.auth().currentUser;

    if(user != null){

      var email_id = user.email;
      document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;

    }

  } else {
    // No user is signed in.

    //document.getElementById("user_div").style.display = "none";
    //document.getElementById("login_div").style.display = "block";

  }
});

function login(){

  var userEmail = document.getElementById("email").value;
  var userPass = document.getElementById("password").value;

  firebase.auth().signInWithEmailAndPassword(userEmail, userPass).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    console.log(errorCode + " : " + errorMessage)
    window.alert("Error : " + errorMessage);

    // ...
  });

}
