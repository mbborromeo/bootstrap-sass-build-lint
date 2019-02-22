/* eslint-env jquery */
/* global $ */

(function () {
  // use IIFE because I want to initially hide other card rows besides first row.
  var $cardRows = $('.card-deck');
  var $cardRowsLength = $cardRows.length;
  var $cardRowCurrentIndex = 0;
  var $buttonReadMoreCards = $('#btn_readMoreCards');

  // hide all rows except first one
  $cardRows.hide().eq(0).show();
  // for (let i = 1; i < $cardRowsLength; i++) {
  //   $cardRows.eq(i).hide();
  // }

  // when document has loaded
  $(document).ready(function () {
    // click handler for when 'Read More' button
    $buttonReadMoreCards.on('click', function () {
      // check not end of row
      if ($cardRowCurrentIndex + 1 < $cardRowsLength) {
        $cardRowCurrentIndex++;
        $cardRows.eq($cardRowCurrentIndex).fadeIn('slow');
      }
    });
  });
}());
