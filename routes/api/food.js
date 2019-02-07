const axios = require('axios');
const router = require('express').Router();

const apiKey = "17006052019254382b307983dda001e6";
const apiId = "35f188d5";

// Route /api/food
router.get("/", (req, res) => {
   var searchText = req.query.q;
    console.log(req.query);

    if (searchText) {
        // edamam url base
            var queryURL =
            "https://api.edamam.com/search?from=0&to=20&app_id=" +
            apiId +
            "&app_key=" +
            apiKey + "&q=" + searchText;
          console.log(queryURL);

        //   $.ajax({
        //     url: queryURL,
        //     method: "GET"
        //   }).then(function (response) {
        //     console.log(response);
        //     var recipes = [];
        //     for (var i = 0; i < response.hits.length; i++) {
        //       var recipeObj = {imageURL: response.hits[i].recipe.image, title: response.hits[i].recipe.label};
        //       recipes.push(recipeObj);
        //     };

        axios.get(queryURL)
            .then(response => {
                // console.log(response.data);

                var recipes = [];
                for (var i = 0; i < response.data.hits.length; i++) {
                    
                    var recipeObj = { imageURL: response.data.hits[i].recipe.image, title: response.data.hits[i].recipe.label };
                    recipes.push(recipeObj);
                };

                res.json(recipes);
            })
            .catch(err => res.json(err));

    } else {
        res.json("Please input the search text");
    };
});

module.exports = router;