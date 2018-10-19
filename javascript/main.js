var mainApp = {};

(function(){
    var firebase = app_fireBase;
var uid = null;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    uid = user.uid
  
  
  }if (uid) {
      
    uid = uid  
      
  }else{
    // redirect to login page
    uid = null;
    window.location.replace("login.html");
 }

});

    
function logOut(){  
    firebase.initializeApp(settings);

    firebase.auth().signOut().then(function() {
            sessionStorage.removeItem('tokenK');
            sessionStorage.removeItem('displayName');
            sessionStorage.removeItem('userName');
            window.open('index.html', '_self');                 
    }).catch(function(error) {
        console.log(error);
    }); 
}

