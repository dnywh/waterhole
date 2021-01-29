const feed = document.querySelector("#feed");
const usersInFeed = "dannywhite%2Clexilombari%2Cnicole-gonzalez"

async function getData() {
    const url = `https://api.inaturalist.org/v1/observations?user_login=${usersInFeed}&order=desc&order_by=created_at`;
    const response = await fetch(url);
    const data = await response.json();
    const feedData = data.results;

    feedData.map(item => {
        // console.log(item);

        // Define elements
        const feedItem = document.createElement("li");
        
        const feedItemImgLink = document.createElement("a");
        const feedItemTitle = document.createElement("h2");
        const feedItemAuthor = document.createElement("p");
        const feedItemTimestamp = document.createElement("p");
        const feedItemChildren = [feedItemImgLink, feedItemTitle, feedItemAuthor, feedItemTimestamp];

        // Add image to image link
        const feedItemImg = document.createElement("img");
        feedItemImgLink.appendChild(feedItemImg)
        // Add link to title
        const feedItemTextLink = document.createElement("a");
        feedItemTitle.appendChild(feedItemTextLink)
        // Add attributes to links
        const feedItemLinks = [feedItemImgLink, feedItemTextLink]
        feedItemLinks.map(link => link.setAttribute('href', item.uri));
        feedItemLinks.map(link => link.setAttribute('target', "_blank"));
        

        // Add data to elements
        feedItemImg.setAttribute('src', `https://static.inaturalist.org/photos/${item.photos[0].id}/medium.jpg`);
        feedItemTextLink.textContent = item.species_guess;
        item.user.name ? feedItemAuthor.textContent = item.user.name : feedItemAuthor.textContent = item.user.login;
        feedItemTimestamp.textContent = item.created_at_details.date;

        // Add elements to document
        feedItemChildren.map(child => feedItem.appendChild(child));
        feed.appendChild(feedItem);
    })
}

getData();