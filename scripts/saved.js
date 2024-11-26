// saved.js

// Function to load bookmarked hikes for the current user
function loadBookmarkedHikes() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            let currentUser = db.collection("users").doc(user.uid);

            // Retrieve the bookmarks array from Firestore
            currentUser.get().then(userDoc => {
                let bookmarks = userDoc.data().bookmarks;

                if (bookmarks && bookmarks.length > 0) {
                    // Iterate through each bookmarked hike and fetch details
                    bookmarks.forEach(hikeDocID => {
                        db.collection("hikes").doc(hikeDocID).get().then(hikeDoc => {
                            if (hikeDoc.exists) {
                                let hikeData = hikeDoc.data();
                                displayHikeCard(hikeDocID, hikeData);
                            }
                        });
                    });
                } else {
                    document.getElementById("bookmarked-hikes-go-here").innerHTML = "<p>No bookmarked hikes found.</p>";
                }
            });
        } else {
            console.log("No user is logged in");
            window.location.href = "login.html";
        }
    });
}

// Function to display each hike card in the bookmarks section
function displayHikeCard(docID, hikeData) {
    // Create a card template similar to main.html
    let cardHtml = `
        <div class="card py-2 mx-2" style="width: 18rem">
            <img class="card-img-top" src="./images/${hikeData.code}.jpg" alt="Hike Image" />
            <div class="card-body">
                <h5 class="card-title">${hikeData.name}</h5>
                <p class="card-length">${hikeData.length} km</p>
                <p class="card-text">${hikeData.details}</p>
                <a href="eachHike.html?docID=${docID}" class="btn btn-primary">Read more</a>
            </div>
        </div>
    `;

    document.getElementById("bookmarked-hikes-go-here").innerHTML += cardHtml;
}

// Load bookmarks on page load
loadBookmarkedHikes();
