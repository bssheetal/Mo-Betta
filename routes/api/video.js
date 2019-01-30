// function to search Youtube for relevant videos based on the 'order' parameter
// The order parameter specifies the method that will be used to order resources in the API response. Options are: 'relevance', 'viewCount', 'rating', 'date', 'title', 'videoCount'
// maxResults: 0-50
// Youtube API Document https://developers.google.com/youtube/v3/docs/search/list
// Using Javascript built-in object 'Promise' helps to return the result from AJAX query because AJAX is asynchronous.
// function getVideos(searchText = "", order = "relevance", maxResults = 5) {
//     return new Promise(function (resolve) {
//         var videoIDArr = [];
//         var videoTitleArr = [];

//         if (searchText !== "") {
//             var apiKey = "AIzaSyDRoM4iF7sZ807Iv__tG3KzEa2hRNBXHbM";
//             var queryUrl = "https://www.googleapis.com/youtube/v3/search";

//             var queryParams = "?" + $.param({
//                 key: apiKey,
//                 q: searchText,
//                 part: "snippet",
//                 order: order,
//                 maxResults: maxResults,
//                 type: "video"
//             });

//             var queryUlrWithParams = queryUrl + queryParams;
//             // console.log(queryUlrWithParams);

//             $.ajax({
//                 url: queryUlrWithParams,
//                 method: "GET"
//             }).then(function (response) {
//                 // console.log(response);
//                 for (var i = 0; i < maxResults; i++) {
//                     videoIDArr.push(response.items[i].id.videoId);
//                     videoTitleArr.push(response.items[i].snippet.title);
//                 };
//                 // console.log(videoIDArr);

//                 resolve({id: videoIDArr, title: videoTitleArr});   // return 'videoIDArr
//             });
//         };
//     });

// };


// function getVideosWithCallback(searchText = "", order = "", maxResults = 5, callback) {
//         var videoIDArr = [];

//         if (searchText !== "") {
//             var apiKey = "AIzaSyDRoM4iF7sZ807Iv__tG3KzEa2hRNBXHbM";
//             var queryUrl = "https://www.googleapis.com/youtube/v3/search";

//             var queryParams = "?" + $.param({
//                 key: apiKey,
//                 q: searchText,
//                 part: "snippet",
//                 order: order,
//                 maxResults: maxResults,
//                 type: "video"
//             });

//             var queryUlrWithParams = queryUrl + queryParams;
//             console.log(queryUlrWithParams);

//             $.ajax({
//                 url: queryUlrWithParams,
//                 method: "GET"
//             }).then(function (response) {
//                 // console.log(response);
//                 for (var i = 0; i < maxResults; i++) {
//                     videoIDArr.push(response.items[i].id.videoId);
//                 };
//                 // console.log(videoIDArr);

//                 callback(videoIDArr, "test1");   // return 'videoIDArr
//             });
//         };

// };

// getVideosWithCallback("cats", "relevance", 5, function(videoData, testOne){
//     console.log(videoData);
//     console.log(testOne);
// });