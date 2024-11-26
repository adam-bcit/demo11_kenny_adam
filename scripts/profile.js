var currentUser;

function populateUserInfo() {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = db.collection("users").doc(user.uid);
            currentUser.get().then(userDoc => {
                let userName = userDoc.data().name;
                let userSchool = userDoc.data().school;
                let userCity = userDoc.data().city;
                if (userName) document.getElementById("nameInput").value = userName;
                if (userSchool) document.getElementById("schoolInput").value = userSchool;
                if (userCity) document.getElementById("cityInput").value = userCity;
            });
        }
    });
}
populateUserInfo();

function editUserInfo() {
    document.getElementById('personalInfoFields').disabled = false;
}

function saveUserInfo() {
    let userName = document.getElementById('nameInput').value;
    let userSchool = document.getElementById('schoolInput').value;
    let userCity = document.getElementById('cityInput').value;
    currentUser.update({
        name: userName,
        school: userSchool,
        city: userCity
    }).then(() => {
        console.log("Document successfully updated!");
        document.getElementById('personalInfoFields').disabled = true;
    });
}
