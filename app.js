// Init Github
var github = new Github;
// Init UI
var ui = new UI;
// Search input
var searchUser = document.getElementById('searchUser');
// Search input event listener
searchUser.addEventListener('keyup', function (e) {
    // Get input text
    var userText = e.target.value;
    if (userText !== '') {
        // Make http call
        github.getUser(userText)
            .then(function (data) {
            if (data.profile.message === 'Not Found') {
                // Show alert
                ui.showAlert('User Not Found', 'alert alert-danger');
            }
            else {
                // Show profile
                ui.showProfile(data.profile);
                ui.showRepos(data.repos);
            }
        });
    }
    else {
        // Clear profile
        ui.clearProfile();
    }
});
