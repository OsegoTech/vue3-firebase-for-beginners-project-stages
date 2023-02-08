import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import {
  addDoc,
  doc,
  getDocs,
  query,
  where,
  updateDoc,
} from "firebase/firestore";
import { watch, ref } from "vue";
import { dbUsersRef } from "../firebase";

export default function useAuth() {
  const auth = getAuth();
  const errorMessage = ref("");
  const signInModalOpen = ref(false);
  const userData = ref(null);
  const userIsAdmin = ref(false);
  const toggleAdminMessage = ref("");
  const selectedUser = ref(null);

  function toggleModal() {
    signInModalOpen.value = !signInModalOpen.value;
  }

  async function signUp(email, password) {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userObject = {
        createdAt: new Date(),
        linkedId: user.uid,
        email: user.email,
        isAdmin: false,
      };
      await addDoc(dbUsersRef, userObject);
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

  async function logIn(email, password) {
    if (!email) return (errorMessage.value = "Please enter a valid email");
    if (!password)
      return (errorMessage.value = "Please enter a valid password");
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      errorMessage.value = "";
      signInModalOpen.value = false;
    } catch (error) {
      switch (error.code) {
        case "auth/wrong-password":
          errorMessage.value = "incorrect password";
          break;
        case "auth/user-not-found":
          errorMessage.value = "no user found with that email";
          break;
        default:
          errorMessage.value = "sorry, there was an unexpected error";
      }
    }
  }
  function logOut() {
    try {
      signOut(auth);
    } catch (error) {
      errorMessage.value = error.message;
    }
  }

  onAuthStateChanged(auth, function (user) {
    if (user) {
      userData.value = user;
      getAdminUsers();
    } else {
      userData.value = null;
      userIsAdmin.value = false;
    }
  });

  async function getAdminUsers() {
    const queryData = query(
      dbUsersRef,
      where("isAdmin", "==", true),
      where("linkedId", "==", userData.value?.uid)
    );
    const docs = await getDocs(queryData);
    docs.forEach(function (doc) {
      if (doc.data()) {
        userIsAdmin.value = true;
      } else {
        userIsAdmin.value = false;
      }
    });
  }
  watch(userData, getAdminUsers);

  async function findUser(userEmail) {
    try {
      toggleAdminMessage.value = "";
      if (!userIsAdmin.value) return;
      const queryData = query(dbUsersRef, where("email", "==", userEmail));
      const user = await getDocs(queryData);
      const userObject = {
        id: user.docs[0].id,
        email: user.docs[0].data().email,
        isAdmin: user.docs[0].data().isAdmin,
      };
      selectedUser.value = userObject;
    } catch (error) {
      selectedUser.value = null;
      toggleAdminMessage.value = "No user found with that email...";
    }
  }

  async function toggleAdmin() {
    try {
      if (!userIsAdmin.value) return;
      const docRef = doc(dbUsersRef, selectedUser.value.id);
      updateDoc(docRef, {
        isAdmin: !selectedUser.value.isAdmin,
      });
      findUser(selectedUser.value.email);
    } catch (error) {}
  }

  return {
    signUp,
    errorMessage,
    signInModalOpen,
    toggleModal,
    logIn,
    logOut,
    userData,
    userIsAdmin,
    findUser,
    selectedUser,
    toggleAdminMessage,
    toggleAdmin,
  };
}
