const CountriesContainer = document.querySelector('.Countries-container')
const FilterByRegion = document.querySelector('.filter-for-region')
const SearchInput = document.querySelector('.search-container input')
const toggleBtn = document.querySelector('.toggle-btn');
const body = document.body;
const icon = toggleBtn.querySelector('i');


let allCountriesData 

fetch('https://restcountries.com/v3.1/all')
.then((res)=>res.json())
.then((data) => {
    renderCountries(data)
    allCountriesData = data
})



FilterByRegion.addEventListener('change', (e) => {
    fetch(`https://restcountries.com/v3.1/region/${FilterByRegion.value}`)
.then((res)=>res.json())
.then(renderCountries)

})

function renderCountries(data)
{
    CountriesContainer.innerHTML = ''
    data.forEach((country)=>{
    // console.log(country); 
    const countryCard = document.createElement('a') 
    countryCard.classList.add('country-card')
    countryCard.href = `/country.html?name=${country.name.common}`
    countryCard.innerHTML = 
        ` <img src="${country.flags.svg}" alt="flag"/>
            <div class="card-text">
                <h3 class="card-title">${country.name.common}</h3>
                <p><b>Population: </b>${country.population.toLocaleString('en-IN')}</p>
                <p><b>Region: </b>${country.region}</p>
                <p><b>Capital: </b>${country.capital ?.[0]}</p>
            </div>`

   CountriesContainer.append(countryCard)
})
}

SearchInput.addEventListener('input' ,(e) => {
//  console.log(e.target.value);
//  console.log(allCountriesData);
 const FilteredCountries = allCountriesData.filter((country) => country.name.common.toLowerCase().includes(e.target.value.toLowerCase()))
//  console.log(FilteredCountries); 
 renderCountries(FilteredCountries)
})



// demoo 

// Check saved theme preference in localStorage
const savedMode = localStorage.getItem('theme') || 'light-mode';
body.classList.add(savedMode);

// Update button text and icon based on the current theme
if (savedMode === 'dark-mode') {
  toggleBtn.querySelector('span').textContent = ' Light Mode';
  icon.classList.replace('fa-moon', 'fa-sun');
} else {
  toggleBtn.querySelector('span').textContent = ' Dark Mode';
  icon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme on button click
toggleBtn.addEventListener('click', () => {
  if (  document.body.classList.contains('light-mode')) {
    body.classList.replace('light-mode', 'dark-mode');
    localStorage.setItem('theme', 'dark-mode');
    toggleBtn.querySelector('span').textContent = ' Light Mode';
    icon.classList.replace('fa-moon', 'fa-sun');
  } else {
    body.classList.replace('dark-mode', 'light-mode');
    localStorage.setItem('theme', 'light-mode');
    toggleBtn.querySelector('span').textContent = ' Dark Mode';
    icon.classList.replace('fa-sun', 'fa-moon');
  }
});






// const cardImg = document.createElement('img')
// cardImg.src='https://flagcdn.com/is.svg'
// countryCard.append(cardImg)



// const CountriesContainer = document.querySelector('.Countries-container')



