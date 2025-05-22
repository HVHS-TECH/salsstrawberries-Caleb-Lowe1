/**************************************************************/
// main.mjs
// Main entry for index.html
// Written by <Your Name Here>, Term 2 202?
/**************************************************************/
const COL_C = 'white';	    // These two const are part of the coloured 	
const COL_B = '#CD7F32';	//  console.log for functions scheme
console.log('%c main.mjs', 
    'color: blue; background-color: white;');

/**************************************************************/
// Import all external constants & functions required
/**************************************************************/
// Import all the constants & functions required from fb_io module



import { initializeApp }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
  import { getAuth, GoogleAuthProvider, signInWithPopup }
  from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
  import { onAuthStateChanged }

from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";

import { ref, set }

    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";


        import { get }

    from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";
    
export {
fb_initialise,
fb_authenticate,
fb_write,
fb_ReadRec
}




function fb_initialise() {
  console.log('%c fb_initialise(): ',
    'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const firebaseConfig = {
    apiKey: "AIzaSyCwPibZHntricqhOchcdlX3H7ve_CFQhR0",
    authDomain: "comp-2025-caleb-lowe-31f01.firebaseapp.com",
    databaseURL: "https://comp-2025-caleb-lowe-31f01-default-rtdb.firebaseio.com",
    projectId: "comp-2025-caleb-lowe-31f01",
    storageBucket: "comp-2025-caleb-lowe-31f01.firebasestorage.app",
    messagingSenderId: "440676386005",
    appId: "1:440676386005:web:05b4cb8a914c0ceb0ace5c",
    measurementId: "G-WGYBNEYVY3"
  };
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const firebaseGameDB = getDatabase(app);
  console.info(firebaseGameDB);
}
var currentUser = null;
var userId = null;
function fb_authenticate() {console.log('%c fb_authenticate(): ',
  'color: ' + COL_C + '; background-color: ' + COL_B + ';');
  const AUTH = getAuth();

  



    const PROVIDER = new GoogleAuthProvider();

    // The following makes Google ask the user to select the account

PROVIDER.setCustomParameters({

        prompt: 'select_account'

    });

    signInWithPopup(AUTH, PROVIDER).then((result) => {

        //✅ Code for a successful authentication goes here
        console.log("successful authentication")
        currentUser = result.user;
        userId = currentUser.uid;
       
    })

    .catch((error) => {

        //❌ Code for an authentication error goes here
        console.log("authentication error")
    });
    
}
function fb_write() {

      console.log('%c fb_write(): ',
        'color: ' + COL_C + '; background-color: ' + COL_B + ';');

        
        if (!currentUser) {
          alert("You must be logged in to submit the form.")
          return;
        }
        const DB = getDatabase()
        const dbReference = ref(DB, "Test/UID/" + userId);
        var name = document.getElementById("name").value;
        var favoriteFruit = document.getElementById("favoriteFruit").value;
        var fruitQuantity = document.getElementById("fruitQuantity").value;
        set(dbReference, {Name : name, FavoriteFruit : favoriteFruit, FruitQuantity : fruitQuantity}).then(() => {
   
          //✅ Code for a successful write goes here
          console.log("successful write")
          }).catch((error) => {
    
          //❌ Code for a write error goes here
          console.log("Writing error")
        });

}

function fb_ReadRec() {
      console.log('%c fb_ReadRec(): ',
      'color: ' + COL_C + '; background-color: ' + COL_B + ';');
      const DB = getDatabase()
      const dbReference= ref(DB, "Test/UID/" + userId);

    get(dbReference).then((snapshot) => {

        var fb_data = snapshot.val();

        if (fb_data != null) {

            //✅ Code for a successful read goes here
console.log("successful read")
console.log(fb_data)
        } else {

            //✅ Code for no record found goes here
console.log("no record found")
        }

    }).catch((error) => {

        //❌ Code for a read error goes here
console.log("read error")
console.log(error)
    });
  }