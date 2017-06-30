//Fuction when the user clicks to see the results of the famous quotes
$(document).on('submit', "#quote-count", function (key) {
    key.preventDefault();
    var userInputNumber = $('#count-number').val();
    if (userInputNumber == "") {
        alert('Please type in a number 1-10');
    }
    var userInputRadio = $("input[class='option']:checked").val();
    console.log(userInputNumber, userInputRadio);
    getResults(userInputNumber, userInputRadio);

});

//function that takes the famous quote and 'yodafies' it
$(document).on('submit', ".yodafy-quote", function (key) {
    key.preventDefault();
    var quoteToYodafy = $(this).find('.quote-to-yodafy').val();


    console.log(quoteToYodafy);
    yodafyResults(quoteToYodafy);
});

//function that takes the user's input and 'yodafies' it
$(document).on('submit', "#search-form", function (key) {
    key.preventDefault();
    var quoteToYodafy = $('#search-section').val();

    if (quoteToYodafy == "") {
        alert('Type something in, you must.');
    }

    console.log(quoteToYodafy);
    yodafyResults(quoteToYodafy);
});


function yodafyResults(quoteToYodafy) {
    var url = '/yoda-quote/' + quoteToYodafy;
    //console.log(query);
    $.ajax({
            method: 'GET',
            dataType: 'json',
            url: url,
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            console.log(result);
            addFavoriteProduct(result);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//function to get results from api
function getResults(query, inputRadio) {
    var url = "";
    if (inputRadio == 0) {
        url = '/search/movies/' + query;
    } else {
        url = '/search/famous/' + query;
    }
    //console.log(query);
    $.ajax({
            method: 'GET',
            dataType: 'json',
            url: url,
        })
        /* if the call is successful (status 200 OK) show results */
        .done(function (result) {
            /* if the results are meeningful, we can just console.log them */
            //console.log(result);
            resultsIntoListItem(result);
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//function to get the shorten the output
function sanitizeJSON(unsanitized) {
    var str = JSON.stringify(unsanitized);
    var output = str
        .replace(/\\/g, "-")
        .replace(/\//g, "-")
        .replace(/\n/g, "")
        .replace(/\r/g, "")
        .replace(/\t/g, "")
        .replace(/\f/g, "")
        .replace(/"/g, "")
        .replace(/'/g, "")
        .replace(/\®/g, "")
        .replace(/\&/g, "");
    return output;
}

//function to display results of list items
function resultsIntoListItem(data) {
    console.log(data);
    var resultElement = '';
    if (data.length == 0) {
        alert("No Results Found!");
    } else {
        resultElement += '<h1>';
        resultElement += 'Quotes';
        resultElement += '</h1>';
        resultElement += '<br>';
        data.forEach(function (item) {
            resultElement += '<li>';
            resultElement += '<h2>' + item.quote + '</h2>';
            resultElement += '<p class="author">'; //target blank will open the video in a new window
            resultElement += item.author; //displays the video's thumbnail
            resultElement += '</p>';
            resultElement += '<form class="yodafy-quote">';
            resultElement += '<input class="quote-to-yodafy" type="hidden" value="' + item.quote + '">';
            resultElement += '<button id="yodafy-count-button" type="submit">Yodafy</button>';
            resultElement += '</form>';
            resultElement += '</li>';
        });
    }
    //console.log(resultElement);

    $('.search-results').html(resultElement);
}


//clicking the favorites to add the product
$(document).on('click', ".favorites", function (key) {

    var favoriteProductName = $(this).closest('.add-product-to-favorites').find('input').val();
    //console.log("inside favProductName", favoriteProductName);
    addFavoriteProduct(favoriteProductName);
});

//clicking the favorites to delete the entire favorites list
$(document).on('click', ".delete-favorites", function (key) {
    deleteFavorites();
});

//clicking the favorites to delete an item on the list
$(document).on('click', ".deleteFavorite", function (key) {
    event.preventDefault();
    var favoritesIdToDelete = $(this).parent().find('.deleteFavoriteValueInput').val();


    deleteOneFavorite(favoritesIdToDelete);
});

//function to add items
function addFavoriteProduct(favoriteProductName) {

    console.log(favoriteProductName);

    var favoriteProduct = {
        'productName': favoriteProductName
    };

    console.log(favoriteProduct);

    $.ajax({
            method: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(favoriteProduct),
            url: '/favorite-product/'
        })
        .done(function (product) {
            getFavoriteProducts();
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//function to delete favorites list
function deleteFavorites() {
    console.log("inside delete favorites");
    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            url: '/delete-favorites/',
        })
        .done(function (product) {
            getFavoriteProducts();
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//function to delete one item from favorites
function deleteOneFavorite(favoritesIdToDelete) {
    console.log("inside delete one favorite");

    $.ajax({
            method: 'DELETE',
            dataType: 'json',
            url: '/delete-one-favorite/' + favoritesIdToDelete,
        })
        .done(function (product) {
            getFavoriteProducts();
        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}

//function to get the favorite product
function getFavoriteProducts() {

    $.ajax({
            method: 'GET',
            dataType: 'json',
            url: '/favorite-products',
        })
        .done(function (products) {
            console.log(products);

            var buildTheHtmlOutput = "";

            $.each(products, function (productsKey, productsValue) {

                buildTheHtmlOutput += "<li>";
                buildTheHtmlOutput += productsValue.name;
                buildTheHtmlOutput += "<div class='deleteFavorite'>";
                buildTheHtmlOutput += "<form class='deleteFavoriteValue'>";
                buildTheHtmlOutput += "<input type='hidden' class='deleteFavoriteValueInput' value='" + productsValue._id + "'>";
                buildTheHtmlOutput += "<button type='submit' class='deleteFavoriteButton'>";
                buildTheHtmlOutput += "<img src='/assets/images/delete-favorites.png' class='delete-favorite-icon'>";
                buildTheHtmlOutput += "</button>";
                buildTheHtmlOutput += "</form>";
                buildTheHtmlOutput += "</div>";
                buildTheHtmlOutput += "</li>";
            });

            //use the HTML output to show it in the index.html
            $(".favorites-container ul").html(buildTheHtmlOutput);

        })
        /* if the call is NOT successful show errors */
        .fail(function (jqXHR, error, errorThrown) {
            console.log(jqXHR);
            console.log(error);
            console.log(errorThrown);
        });
}



$(document).ready(function () {
    getFavoriteProducts();
    $(".results").hide();
})
