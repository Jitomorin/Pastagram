import { firestore } from "./firebase";
import { v4 as uuidv4 } from "uuid";

async function addUser(email, fullname, username,uid ) {
  // const uid=uuidv4()
  firestore.collection("users").doc(uid).set({
    uid: uid,
    email: email,
    fullname: fullname,
    userName: username,
    followers: [],
    following: [],
    imageURL: "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.ms_ni44c-_TBsdHzF0W5awHaHa%26pid%3DApi&f=1&ipt=bd6bf0cc645b437b48ee13f797ca6d3b484072dadfe65b0f7802200d5aeda34f&ipo=images",
  });
}
function getAllUsers() {
  firestore
    .collection("users")
    .get()
    .then(function (snapshot) {
      snapshot.forEach(function (cSnapshot) {
        return cSnapshot;
      });
    });
}
function getUserDetails(uid) {
  firestore
    .collection("users")
    .doc(uid)
    .get()
    .then((snapshot) => {
      return snapshot.data();
    });
}
async function addPost(userID, imageURL, caption,postUID) {
  
  firestore.collection("posts").doc(postUID).set({
    uid: postUID,
    userID: userID,
    datePublished:Date(),
    imageURL: imageURL,
    caption: caption,
    likes: [],
    comments: [],
  });
}
  



export {
  addUser,
  getAllUsers,
  getUserDetails,
  addPost,
};
