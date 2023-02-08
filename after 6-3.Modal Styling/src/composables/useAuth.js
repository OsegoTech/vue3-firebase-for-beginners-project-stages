import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { ref } from "vue";
export default function useAuth() {
  const auth = getAuth();
  const errorMessage = ref("");

  async function signUp(email, password) {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      errorMessage.value = "";
    } catch (error) {
      switch (error.code) {
        case "auth/email-already-in-use":
          errorMessage.value =
            "a user with that email already exists, please log in";
          break;
        case "auth/weak-password":
          errorMessage.value = "password should be at least 6 characters long";
          break;
        default:
          errorMessage.value = "sorry, there was an unexpected error";
      }
    }
  }
  return { signUp, errorMessage };
}
