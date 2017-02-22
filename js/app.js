
(function() {
    'use strict';


    const movies = [];

    const renderMovies = function() {
        $('#listings').empty();
        for (const movie of movies) {
            const $col = $('<div>').addClass('col s6');
            const $card = $('<div>').addClass('card hoverable');
            const $content = $('<div>').addClass('card-content center');
            const $title = $('<h6>').addClass('card-title truncate');

            $title.attr({
                'data-position': 'top',
                'data-tooltip': movie.Title
            });

            $title.tooltip({
                delay: 50
            }).text(movie.Title);

            const $poster = $('<img>').addClass('poster');

            $poster.attr({
                src: movie.Poster,
                alt: `${movie.Poster} Poster`
            });

            $content.append($title, $poster);
            $card.append($content);

            const $action = $('<div>').addClass('card-action center');
            const $plot = $('<a>');

            $plot.addClass('waves-effect waves-light btn modal-trigger');
            $plot.attr('href', `#${movie.imdbID}`);
            $plot.text('Plot Synopsis');

            $action.append($plot);
            $card.append($action);

            const $modal = $('<div>').addClass('modal').attr('id', movie.imdbID);
            const $modalContent = $('<div>').addClass('modal-content');
            const $modalHeader = $('<h4>').text(movie.Title);
            const $movieYear = $('<h6>').text(`Released in ${movie.Year}`);
            const $modalText = $('<p>').text(movie.Plot);

            $modalContent.append($modalHeader, $movieYear, $modalText);
            $modal.append($modalContent);

            $col.append($card, $modal);

            $('#listings').append($col);

            $('.modal-trigger').leanModal();
        }
    };


    $('#searchBtn').click(function() {
        event.preventDefault();
        var search = $('#search').val();
        if (search === '') {
            alert("Please enter a movie.")
        }
        $.ajax({
            method: 'GET',
            url: `http://www.omdbapi.com/?s=${search}`,
            dataType: "JSON",
            success: function(data) {
                movies.length = 0;
                for (let movie1 of data['Search']) {
                    movies.push(movie1);
                }
                renderMovies()
                $('#search').val('')
            },
            error: function() {
                console.log('error')
            },
        })
    })

$('#listings').on('click', '.btn', function(event){
console.log(event.target.hash.slice(1));
  let id = event.target.hash.slice(1);

  $.ajax({
      method: 'GET',
      url: `http://www.omdbapi.com/?i=${id}`,
      dataType: "JSON",
      success: function(data) {
        let plot = data.Plot;
        $('div.modal-content').append(`<p>${plot}</p>`)
      },
      error: function() {
          console.log('error')
      },
  })

})
  })();
