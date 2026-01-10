import { supabase } from "./supabase.js";

let isLogin = true;

/* CHECK SESSION */
(async function checkSession() {
  const { data } = await supabase.auth.getSession();
  if (data?.session?.user) {
    window.location.href = "blog.html";
  }
})();

/* TOGGLE FORM */
window.toggleForm = function () {
  isLogin = !isLogin;

  document.getElementById("title").innerText = isLogin ? "Login" : "Sign Up";
  document.getElementById("authButton").innerText = isLogin ? "Login" : "Create Account";

  document.getElementById("toggle").innerHTML = isLogin
    ? `Don’t have an account? <span onclick="toggleForm()">Sign up</span>`
    : `Already have an account? <span onclick="toggleForm()">Login</span>`;

  document.getElementById("authMessage").innerText = "";
  document.getElementById("password").value = "";
  updatePasswordStrength("");
};

/* LOADING */
function setLoading(loading) {
  document.getElementById("authButton").disabled = loading;
  document.getElementById("authSpinner").classList.toggle("hidden", !loading);
}

/* PASSWORD STRENGTH */
function checkPasswordStrength(pw) {
  let score = 0;
  if (pw.length >= 6) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[!@#$%^&*]/.test(pw)) score++;
  if (pw.length >= 10) score++;

  if (score <= 1) return "Weak";
  if (score === 2) return "Medium";
  return "Strong";
}

function updatePasswordStrength(pw) {
  const el = document.getElementById("passwordStrength");
  el.innerText = pw ? `Password strength: ${checkPasswordStrength(pw)}` : "";
}

document.getElementById("password").addEventListener("input", e => {
  updatePasswordStrength(e.target.value);
});

/* AUTH */
window.auth = async function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const msg = document.getElementById("authMessage");

  msg.innerText = "";

  if (!email || !password) {
    msg.innerText = "Please fill all fields.";
    return;
  }

  setLoading(true);

  try {
    const result = isLogin
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password });

    if (result.error) {
      msg.innerText = result.error.message;
      return;
    }

    if (isLogin) {
      window.location.href = "blog.html";
    } else {
      msg.innerText = "Account created! Please login.";
      toggleForm();
    }

  } catch {
    msg.innerText = "Something went wrong.";
  } finally {
    setLoading(false);
  }
};

/* LOGOUT */
window.logout = async function () {
  await supabase.auth.signOut();
  window.location.href = "auth.html";
};
