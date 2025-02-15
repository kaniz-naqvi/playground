const main = document.querySelector("main");
async function getBlogsData() {
  let response = await fetch("/api/blogs");
  let blogs = await response.json();
  console.log(blogs);
  if (blogs.length < 1) {
    main.innerHTML = `<p class="text-secondary">Nothing here, <a href="/create">Add blogs</a> to see the list!</p>`;
  }
}
getBlogsData();
