const main = document.querySelector(".blog-list");

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
         <div data-id=${b.id} data-title="${b.title}" class="flex blogs-item border-top pt-3 mx-lg-5 px-3 px-lg-5">
          <div class="d-flex justify-content-between align-items-center">
            <h4 class="fw-bold py-0">${b.title}</h4>
            <button class="btn m-1 delete-btn btn-danger fw-bold">
              <i class="bi-trash3"></i>
            </button>
          </div>
          <p class="pt-0 p">${b.content}</p>
        </div>
        `;
    });
    main.innerHTML = mainHTML;
  }
}

getBlogsData();

// Event listener for the main container
main.addEventListener("click", (e) => {
  // Handle delete button click
  const deleteBtn = e.target.closest(".delete-btn");
  if (deleteBtn) {
    // Stop propagation to prevent triggering the .blogs-item handler
    e.stopPropagation();

    // Get the parent blog item and extract its ID and title
    const parentDiv = deleteBtn.closest(".blogs-item");
    const deleteId = parentDiv.dataset.id;
    const deleteName = parentDiv.dataset.title;

    // Confirm deletion with the user
    let confirmation = window.confirm(`Do you want to delete "${deleteName}"?`);
    if (confirmation) {
      deleteBlog(deleteId);
    }
    return; // Exit early to avoid running the .blogs-item handler
  }

  // Handle blog item click (show details)
  const blogItem = e.target.closest(".blogs-item");
  if (blogItem) {
    const blogId = blogItem.dataset.id;
    showDetail(blogId);
  }
});

async function deleteBlog(id) {
  let response = await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
  if (response.ok) {
    getBlogsData(); // Refresh the blog list after deletion
  } else {
    alert("Failed to Delete, try again!");
  }
}

function showDetail(id) {
  document.location.href = `/blog?id=${id}`;
}
