(function($) {

    // This is the connector function.
    // It connects one item from the navigation carousel to one item from the
    // stage carousel.
    // The default behaviour is, to connect items with the same index from both
    // carousels. This might _not_ work with circular carousels!
    var connector = function(itemNavigation, carouselStage) {
        return carouselStage.jcarousel('items').eq(itemNavigation.index());
    };

    var baseURL = 'images/';

    $(function() {

      // Setup the carousels. Adjust the options for both carousels here.
      var carouselStage      = $('.carousel-stage').jcarousel();
      var carouselNavigation = $('.carousel-navigation').jcarousel();

      var setup = function(data) {
        var stageHTML = '<ul>';
        var thumbnailHTML = '<ul>';

        $.each(data.art_pieces, function() {
          stageHTML += '<li><img src="' + baseURL + 'art-pieces-stage/' + this.image_file_name + '" alt="' + this.title + '"></li>';
          thumbnailHTML += '<li><img src="' + baseURL + 'art-pieces-thumbnail/' + this.image_file_name + '" alt="' + this.title + '"></li>';
        });

        stageHTML += '</ul>';
        thumbnailHTML += '</ul>';

        // Append items
        carouselStage.html(stageHTML);
        carouselNavigation.html(thumbnailHTML);

        // Reload carousel
        carouselStage.jcarousel('reload');
        carouselNavigation.jcarousel('reload');

        var connector = function(itemNavigation, carouselStage) {
          return carouselStage.jcarousel('items').eq(itemNavigation.index());
        };

        // We loop through the items of the navigation carousel and set it up
        // as a control for an item from the stage carousel.
        carouselNavigation.jcarousel('items').each(function() {
          var item = $(this);

          // This is where we actually connect to items.

          var target = connector(item, carouselStage);

          item
          .on('jcarouselcontrol:active', function() {
            carouselNavigation.jcarousel('scrollIntoView', this);
            item.addClass('active');
          })
          .on('jcarouselcontrol:inactive', function() {
            item.removeClass('active');
          })
          .jcarouselControl({
            target: target,
            carousel: carouselStage
          });
        });

        // Setup controls for the stage carousel
        $('.prev-stage')
        .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
        })
        .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
        })
        .jcarouselControl({
          target: '-=1'
        });

        $('.next-stage')
        .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
        })
        .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
        })
        .jcarouselControl({
          target: '+=1'
        });

        // Setup controls for the navigation carousel
        $('.prev-navigation')
        .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
        })
        .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
        })
        .jcarouselControl({
          target: '-=1'
        });

        $('.next-navigation')
        .on('jcarouselcontrol:inactive', function() {
          $(this).addClass('inactive');
        })
        .on('jcarouselcontrol:active', function() {
          $(this).removeClass('inactive');
        })
        .jcarouselControl({
          target: '+=1'
        });


      };

      $.getJSON('art-pieces.json', setup);

    });
})(jQuery);
