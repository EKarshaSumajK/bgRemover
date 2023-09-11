const express = require("express");
const bodyparser = require("body-parser");
const app = express();
app.set("view engine", "ejs");

app.use(express.static(__dirname + "/public"));
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())
var imgLinks = [];
app.get("/", (req, res) => {
  res.render("index",{img_links: imgLinks});
  imgLinks.pop();
    imgLinks.pop()
});

app.post("/", async (req,res) => {

  const axios = require("axios");
    var Img_LOCATION = req.body.img
  const encodedParams = new URLSearchParams();
  encodedParams.set(
    "image_url",
    Img_LOCATION
  );
  imgLinks.push(Img_LOCATION);


  const options = {
    method: "POST",
    url: "https://background-removal.p.rapidapi.com/remove",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "9e51a39a38msh4bcaca0ca331234p19dbe9jsn3e9bf0e85bb1",
      "X-RapidAPI-Host": "background-removal.p.rapidapi.com",
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options);
    imgLinks.push(response.data.response.image_url);
    res.redirect("/");
    
  } catch (error) {
    console.error(error);
  }

});

app.listen(3000, () => {
  console.log("Running");
});
