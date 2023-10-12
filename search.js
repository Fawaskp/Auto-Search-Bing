const textsArray = [
  "How to bake a chocolate cake",
  "Best places to visit in Paris",
  "Introduction to machine learning",
  "Healthy breakfast recipes",
  "Tips for improving focus and concentration",
  "Guide to starting a small business",
  "Beginner's guide to painting with acrylics",
  "Benefits of meditation",
  "How to build a gaming PC",
  "Famous quotes about success",
  "Climate change facts and statistics",
  "Learn to play the guitar online",
  "Home workout routines without equipment",
  "Introduction to astrophysics",
  "Top thriller novels of all time",
  "Different types of yoga and their benefits",
  "Guide to adopting a pet from a shelter",
  "DIY home improvement ideas",
  "Famous classical music composers",
  "Effective time management techniques",
  "Healthy habits for a productive life",
  "Basics of investing in the stock market",
  "How to knit a scarf for beginners",
  "History of ancient civilizations",
  "Easy DIY gardening projects",
  "Introduction to coding for kids",
  "Quick and easy dinner recipes",
  "Natural remedies for common ailments",
  "Inspirational TED Talks to watch",
  "Guide to understanding your credit score",
  "Photography tips for capturing stunning landscapes",
  "Popular dance styles around the world",
  "Overview of renewable energy sources",
  "Famous works of art and their artists",
  "Effective communication skills in the workplace",
  "Beginner's guide to hiking",
  "Mindfulness exercises for reducing stress",
  "Classic novels everyone should read",
  "How to start journaling for self-discovery",
  "Introduction to world cuisines",
  "Tips for better sleep and insomnia",
  "Learning a new language tips",
  "DIY crafts for home decoration",
  "Introduction to 3D printing",
  "Famous philosophers and their teachings",
  "Guide to creating a personal budget",
  "Basics of home electrical wiring",
  "Healthy habits for a strong immune system",
  "Understanding basic car maintenance",
  "Exploring virtual reality applications",
  "Introduction to philosophy of mind",
  "Home remedies for common skincare issues",
  "Effective study techniques for students",
  "Guide to different meditation practices",
  "Popular board games for game night",
  "Introduction to AI and ethics",
  "DIY hair care recipes using natural ingredients",
  "Top documentaries to broaden your horizons",
];


let totalCount = document.getElementById('total-search-count').textContent = textsArray.length
let CompletedCount = document.getElementById('completed-search-count')
let EstimatedPoint = document.getElementById('estimated-point')
let searchCount = 0


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

async function performSearchesWithDelay(textsArray, delayBetweenSearches) {
  for (const keyword of textsArray) {
    if (searchCount*3>=90) return
    await searchWithDelayInNewWindow(keyword, delayBetweenSearches);
  }
}

//Main Starting function
performSearchesWithDelay(textsArray, 2600)
  .then(() => {
    console.log("All searches have completed.");
  })
  .catch((error) => {
    console.error("An ER0RR HAS 0CCURED")
  })
