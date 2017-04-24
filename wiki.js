// Define a new module for our app. The array holds the names of dependencies if any.

function Wiki(title, content, href) {
  this.title = title;
  this.content = content;
  this.href = href;

}

function displayWiki(wikiObjArray) {
  clearList();
  wikiObjArray.forEach(function(obj) {
    $('.list').append(
      '<li class="wiki"><a href="' + obj.href + '" target="_blank">' + '<h3>' + obj.title + '</h3>' + '<p>' + obj.content + '</p>' + '</a></li>'
    );
  });
}
$(document).ready(function() {
  var searchBox = $('.searchBox');
  searchBox.on('change', function() {
    var str = $(this).val();
    $(this).attr('value', str);
    if (str !== "") {
      getWikiList(str);
    }

  }).change();
  $('.searchBox').keyup(function() {
    if (!this.value) {
      clearList();
    }
  });

}); //End of document ready

function getWikiList(searchRequest) {
  var apiURL = "https://en.wikipedia.org/w/api.php?action=query&callback=?&&format=json&errorformat=plaintext&list=search&utf8=1&srsearch=" + searchRequest;
  $.getJSON(apiURL, function(response) {
    console.log(response);
    if (jQuery.isEmptyObject(response.query.search)) {
      console.log("Empty");
      clearList();
      $('.list').append('<li class="error">No search results</li>');
    } else {
      var list = [];
      response.query.search.forEach(function(obj) {

        var aWiki = new Wiki(obj.title, obj.snippet, "https://en.wikipedia.org/wiki/" + obj.title);

        list.push(aWiki);

      });
      displayWiki(list);

    }

  });
} //end of getWiki function

function clearList() {
  $('.wiki').remove();
  $('.error').remove();
}