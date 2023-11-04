const mobileSearch = [
  "Latest sports news",
  "2023 FIFA World Cup predictions",
  "NBA playoff schedule",
  "How to improve basketball shooting accuracy",
  "Best soccer dribbling techniques",
  "NFL draft prospects",
  "Top golf swing tips",
  "Fitness routines for athletes",
  "Upcoming MLB games",
  "Hiking trail recommendations",
  "Formula 1 race results",
  "Tennis serve strategies",
  "MMA fight schedules",
  "Athletic footwear reviews",
  "Fantasy football draft strategies",
  "Mountain biking trails near me",
  "Swimming stroke techniques",
  "Olympic Games updates",
  "Sports injury prevention exercises",
  "Surfing spots for beginners",
  "Boxing training drills",
  "Volleyball serving tactics",
  "Motorsports news and highlights",
  "Cycling nutrition tips",
  "Rugby World Cup fixtures",
  "Running marathon preparation",
  "Yoga for athletes",
  "Basketball coaching drills",
  "Sports memorabilia auctions",
];

const pcSearch = [
  "Best hybrid cars 2023",
  "Top electric SUVs",
  "How to improve fuel efficiency",
  "Latest car safety features",
  "New car financing options",
  "Maintenance tips for diesel engines",
  "Comparing SUV models",
  "Car insurance for new drivers",
  "Upcoming car releases",
  "Used vs. new car pros and cons",
  "Classic car restoration tips",
  "Eco-friendly car options",
  "Tips for buying a family car",
  "What is autonomous driving?",
  "Diesel vs. gasoline engines",
  "Affordable luxury cars",
  "Winter car care tips",
  "Car lease vs. buy decision",
  "Sedan vs. SUV comparison",
  "Car customization ideas",
  "Electric car charging infrastructure",
  "Best car brands for reliability",
  "Sports car performance upgrades",
  "Choosing the right tires",
  "Car maintenance schedule",
  "Car safety for children",
  "Importance of regular oil changes",
  "Benefits of a hybrid SUV",
  "Classic car collector's market",
  "Fuel-efficient driving techniques",
  "Understanding car warranties",
  "Car technology advancements",
  "Best practices for car detailing",
  "The future of autonomous vehicles",
  "Choosing the right auto mechanic",
  "Affordable electric cars",
  "Comparing car rental companies",
  "Car interior customization",
  "Trends in green automotive tech",
  "Tips for selling a used car",
];

let textsArray = [];
const isMobile = window.innerWidth < 768 && window.innerHeight < 1024;

if (isMobile) { textsArray = mobileSearch }
else { textsArray = pcSearch }

let totalCount = document.getElementById('total-search-count').textContent = textsArray.length
let CompletedCount = document.getElementById('completed-search-count')
let EstimatedPoint = document.getElementById('estimated-point')
let searchCount = 0
let delaysBetweenSearches = [
  1000,
  2000,
  3000,
  4000,
  2000,
  6000,
  3600,
]


// Function to perform a search with a delay
function searchWithDelayInNewWindow(keyword, delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const searchUrl = `https://www.bing.com/search?q=${encodeURIComponent(keyword)}`;
      var current_window = window.open(searchUrl, '_blank');
      resolve();
      searchCount++;
      CompletedCount.textContent = searchCount
      EstimatedPoint.textContent = searchCount * 3
      document.title = `${searchCount} / ${textsArray.length}  (points - ${searchCount * 3} )`
      setTimeout(() => {
        try {
          current_window.close()
        }
        catch {
          console.log('Some issues are there at closing the window');
        }
      }, delay)
    }, delay);
  });
}

//Main Starting function
async function performSearchesWithDelay(textsArray) {
  for (const keyword of textsArray) {
    if (searchCount * 3 >= 90) return
    const randomIndex = Math.floor(Math.random() * delaysBetweenSearches.length)
    await searchWithDelayInNewWindow(keyword, delaysBetweenSearches[randomIndex]);
  }
}

performSearchesWithDelay(textsArray)
  .then(() => {
    console.log("All searches have completed.");
  })
  .catch((error) => {
    console.error("An ER0RR HAS 0CCURED")
  })



const getNewsHeadlines = () => {
  const decodeApiKey = (newsApiKey) => {
    return `${newsApiKey.replace(/mk|MK/g, '1').slice(0, 11) + String.fromCharCode(65)}${newsApiKey.slice(11 + 1).replace(/89/g, '8')}`.toLowerCase();
  }

  fetch(`https://newsapi.org/v2/top-headlines?country=uk&apiKey=${decodeApiKey('B7DD0DMK0D974B896898904F2A2FC05EFE2')}`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log(data);
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}