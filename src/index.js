const api = `https://randomuser.me/api`;
const addUser = document.getElementById("user-btn");
const userList = document.getElementById("user-list");
const searchInput = document.getElementById("search");
const sortABtn = document.getElementById("sort-acn");
const sortDBtn = document.getElementById("sort-dec");

const appState = [];

// 1: we can see lots of data store in a object in array now we only
//  stored required data in object in array using class
class User {
  constructor(title, firstname, lastname, gender, email) {
    this.name = `${title} ${firstname} ${lastname}`;
    this.gender = gender;
    this.email = email;
  }
}

addUser.addEventListener("click", async () => {
  const userData = await fetch(api, {
    method: "GET"
  });
  const userJson = await userData.json();
  const user = userJson.results[0];

  //2 create a intstance of class
  const userClass = new User(
    user.name.title,
    user.name.first,
    user.name.last,
    user.gender,
    user.email
  );

  appState.push(userClass);
  console.log(appState);

  domRenderer(appState);
});

// now we write a function to render appState array to the dom

const domRenderer = (stateArr) => {
  userList.innerHTML = null;
  stateArr.forEach((userObj) => {
    // const userEl = document.createElement("div");
    userList.innerHTML += `<div class="list">
               
               <table>
               <tr>
                  <td class="td1">${userObj.name}</td>
                  <td class="td2">${userObj.gender}</td>
                  <td class="td3">${userObj.email}</td>
               </tr>
               </table>
     </div>`;
    // userList.appendChild(userEl);
  });
};

//now we implement the search feartures

searchInput.addEventListener("keyup", (e) => {
  const filteredAppState = appState.filter(
    (user) =>
      user.name.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.gender.toLowerCase().includes(searchInput.value.toLowerCase()) ||
      user.email.toLowerCase().includes(searchInput.value.toLowerCase())
  );
  domRenderer(filteredAppState);
});
//sorthing method in accending order
//inside sort method pass a compare function to compare the value and return -1,0,+1
sortABtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? -1 : 1));
  domRenderer(appStateCopy);
});
//sorting method in decending order
sortDBtn.addEventListener("click", () => {
  const appStateCopy = [...appState];
  appStateCopy.sort((a, b) => (a.name < b.name ? 1 : -1));
  domRenderer(appStateCopy);
});
