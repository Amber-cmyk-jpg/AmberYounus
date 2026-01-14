import { supabase } from "./supabase.js";

const loginBtn = document.getElementById('loginBtn');
if (loginBtn) {
  loginBtn.addEventListener('click', () => {
    window.location.href = 'auth.html';
  });
}
