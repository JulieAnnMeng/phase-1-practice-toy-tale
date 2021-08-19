let addToy = false;

const toyContainer = document.getElementById('toy-collection');
const toyForm = document.getElementsByClassName('add-toy-form');

const BASE_URL = "http://localhost:3000/toys";


document.addEventListener("DOMContentLoaded", () => {
  fetch(BASE_URL)
  .then((response) => response.json())
  .then((toyData) => {
    console.log(toyData);
     toyData.forEach(toy => {renderToys(toy)});
    
  })
  .catch(error => console.log('error', error))

  // code below was provided

  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
      
      toyFormContainer.addEventListener('submit', e => {
        e.preventDefault();
        let toyName = document.getElementsByName('name')[0];
        let toyImg = document.getElementsByName('image')[0];
        
        let toys = {
          id: 99,
          name: toyName.value,
          image: toyImg.value,
          likes: 0
        };
        renderToys(toys);
        toyPost(toys)
      })
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

function renderToys(toys){
  const toyCard = document.createElement('div');
  toyCard.className = 'card';
  
  const toyId = toys.id;

  const toyName = document.createElement('h2');
  toyName.innerText = toys.name;
  
  const toyImg = document.createElement('img');
  toyImg.src = toys.image;
  toyImg.className = 'toy-avatar';

  const toyLikes = document.createElement('p');
  let likes = toys.likes;
  toyLikes.textContent = `${likes} Likes!`;

  const likeBttn = document.createElement('button');
  likeBttn.className = 'like-btn';
  likeBttn.setAttribute('id', toys.id);
  likeBttn.textContent = "Like ♥";
  
  likeBttn.addEventListener('click', () => {
    likes = ++toys.likes;
    toyLikes.textContent = likes;
    toyPatch(toyId, likes);
  });

   toyCard.append(toyName, toyImg, toyLikes, likeBttn);
  toyContainer.appendChild(toyCard);
  }

function toyPost(toy){
  fetch(BASE_URL, {
    method: "POST",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify(toy),
  })
    .then((response) => response.json())
    .then(data => console.log(data))
    .catch((error) => {console.error('error: ', error)})
}

function toyPatch(toyId, likes){
  fetch(BASE_URL + `/${toyId}`, {
    method: "PATCH",
    headers: {
    "Content-Type": "application/json",
    Accept: "application/json"
    },
    body: JSON.stringify({
      'likes': likes
    }),
  })
    .then((response) => response.json())
    .then(data => console.log(data))
    .catch((error) => {console.error('error: ', error)})
}


// 1) Access the list of toys from an API (mocked using JSON Server) and render each of them in a "card" on the page 
// 2) Hook up a form that enables users to add new toys. Create an event listener so that, when the form is submitted, the new toy is persisted to the database and a new card showing the toy is added to the DOM 
// 3) Create an event listener that gives users the ability to click a button to "like" a toy. When the button is clicked, the number of likes should be updated in the database and the updated information should be rendered to the DOM