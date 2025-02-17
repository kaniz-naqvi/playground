import express from "express";
import { fileURLToPath } from "url";
import { dirname } from "path";
import fs from "fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;
const blogFile = __dirname + "/data/blog.json";

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/create", (req, res) => {
  res.sendFile(__dirname + "/public/view/create.html");
});

app.post("/blog", (req, res) => {
  const newBlog = {
    id: Date.now(),
    title: req.body.title,
    content: req.body.content,
  };

  console.log("New Blog Received:", newBlog);

  // Read the JSON file once
  fs.readFile(blogFile, "utf8", (err, data) => {
    if (err && err.code !== "ENOENT") {
      console.error("Error reading file:", err);
      return res.status(500).send("Error reading blog data");
    }

    let blogs = [];
    if (data) {
      try {
        blogs = JSON.parse(data);
      } catch (parseErr) {
        console.error("Error parsing JSON:", parseErr);
        return res.status(500).send("Invalid JSON format");
      }
    }

    // Check if blog is already added (Prevent Duplicates)
    if (
      blogs.some(
        (blog) =>
          blog.title === newBlog.title && blog.content === newBlog.content
      )
    ) {
      console.log("Duplicate blog detected, not adding again.");
      return res.redirect("/blog");
    }

    // Push new blog and write back to file
    blogs.push(newBlog);
    fs.writeFile(blogFile, JSON.stringify(blogs, null, 2), (writeErr) => {
      if (writeErr) {
        console.error("Error writing file:", writeErr);
        return res.status(500).send("Error saving blog data");
      }
      console.log("Blog saved successfully!");
      res.redirect("/blog");
    });
  });
});
//API
const blogData = __dirname + "/data/blog.json";
app.get("/api/blogs", (req, res) => {
  fs.readFile(blogData, "utf8", (err, data) => {
    if (err) console.log(err);
    else {
      res.json(JSON.parse(data));
    }
  });
});
//Blog List
app.get("/blogs-list", (req, res) => {
  res.sendFile(__dirname + "/public/view/blogList.html");
});
app.get("/blog", (req, res) => {
  res.sendFile(__dirname + "/public/view/blogDetail.html");
});
//Delete functionality
app.delete("/api/blogs/:id", (req, res) => {
  let blog = req.params.id;
  fs.readFile(blogFile, "utf8", (err, data) => {
    if (err) return console.log(err);
    let blogs = JSON.parse(data);
    let updateBlogList = blogs.filter((b) => b.id != blog);
    // Write the updated list back to the file
    fs.writeFile(
      blogFile,
      JSON.stringify(updateBlogList, null, 2),
      (writeErr) => {
        if (writeErr) {
          console.error("Error writing file:", writeErr);
          return res.status(500).json({ error: "Error saving blog data" });
        }
      }
    );
  });
  res.status(200).json({ message: "Blog deleted successfully" });
});
//Edit
// app.post("/api/blogs/:id", (req, res) => {
//   let blog = req.params.id;
//   console.log(blog);
//   fs.readFile(blogFile, "utf8", (err, data) => {
//     if (err) return err;
//     let blogs= JSON.parse
//   });
//   sendFile(__dirname + "/public/view/blogDetails.html");
//   return res.status(200).json({ message: "Blog deleted successfully" });
// });
//Home
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.listen(port, () => {
  console.log(`App is listening on port ${port}`);
});
