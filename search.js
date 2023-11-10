const mobileSearch = ['Latest education news', 'Study tips for students', 'How to choose the right college or university', 'Online learning opportunities', 'Homeschooling resources', 'Career advice for students and graduates', 'Educational technology trends', 'How to learn new skills', 'Inspiring stories of success', 'Future of education', 'Latest business news', 'Startup advice', 'Personal finance tips', 'How to start a business', 'How to grow your business', 'Marketing and advertising strategies', 'Leadership and management tips', 'Negotiation skills', 'Successful business leaders', 'Future of business']

const pcSearch = [
  "India",
  "Indian culture",
  "Bollywood",
  "Indian cuisine",
  "Taj Mahal",
  "Holi festival",
  "Diwali celebration",
  "Indian history",
  "Ganges River",
  "Golden Temple",
  "Mumbai",
  "Delhi",
  "Indian traditions",
  "Yoga",
  "Cuisine of India",
  "Famous Indian personalities",
  "Indian festivals",
  "Traditional clothing in India",
  "Independence Day India",
  "Indian economy",
  "Incredible India",
  "Tourist attractions in India",
  "Wildlife in India",
  "Cricket in India",
  "Indian art and architecture",
  "Himalayan mountains",
  "Indian states",
  "Indian languages",
  "Spirituality in India",
];

let textsArray = [];
let pointLimit = 60;
const isMobile = window.innerWidth < 768 && window.innerHeight < 1024;

if (isMobile) {
  textsArray = mobileSearch
}
else {
  textsArray = pcSearch
  pointLimit = 90
}

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
    if (searchCount * 3 >= pointLimit) return
    const randomIndex = Math.floor(Math.random() * delaysBetweenSearches.length)
    await searchWithDelayInNewWindow(keyword, delaysBetweenSearches[randomIndex]);
  }
}


performSearchesWithDelay(textsArray)
  .then(() => {
    console.log("All searches have completed.");
    if (!isMobile) {
      window.open('https://rewards.bing.com',)
    }
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