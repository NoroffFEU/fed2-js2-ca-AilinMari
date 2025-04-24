import { youStoryApi } from '../apiClient.js';
import { readPostsByUser } from '../post/read.js';

let apiClient = new youStoryApi();

async function getBlogposts() {
  try {
    const accessToken = localStorage.getItem('token');
    if (!accessToken) {
      console.error('User is not logged in. Posts will not be displayed.');
      return; // Exit if the user is not logged in
    }

    let blogposts = await youstoryApi.getBlogposts();
    getBlogposts(blogposts);
    renderProfileInfo(data.name); // Assuming the first post's author is the logged-in user
  } catch (error) {
    console.error('Error fetching blogposts', error);
  }
}

const author = await apiClient.getBlogName();
console.log(`Author name: ${author}`); // Debugging log
const blogPosts = await apiClient.getBlogposts();
console.log(`Blog posts for user :${author}`, blogPosts);

// async function testFunction() {
//   const posts = await readPostsByUser('tetud.noroff.no';
//   renderBlogposts(posts.data);
// }

// testFunction();
// let readPostsByUser = await youstoryApi.readPostsByUser()

//   .then((response) => {
//     console.log('Response from readPostsByUser:', response); // Debugging log
//     return response.data; // Assuming the API returns an object with a data property
//   }
//   .catch((error) => {
//     console.error('Error fetching posts by user:', error); // Debugging log
//     return []; // Return an empty array in case of error
//   }
//   );
// console.log('Posts by user:', readPostsByUser); // Debugging log
// console.log(readPostsByUser.data); // Debugging log
// console.log(readPostsByUser.data[0]); // Debugging log
// console.log(readPostsByUser.data[0].author); // Debugging log

function renderProfileInfo(author) {
  console.log(author);
  const profileInfo = document.getElementById('profileInfo');
  if (!profileInfo) {
    console.error('Error: #profileInfo container not found in DOM');
    return;
  }
  profileInfo.innerHTML = ''; // Clear existing content

  if (!author || !author.name || !author.avatar) {
    console.error('Error: Missing author data in API response');
    profileInfo.innerHTML = '<p>Profile information is not available.</p>';
    return;
  }
  const authorName = document.createElement('h1');
  authorName.textContent = author.name;

  const profileInfoContainer = document.createElement('div');
  profileInfoContainer.className = 'profile-info-container';

  const authorAvatar = document.createElement('img');
  authorAvatar.src = author.avatar.url;
  authorAvatar.alt = author.avatar.alt || `${author.name}'s avatar`;
  authorAvatar.className = 'profile-avatar';

  const followersAndPostsContainer = document.createElement('div');
  followersAndPostsContainer.className = 'followers-postst-count';

  const postsCount = document.createElement('p');
  postsCount.textContent = `Posts: ${author._count.posts}`; // Assuming author object has postsCount property

  const followersCount = document.createElement('p');
  followersCount.textContent = `Followers: ${author._count.followers}`; // Assuming author object has followersCount property

  const followingCount = document.createElement('p');
  followingCount.textContent = `Following: ${author._count.following}`; // Assuming author object has followingCount property
  

  // const bannerImage = document.createElement('img');
  // bannerImage.src = author.banner.url;
  // bannerImage.alt = author.banner.alt || `${author.name}'s banner`;
  // bannerImage.className = 'profile-banner';
  profileInfo.appendChild(profileInfoContainer);
  profileInfoContainer.append( authorAvatar, authorName,);  
  profileInfo.appendChild(followersAndPostsContainer);
  followersAndPostsContainer.append(postsCount, followersCount, followingCount);


}

async function handleProfileView() {
  const author = await apiClient.getUserProfile();
  console.log(author);
  renderProfileInfo(author);
}

handleProfileView();

function renderBlogposts(posts) {
  const thumbnailGrid = document.getElementById('profileFeed');
  thumbnailGrid.className = 'thumbnail-grid';
  thumbnailGrid.innerHTML = '';

  posts.forEach((blogpost) => {
    const postContainer = document.createElement('div');
    postContainer.className = 'container';

    const link = document.createElement('a');
    link.href = `/blogpost.html?id=${blogpost.id}`;

    const img = document.createElement('img');
    img.src = blogpost.media?.url;
    img.alt = blogpost.media?.alt;

    const title = document.createElement('h2');
    title.textContent = blogpost.title;

    const author = document.createElement('p');
    author.textContent = blogpost.author?.name;

    postContainer.appendChild(title);
    postContainer.appendChild(author);
    postContainer.appendChild(img);
    postContainer.appendChild(link);
    thumbnailGrid.appendChild(postContainer);
  });
}
// getBlogpost();
