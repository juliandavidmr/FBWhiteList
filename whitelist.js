console.log("Hola pestaña hijodeputa")

var toRemove = []

function removePost() {
  var feed = document.querySelectorAll('#content #mainContainer #content_container #contentArea #stream_pagelet div[role="feed"] > div');

  feed.forEach(function (element) {
    var posts = element.querySelectorAll('div[role="article"]');

    posts.forEach(function (post) {
      // console.log("Post: ", post.textContent)

      toRemove.map(function (r) {
        if (post.textContent.toLowerCase().indexOf(r.toLowerCase()) != -1) {
          post.remove()
        }
      })
    }, this);
  }, this);
}

// if (!isloaded) {
document.addEventListener("click", function (ev) {
  removePost()
});

document.addEventListener("scroll", function (ev) {
  removePost()
});

document.addEventListener("resize", function (ev) {
  removePost()
});

document.addEventListener("change", function (ev) {
  removePost()
});


function updateList(params) {
  chrome.runtime.sendMessage('getList', function (res) {
    toRemove = JSON.parse(res.list)
    // console.log("Respuesta:", toRemove)
  })
}

setInterval(function () {
  updateList();
  removePost();
}, 8000)
updateList()