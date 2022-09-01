const loadPhones = async(searchText, dataLimit) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searchText}`
    const res = await fetch(url);
    const data = await res.json();
    displayPhones(data.data, dataLimit);
}
const displayPhones = (phones, dataLimit) =>{
    const phonesContainer = document.getElementById('phone-container');
    phonesContainer.textContent = '';

    const viewAll = document.getElementById('view-all')
    // display 20 phones only
    
    if(dataLimit && phones.length > 10){
      phones = phones.slice(0,10);
      const viewAll = document.getElementById('view-all');
      viewAll.classList.remove('d-none');
    }
    else{
      viewAll.classList.add('d-none');
    }
    // display no phones found
    const noPhone = document.getElementById('not-found-message');
    if(phones.length === 0){
      noPhone.classList.remove('d-none');
    }
    else{
      noPhone.classList.add('d-none')
    }
    phones.forEach(phone => {
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');
        phoneDiv.innerHTML =`
        <div class="col mt-4">
                  <div class="card">
                    <img src="${phone.image}" class="card-img-top p-5" alt="...">
                    <div class="card-body">
                      <h5 class="card-title">${phone.phone_name}</h5>
                      <p class="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>

                      <button onclick="loadPhoneDetails('${phone.slug}')" type="button" class="btn btn-outline-dark" data-bs-toggle="modal" data-bs-target="#exampleModal">More Details</button>

                    </div>
                  </div>
                </div>
        `;
        phonesContainer.appendChild(phoneDiv);
    })
    // stop loader
    toggleLoader(false);
}
const processSearch = (dataLimit) =>{
  toggleLoader(true);
  const searchField = document.getElementById('search-field');
  const searchText = searchField.value;
  loadPhones(searchText, dataLimit);
}

document.getElementById('btn-search').addEventListener('click',function (){
  // start loader
  processSearch(10);
})
// search input field enter key handler
document.getElementById('search-field'). addEventListener('keypress', function (e) {
  if(e.key === 'Enter'){
    processSearch(10);
  }
})
const toggleLoader = isLoading =>{
  const loaderSection = document.getElementById('loader');
  if(isLoading){
    loaderSection.classList.remove('d-none');
  }
  else{
    loaderSection.classList.add('d-none')
  }
}
document.getElementById('btn-show-all').addEventListener('click',function () {
  processSearch();
})

const loadPhoneDetails = async id =>{
  const url = `https://openapi.programming-hero.com/api/phone/${id}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPhoneDetails(data.data);
}
const displayPhoneDetails = phone =>{
  console.log(phone);
  const modalTitle = document.getElementById('phoneModalLabel');
  modalTitle.innerText = phone.name;
  const phoneDetails = document.getElementById('phone-details');
  phoneDetails.innerHTML = `
  <h1 class =" text-center text-bg-dark">MainFeatures</h1>
  <div class="container d-block d-md-flex align-items-center gap-2">
  <img class="ms-4 ms-md-0 ms-lg-0" src = "${phone.image}"> <br> </img>;
  <ul class="list-group">
  <li class="list-group-item"><span class= "fw-bold">Release Date: </span>${phone.releaseDate ? phone.releaseDate : 'No Release Date found'}</li>
  <li class="list-group-item bg-white-50"><span class= "fw-bold">ChipSet: </span>${phone.mainFeatures.chipSet}</li>
  <li class="list-group-item"><span class= "fw-bold">Diplay Size:</span> ${phone.mainFeatures.displaySize}</li>
  <li class="list-group-item"><span class= "fw-bold">Memory: </span>${phone.mainFeatures.memory}</li>
  <li class="list-group-item"><span class= "fw-bold">Storage:</span> ${phone.mainFeatures.storage}</li>
</ul>;
  </div>
 
  `;
}

loadPhones('phone');