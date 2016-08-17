(function() {
  function displaySearchResults(results, store) {
    var headerSearch = document.getElementById('search-header');
    var searchResults = document.getElementById('search-results');
    var searchTerm = getQueryVariable('query');

    if (results.length) { // Are there any results?
      var appendString = '';

      for (var i = 0; i < results.length; i++) {  // Iterate over the results
        var item = store[results[i].ref];
        appendString += '<div class="grid__item small--one-whole mediumSmall--one-half medium--one-half large--one-third post"><a href="' + item.storeLink + '"><img src="' + item.image + '"></a>';
        appendString += '<h1 class="post-title"><a href="' + item.storeLink + '" target="_blank" class="post-link">' + item.title + '</a><span class="post-meta">' + item.date + '</span></h1>';
        if (item.creditLink != '') {
          appendString += '<p>Credit: <a href="' + item.creditLink + '" target="_blank">' + item.credit + '</a></p></div>';
        } else {
          appendString += '<div class="filler"></div></div>';
        }
      }

      searchResults.innerHTML = appendString;
      headerSearch.innerHTML = '<div class="grid__item one-whole medium--one-half push--medium--one-half large--one-third push--large--one-third"><h2>Your search for "' + searchTerm + '" found these results...</h2></div>';
    } else {
      headerSearch.innerHTML = '<div class="grid__item one-whole medium--one-half push--medium--one-half large--one-third push--large--one-third"><h2>Damn, no results found.</h2><p class="return-link"><a href="{{ site.url }}">Return to gallery</a></p></div>';
      searchResults.innerHTML = '<div class="filler"></div>';

    }
  }

  function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');

    for (var i = 0; i < vars.length; i++) {
      var pair = vars[i].split('=');

      if (pair[0] === variable) {
        return decodeURIComponent(pair[1].replace(/\+/g, '%20'));
      }
    }
  }

  var searchTerm = getQueryVariable('query');

  if (searchTerm) {
    document.getElementById('search-box').setAttribute("value", searchTerm);

    // Initalize lunr with the fields it will be searching on. I've given title
    // a boost of 10 to indicate matches on this field are more important.
    var idx = lunr(function () {
      this.field('id');
      this.field('image');
      this.field('storeLink');
      this.field('title', { boost: 10 });
      this.field('date');
      this.field('creditLink');
      this.field('credit');
    });

    for (var key in window.store) { // Add the data to lunr
      idx.add({
        'id': key,
        'image': window.store[key].image,
        'storeLink': window.store[key].storeLink,
        'title': window.store[key].title,
        'date': window.store[key].date,
        'creditLink': window.store[key].creditLink,
        'credit': window.store[key].credit
      });

      var results = idx.search(searchTerm); // Get lunr to perform a search
      displaySearchResults(results, window.store); // We'll write this in the next section
    }
  }
})();