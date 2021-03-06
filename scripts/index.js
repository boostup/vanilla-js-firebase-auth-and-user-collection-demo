const guideList = document.querySelector(".guides");
const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const accountDetails = document.querySelector(".account-details");

const setupUI = async (user) => {
  if (user) {
    //acount info
    const userDoc = await db.collection("users").doc(user.uid).get();

    const html = `
        <div>Logged in as ${user.email}</div>
        <div>${userDoc.data().bio}</div>
      `;
    accountDetails.innerHTML = html;
    //Toggle UI
    loggedInLinks.forEach((item) => (item.style.display = "block"));
    loggedOutLinks.forEach((item) => (item.style.display = "none"));
  } else {
    //hide account info
    accountDetails.innerHTML = "";
    //Toggle UI
    loggedInLinks.forEach((item) => (item.style.display = "none"));
    loggedOutLinks.forEach((item) => (item.style.display = "block"));
  }
};

//setup guides
const setupGuides = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const guide = doc.data();
      console.log(guide);
      const li = `
        <li>
            <div class="collapsible-header grey lighten-4">${guide.title}</div>
            <div class="collapsible-body white">${guide.content}</div>
        </li> 
        `;
      html += li;
    });
    guideList.innerHTML = html;
  } else {
    guideList.innerHTML = "<h5>Login to view guides</h5>";
  }
};

// setup materialize components
document.addEventListener("DOMContentLoaded", function () {
  const modals = document.querySelectorAll(".modal");
  M.Modal.init(modals);

  const items = document.querySelectorAll(".collapsible");
  M.Collapsible.init(items);
});
