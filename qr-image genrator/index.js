import inquirer from "inquirer";
import fs from "fs";
import qr from "qr-image";
inquirer
  .prompt([
    {
      name: "URL",
      type: "input",
      message: "enter the URL of website you want to generate the QR code:",
    },
  ])
  .then((answers) => {
    let url = answers.URL;
    let mainPart = url.replace(/^https?:\/\//, ""); // Remove http:// or https://
    let beforeDot = mainPart.split(".")[0]; // Get everything before the first dot
    var qr_png = qr.image(url, { type: "png" });
    qr_png.pipe(fs.createWriteStream(`${beforeDot}-qr.png`));
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log(error);
    } else {
      console.log("successfully created a file");
    }
  });
