const blogList = document.getElementById("blog-list");
const form = document.getElementById("new-post");
const newPost = document.getElementById("new-post-icon");
const titleInput = document.getElementById("post-title");
const bodyInput = document.getElementById("post-body");
const saved = localStorage.getItem("posts");
let postsArray = [];

blogList.classList.add("expanded");

function renderPosts() {
  localStorage.setItem("posts", JSON.stringify(postsArray));
  let html = "";
  for (let post of postsArray) {
    html += `
                <h3>${post.title}</h3>
                <p>${post.body}</p>
                <hr />
            `;
  }
  blogList.innerHTML = html;
}

if (saved) {
  postsArray = JSON.parse(saved);
  renderPosts();
} else {
  fetch("https://apis.scrimba.com/jsonplaceholder/posts")
    .then((res) => res.json())
    .then((data) => {
      postsArray = data.slice(0, 5);
      renderPosts();
    });
}

function toggleNewPost() {
  form.classList.toggle("active");
  blogList.classList.toggle("expanded");
}

newPost.addEventListener("click", function () {
  toggleNewPost();
});

function getBlogInput() {
  if (!titleInput.value || !bodyInput.value) {
    alert("Please fill in both fields.");
    return;
  }

  const postTitle = titleInput.value;
  const postBody = bodyInput.value;
  const data = {
    title: postTitle,
    body: postBody,
  };
  titleInput.value = "";
  bodyInput.value = "";
  return data;
}

function putRequest() {
  const data = getBlogInput();
  if (!data) return;

  const options = {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch("https://apis.scrimba.com/jsonplaceholder/posts", options)
    .then((res) => res.json())
    .then((post) => {
      postsArray.unshift(post);
      renderPosts();
    });
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  toggleNewPost();
  putRequest();
});
