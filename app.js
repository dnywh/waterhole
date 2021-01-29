const loader = document.querySelector("#loader");
const intro = document.querySelector("#intro");
const feed = document.querySelector("#feed");
const users = document.querySelector("#users");

const followingList = ["dannywhite", "lexilombari", "nicole-gonzalez"];
// Show following list on page
followingList.map(item => {
    const listItem = document.createElement("li");
    listItem.textContent = item;
    users.appendChild(listItem)
})

// Get iNaturalist data
async function getData() {
    const url = `https://api.inaturalist.org/v1/observations?user_login=${followingList.join("%2C")}&order=desc&order_by=created_at`;
    const response = await fetch(url);
    const data = await response.json();
    const feedData = data.results;

    // Remove loader, show intro
    loader.classList.remove("active");
    intro.classList.add("active");

    // Map through each item
    feedData.map(item => {
        console.log(item);

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
        feedItemLinks.map(link => {
            link.setAttribute('href', item.uri);
            link.setAttribute('target', "_blank");
            link.setAttribute('rel', "noopener noreferrer");
        });
        

        // Add data to elements
        feedItemImg.setAttribute('src', `https://static.inaturalist.org/photos/${item.photos[0].id}/medium.jpg`);
        
        if (item.taxon.preferred_common_name) {
            feedItemTitle.textContent = item.taxon.preferred_common_name;
            feedItemImg.setAttribute("title", item.taxon.preferred_common_name)
            feedItemImg.setAttribute("alt", `A photo of a ${item.taxon.preferred_common_name}`)
        } else if (item.taxon.name) {
            feedItemTitle.textContent = item.taxon.name;
            feedItemImg.setAttribute("title", item.taxon.name)
            feedItemImg.setAttribute("alt", `A photo of a ${item.taxon.name}`)
        } else if (item.species_guess) {
            feedItemTitle.textContent = item.species_guess;
            feedItemImg.setAttribute("title", item.species_guess)
            feedItemImg.setAttribute("alt", `A photo of a ${item.species_guess}`)
        } else {
            feedItemTitle.textContent = "Unknown";
        }
        
        item.user.name ? feedItemAuthor.textContent = item.user.name : feedItemAuthor.textContent = item.user.login;
        

        if (item.created_at_details.date !== item.observed_on_details.date) {
            feedItemTimestamp.textContent = `${item.created_at_details.date} (Photo taken ${item.observed_on_details.date})`
        } else {
            feedItemTimestamp.textContent = item.created_at_details.date;
        }

        // Add elements to document
        feedItemChildren.map(child => feedItem.appendChild(child));
        feed.appendChild(feedItem);
    })
}

// Show iNaturalist data on page
getData();