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
  db.settings({
    ssl: false
  });
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
  //cell1.innerHTML= "<a class='btn btn-default'><em class='fa fa-pencil'></em></a><a class='btn btn-danger'><em class='fa fa-trash'></em></a>";
  if(doc.data().status==true){
    cell1.innerHTML= "<a class='btn btn-default' disabled><em class='fa fa-pencil'></em></a><a class='btn btn-danger' disabled><em class='fa fa-trash'></em></a>";
  }else{
    cell1.innerHTML= '<button class="btn btn-default" ><em class="fa fa-pencil"></em></button><button class="btn btn-danger" onclick="removeUser('+"'"+docid+"'"+')"'+'><em class="fa fa-trash"></em></button>';
  }
  cell2.innerHTML=doc.data().email;
  cell3.innerHTML=doc.data().name;
  if(doc.data().status === true){
    cell4.innerHTML='<img src="https://img.icons8.com/flat_round/30/000000/play--v1.png"> ON';
    cell5.innerHTML= '<form action="/deleteBot" onsubmit="return confirm('+"'Are you sure you want to submit?'"+');"><input type="hidden" name="email" id="email"'+ 'value="'+doc.data().email+'"><input type="hidden" name="docid" value="'+docid+'"><button class="btn btn-danger" type="submit">DEACTIVATE</button></form>';
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

  function removeUser(docid){
    var re = confirm('Confirm Remove?');
    console.log('Function removeUser OK : '+docid);
    if(re){
      db.collection("users").doc(docid).delete().then(function() {
        console.log("Document successfully deleted!");
        location.reload();
      }).catch(function(error) {
          console.error("Error removing document: ", error);
      });
  
    }
  }

  function editUser(docid){
    console.log('Function editUser OK : '+docid);

  }