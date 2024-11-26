var currentUser;


// Get the current day of the week as a string (e.g., "Monday", "Tuesday")
// Array for days of the week to fetch today's quote
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const today = daysOfWeek[new Date().getDay()];

// Main function to handle authentication and data fetching
function doAll() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            // User is logged in
            currentUser = db.collection("users").doc(user.uid);

            // Insert user's name and display hike cards
            insertNameFromFirestore();
            displayCardsDynamically("hikes");

            // Fetch and display today's quote
            db.collection("quotes").doc(today).get().then((doc) => {
                if (doc.exists) {
                    const dailyQuote = doc.data().quote;
                    console.log("Today's Quote:", dailyQuote);
                    document.getElementById("quote-goes-here").innerText = dailyQuote;
                } else {
                    console.log("No quote found for today!");
                }
            }).catch((error) => {
                console.error("Error getting quote:", error);
            });

        } else {
            // No user is logged in, redirect to login
            window.location.href = "login.html";
        }
    });
}

// Call the main function to execute the code
doAll();




function toggleBookmark(element) {
    let hikeDocID = element.getAttribute('data-id');
    currentUser.get().then((userDoc) => {
        let bookmarks = userDoc.data().bookmarks || [];
        if (bookmarks.includes(hikeDocID)) {
            currentUser.update({
                bookmarks: firebase.firestore.FieldValue.arrayRemove(hikeDocID)
            });
            element.innerText = 'bookmark_border';
        } else {
            currentUser.update({
                bookmarks: firebase.firestore.FieldValue.arrayUnion(hikeDocID)
            });
            element.innerText = 'bookmark';
        }
    }).catch((error) => {
        console.error("Error updating bookmarks: ", error);
    });
}

function displayCardsDynamically(collection) {
    let cardTemplate = document.getElementById("hikeCardTemplate");

    db.collection(collection).get().then(allHikes => {
        allHikes.forEach(doc => {
            let newcard = cardTemplate.content.cloneNode(true);
            let docID = doc.id;
            var title = doc.data().name;
            var details = doc.data().details;
            var hikeLength = doc.data().length;

            newcard.querySelector('.card-title').innerHTML = title;
            newcard.querySelector('.card-length').innerHTML = hikeLength + " km";
            newcard.querySelector('.card-text').innerHTML = details;
            newcard.querySelector('.card-image').src = `./images/${doc.data().code}.jpg`;
            newcard.querySelector('a').href = "eachHike.html?docID=" + docID;

            let bookmarkIcon = newcard.querySelector('.bookmark-icon');
            bookmarkIcon.setAttribute('data-id', docID);
            bookmarkIcon.id = `bookmark-icon-${docID}`;
            currentUser.get().then((userDoc) => {
                if (userDoc.data().bookmarks.includes(docID)) {
                    bookmarkIcon.innerText = 'bookmark';
                }
            });

            document.getElementById(collection + "-go-here").appendChild(newcard);
        });
    });
}

function insertNameFromFirestore() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                let userName = userDoc.data().name;
                document.getElementById("name-goes-here").innerText = userName;
            });
        }
    });
}

function readQuote(day) {
    db.collection("quotes").doc(day).onSnapshot(dayDoc => {
        document.getElementById("quote-goes-here").innerHTML = dayDoc.data().quote;
    });
}
