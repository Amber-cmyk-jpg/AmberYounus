import { supabase } from "./supabase.js";


const loginBtn = document.getElementById("loginBtn");
const msg = document.getElementById("msg");

loginBtn.addEventListener("click", async () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!email || !password) {
    msg.innerText = "Please fill all fields";
    msg.style.color = "red";
    return;
  }

  loginBtn.innerText = "Logging in...";
  loginBtn.disabled = true;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    msg.innerText = error.message;
    msg.style.color = "red";
    loginBtn.innerText = "Login";
    loginBtn.disabled = false;
  } else {
    msg.innerText = "Login successful ✅";
    msg.style.color = "green";

    // 👉 Redirect after login
    setTimeout(() => {
      window.location.href = "index.html"; // or dashboard.html
    }, 800);
  }
});


