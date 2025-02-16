const main = document.querySelector(".blog-list");
// const blogDetails = document.querySelector("blog-detail");
async function getBlogsData() {
  let response = await fetch("/api/blogs");
  let blogs = await response.json();
  console.log(blogs);
  if (blogs.length < 1) {
    main.innerHTML = `<p class="text-secondary m-auto">Nothing here, <a href="/create">Add blogs</a> to see the list!</p>`;
  } else {
    let mainHTML = "";
    blogs.forEach((b) => {
      mainHTML += `
       <div id=${b.id} class="flex border-top pt-3 mx-lg-5 px-3 px-lg-5">
        <div class="d-flex justify-content-between align-items-center">
          <h4 class="fw-bold py-0">${b.title}</h4>
          <button data-id=${b.id} class="btn m-1 delete-btn btn-danger fw-bold"
            ><i class="bi-trash3"></i>
          </button>
        </div>
        <p class="pt-0 p">${b.content}</p>
      </div>
      `;
      main.innerHTML = mainHTML;
    });
  }
}
getBlogsData();
let deleteButton = document.querySelectorAll("main .delete-btn");
console.log(deleteButton);
deleteButton.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    console.log(e.target.dataset.id);
  });
});
