const mobileSearch = [
  'Data science with R programming',
  'TypeScript fundamentals',
  'Responsive email design',
  'Machine learning algorithms',
  'Advanced React.js concepts',
  'RESTful API security',
  'Progressive enhancement in web development',
  'Web components in modern web development',
  'GraphQL in-depth tutorial',
  'WebSockets and real-time applications',
  'Testing strategies for JavaScript applications',
  'Microservices architecture patterns',
  'Python for automation',
  'Web performance optimization techniques',
  'Cross-platform mobile app development',
  'Web scraping with Python',
  'Front-end build tools (Webpack, Parcel)',
  'CI/CD pipelines and automation',
  'GraphQL server-side implementation',
  'Machine learning in healthcare',
  'Advanced CSS techniques',
  'WebRTC for real-time communication',
  'User authentication best practices',
  'DevOps culture and practices',
]

const pcSearch = [
  'JavaScript fundamentals',
  'Responsive web design',
  'Data structures in Python',
  'Introduction to machine learning',
  'React.js for beginners',
  'Node.js basics',
  'CSS grid layout',
  'Database management with SQL',
  'UX/UI design principles',
  'RESTful API development',
  'Mobile app development with React Native',
  'Python web frameworks (Django, Flask)',
  'Vue.js for front-end development',
  'Data visualization with D3.js',
  'Progressive web apps (PWAs)',
  'Responsive images and performance optimization',
  'Functional programming in JavaScript',
  'GraphQL introduction',
  'Web security best practices',
  'Node.js and Express.js',
  'Java programming language overview',
  'Cloud computing with AWS',
  'Front-end testing frameworks',
  'Asynchronous programming in Python',
  'Angular.js framework',
  'Blockchain technology fundamentals',
  'Web accessibility guidelines',
  'Python for data analysis',
  'Serverless architecture',
  'Mobile-first design approach',
  'Containerization with Docker',
  'API authentication methods',
  'Cybersecurity essentials',
  'WebAssembly and its applications',
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