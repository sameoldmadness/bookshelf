(function () {

$.get('index.md').then(function (data) {
  $('#content').html(marked(data));

  $('h3').each(function () {
    var $this = $(this);
    var text = $this.text();
    
    $this.html(text.replace(/\++/, function (result) {
      var l = result.length;
      var r = '';

      for (var i = 0; i < 5; i += 1) {
        r += i < l ? '★' : '✩';
      }

      return '<span class="rating">' + r + '</span>';
    }));
  });
});

}());
