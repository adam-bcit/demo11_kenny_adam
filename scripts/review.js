var hikeDocID = localStorage.getItem("hikeDocID");

function getHikeName(id) {
  db.collection("hikes").doc(id).get().then((thisHike) => {
    document.getElementById("hikeName").innerHTML = thisHike.data().name;
  });
}
getHikeName(hikeDocID);

const stars = document.querySelectorAll('.star');
stars.forEach((star, index) => {
  star.addEventListener('click', () => {
    for (let i = 0; i <= index; i++) {
      document.getElementById(`star${i + 1}`).textContent = 'star';
    }
  });
});

function writeReview() {
  let hikeTitle = document.getElementById("title").value;
  let hikeLevel = document.getElementById("level").value;
  let hikeSeason = document.getElementById("season").value;
  let hikeDescription = document.getElementById("description").value;
  let hikeFlooded = document.querySelector('input[name="flooded"]:checked').value;
  let hikeScrambled = document.querySelector('input[name="scrambled"]:checked').value;
  let hikeRating = Array.from(stars).filter(star => star.textContent === 'star').length;

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      db.collection("reviews").add({
        hikeDocID: hikeDocID,
        userID: user.uid,
        title: hikeTitle,
        level: hikeLevel,
        season: hikeSeason,
        description: hikeDescription,
        flooded: hikeFlooded,
        scrambled: hikeScrambled,
        rating: hikeRating,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      }).then(() => {
        window.location.href = "thanks.html";
      });
    }
  });
}
