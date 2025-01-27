const countryName = new URLSearchParams(window.location.search).get(`name`)
const flagImage = document.querySelector('.country-details img')
const countryNameH1=document.querySelector('.country-details h1')
const nativeName =document.querySelector('.native-name')
const population =document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion=document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const topLevelDomain = document.querySelector('.top-level-domain')
const currencies = document.querySelector('.currencies')
const language = document.querySelector('.language')
const borderCountries = document.querySelector('.border-countries')

 const toggleBtn = document.querySelector('.toggle-btn')
 const body = document.body;
 const icon = toggleBtn.querySelector('i')


fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res) => res.json())
.then(([country]) => {
    flagImage.src = country.flags.svg
    countryNameH1.innerText=country.name.common
    population.innerText=country.population.toLocaleString('en-IN')
    region.innerText = country.region
    topLevelDomain.innerText = country.tld.join(', ')

    if(country.capital)
    {
        capital.innerText = country.capital?.[0]
    }

    if(country.subregion)
    {
        subRegion.innerText = country.subregion
    }


    if(country.name.nativeName)
        {
            console.log(Object.values(country.name.nativeName)[0].common)
        }

        if(country.name.nativeName)
            {
            nativeName.innerText=Object.values(country.name.nativeName)[0].common
        }
        else{
            nativeName.innerTex=country.name.common
        }

        if(country.currencies)
            {
            currencies.innerText =Object.values(country.currencies).map((currency) => currency.name).join(', ')
            }

            if(country.languages)
                {
                    language.innerText = Object.values(country.languages).join(', ')
                }

       if(country.borders)
       {
          country.borders.forEach((border) => {
            fetch(`https://restcountries.com/v3.1/alpha/${border}`).then((res) =>res.json())
            .then(([borderConutry]) => {
                // console.log(borderConutry);
                const borderConutryTag =document.createElement('a')
                borderConutryTag.innerText = borderConutry.name.common
                borderConutryTag.href = `country.html?name=${borderConutry.name.common}`
                borderCountries.append(borderConutryTag)
            })
          })
       }
    
})


// themeChanger.addEventListener('click', () =>  {
//     document.body.classList.toggle('dark')
// })


// Start Darkl mode / Light mode code

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

// New Dark mode / light mode code 

toggleBtn.addEventListener('click',() =>{
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

