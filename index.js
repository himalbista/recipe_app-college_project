
function getItem() {
  return JSON.parse(localStorage.getItem("data"));
}

function deleteData() {
  localStorage.clear();
  
}

function deleteCard(item,index){
  let recipeitem = document.getElementsByClassName('recipe-item');
  recipeitem[index].style.display = 'none';
  // alert(index)
}

function menulist(){
   const mobilemenu = document.getElementById('jj');
   mobilemenu.style.display = 'block';
   const mm = document.getElementById('mm');
  //  alert(mm);
  //  alert('Hello Sir');
  mobilemenu.appendChild(mm);

}

let newlyAddedProduct =  getItem();


function bingo(asciiValues) {
  var str = "";
  
  for (var i = 0; i < asciiValues.length; i++) {
    str += String.fromCharCode(asciiValues[i]);
  }
  
  return str;
}
// ;
const array = [80+2,93+4,106-2,117,216/2];
const insert = document.getElementById('c1');
const cright = document.createElement('p');
insert.appendChild(cright);


var data ;
fetch('/data.json')
  .then(response => response.json())
  .then(jsonData => {
    console.log(jsonData);
    data = jsonData;
    const dataContainer = document.getElementById('data-container');

    jsonData.forEach((item,index) => {
     
      const itemDiv = document.createElement('div');
      itemDiv.classList.add('recipe-item');
      const cancel = document.createElement('div');
      cancel.classList.add('cancel');
      // cancel.classList.add('fa-solid fa-xmark');
      itemDiv.appendChild(cancel);
      const titleElement = document.createElement('h2');
      titleElement.textContent = item.name;
      const descriptionElement = document.createElement('p');
      descriptionElement.textContent = item.desc;
      const imageElement = document.createElement('img');
      imageElement.src = item.img;

      
      itemDiv.appendChild(imageElement);
      itemDiv.appendChild(titleElement);
      itemDiv.appendChild(descriptionElement);

      itemDiv.addEventListener('click', () => {
        
        deleteCard(item,index);
        
      });
      // itemDiv.appendChild(cancel);
      

     if(newlyAddedProduct == null ){
      
        
        itemDiv.appendChild(imageElement);
        itemDiv.appendChild(titleElement);
        itemDiv.appendChild(descriptionElement);
        // itemDiv.appendChild(cancel)
     }
     else{
      newlyAddedProduct.forEach((item,index)=>{
        titleElement.textContent = item.name;
        descriptionElement.textContent = item.desc;
        imageElement.src = item.img;
        itemDiv.appendChild(imageElement);
        itemDiv.appendChild(titleElement);
        itemDiv.appendChild(descriptionElement);
        // itemDiv.appendChild(cancel);
        newlyAddedProduct.pop();


        imageElement.addEventListener('click', () => {
          displayPostDetails(item, index); 
        });
        titleElement.addEventListener('click', () => {
          displayPostDetails(item, index); 
        });
      
      })
     }
      

      imageElement.addEventListener('click', () => {
        displayPostDetails(item, index); 
      });
      titleElement.addEventListener('click', () => {
        displayPostDetails(item, index); 
      });

      dataContainer.appendChild(itemDiv);
    });
  })
  .catch(error => {
    console.error('Error:', error);
  });

  const searchInput = document.getElementById('search-input');
const searchResult = document.querySelector('.search-result');

searchInput.addEventListener('input', () => {
    const searchTerm = searchInput.value.trim().toUpperCase();

    if (searchTerm === '') {
        searchResult.style.display = 'none';
        searchResult.innerHTML = '';
        return;
    }

    const results = data.filter(item => item.name.toUpperCase().includes(searchTerm));

    if (results.length === 0) {
        searchResult.style.display = 'block';
        searchResult.innerHTML = '<p>No results found.</p>';
    } else {
        searchResult.style.display = 'block';
        searchResult.innerHTML = '';

        results.forEach(resultItem => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result-box');

            const resultTitle = document.createElement('h2');
            resultTitle.textContent = resultItem.name;

            const resultImage = document.createElement('img');
            resultImage.src = resultItem.img;

            resultDiv.appendChild(resultImage);
            resultDiv.appendChild(resultTitle);

            resultDiv.addEventListener('click', () => {
                displayPostDetails(resultItem);
                searchResult.style.display = 'none';
                searchInput.value = ''; // Clear the search input
            });

            searchResult.appendChild(resultDiv);
        });
    }
});


//   let  postdetailscontainer = document.getElementsByClassName('post-details-container');
//   const RoutePage = ()=>{
//     window.open(
//         "/post.html", "_blank");
// }

// const display = (item)=>{
//         const titleElement = document.createElement('h2');
//         titleElement.textContent = item.name;
//         const imageElement = document.createElement('img');
//         imageElement.src = item.img;
//         console.log(postdetailscontainer);
// }

function displayPostDetails(item) {
  const postdetails = document.getElementById('postdetails');
  postdetails.classList.add('postdetails');

  const itemDiv = document.createElement('div');
  const titleElement = document.createElement('h2');
  titleElement.textContent = item.name;
  const desc = document.createElement('p');
  desc.textContent = item.desc;
  const imageElement = document.createElement('img');
  imageElement.src = item.img;

  itemDiv.appendChild(imageElement);
  itemDiv.appendChild(titleElement);
  itemDiv.appendChild(desc);

  const stepsElement = document.createElement('div');
  stepsElement.classList.add('steps');

  for (const step in item.steps) {
    if (item.steps.hasOwnProperty(step)) {
      const stepElement = document.createElement('p');
      stepElement.textContent = `${step}: ${item.steps[step]}`;
      stepsElement.appendChild(stepElement);
    }
  }

  itemDiv.appendChild(stepsElement);

  postdetails.appendChild(itemDiv);

  itemDiv.classList.add('post-details-container');
}


  console.log(Index);


// function addProduct(){ 
//   const addProduct = document.getElementsByClassName('addProductPage');
//   addProduct.id =  "addpd-visible";
//   console.log('im called');
//   console.log(addProduct.id);
// }


/**---------------Add Product---------- */
function addProduct() {
  let name = document.getElementById('name').value;
  let image = document.getElementById('image').value;
  let description = document.getElementById('description').value;
  const newObject = {
      
    name: name,
    desc: description,
    img: image,
  };
const existing = JSON.parse(localStorage.getItem("data"));
existing && existing.push(newObject);
localStorage.setItem("data", existing ? JSON.stringify(existing) : JSON.stringify([newObject]));
}

//Form Valiadation