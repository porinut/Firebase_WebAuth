'use strict';
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
  const db=firebase.firestore();

    function regist(){
        var userEmail = document.getElementById("email").value;
        var userName = document.getElementById("name").value;
        var defaultStatus = false;
        console.log(userEmail);
        console.log(userName);
        console.log(status);
        db.collection("users").add({
            email: userEmail,
            name: userName,
            status: defaultStatus
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            alert('Created User, Wait for Admin Approve');
            window.location.href='/index.html';
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        });
     
    }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //window.location.href = "home.html"
  
      var user = firebase.auth().currentUser;
  
      if(user != null){
  
        var email_id = user.email;
        //document.getElementById("user_para").innerHTML = "Welcome User : " + email_id;
  
      }
  
    } else {
      // No user is signed in.
  
      //document.getElementById("user_div").style.display = "none";
      //document.getElementById("login_div").style.display = "block";
  
    }
  });


  