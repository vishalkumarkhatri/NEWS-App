const APIKey = "50b3bae9449742959876b6dc7b9110f9";
const APIUrl = "https://newsapi.org/v2/everything?q=";

const newsCardTemplate = document.getElementById("template-news-card");
const cardsContainer = document.getElementById("cards-container");

const searchTxt = document.getElementById("search-txt");
const searchBtn = document.getElementById("search-btn");

window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${APIUrl}${query}&apiKey=${APIKey}`);
    const data = await res.json();
    newsData(data.articles);
}


function newsData(articles) {
    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        cardData(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

function cardData(cardClone, article) {
    const newsImage = cardClone.querySelector("#news-image");
    const newsTitle = cardClone.querySelector(".news-title");
    const newsSource = cardClone.querySelector(".news-source");
    const newsDesc = cardClone.querySelector(".news-desc");

    newsImage.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name}: ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

let currSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currSelectedNav?.classList.remove('active');
    currSelectedNav = navItem;
    currSelectedNav.classList.add('active');
    preventDefault();
}

searchBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const query = searchTxt.value;
    if (!query) return;
    fetchNews(query);
    currSelectedNav = null;
});

searchTxt.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        const query = searchTxt.value;
        if (!query) return;
        fetchNews(query);
        currSelectedNav = null;
    }
});