//Listen for auth status changes
// listen for auth status changes
auth.onAuthStateChanged((user) => {
  if (user) {
    db.collection("guides").onSnapshot(
      (snapshot) => {
        setupGuides(snapshot.docs);
        setupUI(user);
      },
      (err) => console.log(err.message)
    );
  } else {
    setupUI();
    setupGuides([]);
  }
});

//create new guide
const createForm = document.querySelector("#create-form");
createForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  try {
    await db.collection("guides").add({
      title: createForm["title"].value,
      content: createForm["content"].value,
    });
  } catch (error) {
    alert(error.message);
  }
  const modal = document.querySelector("#modal-create");
  M.Modal.getInstance(modal).close();
  createForm.reset();
});

//signuop
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  //get user info
  const email = signupForm["signup-email"].value;
  const password = signupForm["signup-password"].value;

  //   sign up user
  const cred = await auth.createUserWithEmailAndPassword(email, password);
  console.log(cred);

  db.collection("users").doc(cred.user.uid).set({
    bio: signupForm["signup-bio"].value,
  });

  const modal = document.querySelector("#modal-signup");
  M.Modal.getInstance(modal).close();
  signupForm.reset();
});

//login
const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = loginForm["login-email"].value;
  const password = loginForm["login-password"].value;
  const cred = await auth.signInWithEmailAndPassword(email, password);
  const modal = document.querySelector("#modal-login");
  M.Modal.getInstance(modal).close();
  loginForm.reset();
});

//logout
const logout = document.querySelector("#logout");
logout.addEventListener("click", async (e) => {
  e.preventDefault();
  await auth.signOut();
});
