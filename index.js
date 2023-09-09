
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

  const Search = () => {
    let filter = document.getElementById('search-input').value.replace(/\s/g, "").toUpperCase();
    let result = document.getElementsByClassName('search-result')[0]; 
    result.style.display = "none"; 
    result.innerHTML = ""; 
    for (let i = 0; i < data.length; i++) {
      let checkData = data[i].name.replace(/\s/g, "").toUpperCase();
      if (checkData.includes(filter)) {
        result.style.display = "block";
  
        const itemDiv = document.createElement('div');
        itemDiv.classList.add('result-box');
  
        const item = data[i]; 
  
        const titleElement = document.createElement('h2');
        titleElement.textContent = item.name;
  
        const imageElement = document.createElement('img');
        imageElement.src = item.img;
  
        itemDiv.appendChild(imageElement);
        itemDiv.appendChild(titleElement);
  
        result.appendChild(itemDiv);
  
        itemDiv.addEventListener('click', () => {
          console.log(item);
          displayPostDetails(item, i); 
          result.style.display = "none"; 
        });
      }
    }
  };

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

  function displayPostDetails(item, index){
    // window.location.href = "/post.html";
    // RoutePage();
    console.log(item);
     const postdetails = document.getElementById('postdetails');
     console.log(postdetails);
     console.log(item.name);
     postdetails.classList.add('postdetails');

     const itemDiv = document.createElement('div');
     const titleElement = document.createElement('h2');
     titleElement.textContent = item.name;
     const desc = document.createElement('p');
     desc.textContent = item.desc;
     const imageElement = document.createElement('img');
     imageElement.src = item.img;

     const fulldesc = document.createElement('p');
     fulldesc.textContent = "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate rerum quisquam a dolorum id, dignissimos delectus facere voluptatem voluptas soluta consequuntur facilis quos nobis laboriosam. Reprehenderit sunt mollitia id natus. ";
     itemDiv.appendChild(imageElement);
     itemDiv.appendChild(titleElement);
     itemDiv.appendChild(desc);
     itemDiv.appendChild(fulldesc)

     postdetails.appendChild(itemDiv);

     itemDiv.classList.add('post-details-container')
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

