var mainApp = {};

(function(){
    var firebase = app_fireBase;
var uid = null;
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    uid = user.uid
  }else{
    // redirect to login page
    uid = null;
    window.location.replace("login.html");
 }

});

function logOut(){
    firebase.auth().signOut();
}

mainApp.logOut = logOut;

})()

// If anonymous, link account...
if (firebase.auth().currentUser.isAnonymous) {
  var cred = firebase.auth.EmailAuthProvider.credential(email, password);
  firebase.auth().currentUser.linkAndRetrieveDataWithCredential(cred);
}
