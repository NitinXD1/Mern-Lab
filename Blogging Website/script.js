// Get posts from localStorage or initialize with default posts
let posts = JSON.parse(localStorage.getItem('posts')) || [
  {
    title: "Sample Blog Post 1",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis.",
    image: "images/post1.jpg"
  },
  {
    title: "Sample Blog Post 2",
    content: "Fusce nec metus sit amet eros pulvinar egestas sit amet sit amet dolor. Etiam vel justo eu odio dignissim bibendum.",
    image: "images/post2.jpg"
  }
];

// Function to render posts on the homepage
function renderPosts() {
  const blogPostsContainer = document.getElementById('blog-posts');
  blogPostsContainer.innerHTML = ''; // Clear existing posts

  posts.forEach((post, index) => {
    const postElement = document.createElement('article');
    postElement.classList.add('blog-post');

    const postImage = document.createElement('img');
    postImage.src = post.image;
    postImage.alt = "Blog Image";

    const postTitle = document.createElement('h2');
    postTitle.textContent = post.title;

    const postExcerpt = document.createElement('p');
    postExcerpt.classList.add('excerpt');
    postExcerpt.textContent = post.content.slice(0, 100) + '...';

    const readMoreLink = document.createElement('a');
    readMoreLink.classList.add('read-more');
    readMoreLink.href = `post.html?post=${index}`; // Passing index in the URL
    readMoreLink.textContent = 'Read More';

    const deleteButton = document.createElement('button');
    deleteButton.classList.add('delete-button');
    deleteButton.textContent = 'Delete Post';
    deleteButton.onclick = () => deletePost(index);

    postElement.appendChild(postImage);
    postElement.appendChild(postTitle);
    postElement.appendChild(postExcerpt);
    postElement.appendChild(readMoreLink);
    postElement.appendChild(deleteButton);

    blogPostsContainer.appendChild(postElement);
  });
}

// Function to delete a post
function deletePost(index) {
  posts.splice(index, 1); // Remove post from array
  localStorage.setItem('posts', JSON.stringify(posts)); // Update localStorage
  renderPosts(); // Re-render the posts
}

// Function to handle form submission for creating new post
document.getElementById('blog-form')?.addEventListener('submit', function(event) {
  event.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;
  const image = document.getElementById('image').value;

  const newPost = {
    title: title,
    content: content,
    image: image
  };

  posts.push(newPost); // Add new post to the posts array
  localStorage.setItem('posts', JSON.stringify(posts)); // Save posts to localStorage

  window.location.href = 'index.html'; // Redirect back to homepage
});

// Load posts on page load
window.onload = renderPosts;

// Handle Add New Post button click
document.getElementById('add-post-button')?.addEventListener('click', () => {
  window.location.href = 'post.html'; // Redirect to the post creation page
});
