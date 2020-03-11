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
  const table=document.querySelector('#tbresult');

  db.collection('users').get().then((snapshot)=>{
    snapshot.forEach(doc=>{
      console.log(doc.data());
      showData(doc);
    });
    
  }).catch(function(error) {
    console.log("Error getting document:", error);
  });

function showData(doc){
  var docid = doc.id;
  var row = table.insertRow(-1);
  var cell1=row.insertCell(0);
  var cell2=row.insertCell(1);
  var cell3=row.insertCell(2);
  var cell4=row.insertCell(3);
  var cell5=row.insertCell(4);
  cell1.innerHTML= "<a class='btn btn-default'><em class='fa fa-pencil'></em></a><a class='btn btn-danger'><em class='fa fa-trash'></em></a>";
  cell2.innerHTML=doc.data().email;
  cell3.innerHTML=doc.data().name;
  if(doc.data().status === true){
    cell4.innerHTML='<img src="https://img.icons8.com/flat_round/30/000000/play--v1.png"> ON';
    cell5.innerHTML= '<form action="/deleteBot" onsubmit="return confirm('+"'Are you sure you want to submit?'"+');"><input type="hidden" name="email" id="email"'+ 'value="'+doc.data().email+'"><input type="hidden" name="docid" value="'+docid+'"><button class="btn btn-danger" type="submit">DEACTIVATE</button></form>';
    //cell5.innerHTML= '<button onclick="conf('+docid + '",'+false+')" class="btn btn-danger">DEACTIVATE</button>';   +' '+'class="btn btn-danger">DEACTIVATE</button>'
    //cell5.innerHTML= '<button onclick=' + "updateStatus('" +docid+ "'"+ ',false)'+ ' class="btn btn-danger">DEACTIVATE</button>';
    //cell5.innerHTML= '<button onclick="updateStatus()" class="btn btn-danger">DEACTIVATE</button>';
  }else{
    cell4.innerHTML='<img src="https://img.icons8.com/flat_round/30/000000/stop.png"> OFF';
    cell5.innerHTML= "<form action='/shareBot'><input type='hidden' name='email' id='email' value='"+doc.data().email+"'><input type='hidden' name='docid' value='"+docid+"'><button id='active' class='btn btn-success' type='submit'>ACTIVATE</button></form>";
  }
  
}

function logout(){
    firebase.auth().signOut();
    window.location.href = "index.html";
  }

  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
  
      //document.getElementById("user_div").style.display = "block";
      //document.getElementById("login_div").style.display = "none";
  
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