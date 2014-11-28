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

  $('table').each(function () {
    var $table = $(this);
    var $adaptiveTable = $('<table>').addClass('adaptive');

    $table.find('tr').each(function (i) {
      var $tr = $(this);
      var stack = [];
      var $adaptiveTr = $('<tr>');
      var $adaptiveTd;
      var tag = i === 0 ? 'th' : 'td';

      $tr.find('td, th').each(function (j) {
        var $td = $(this);

        if (j < 2) {
          $adaptiveTd = $('<' + tag + '>');
          $adaptiveTd.html($td.html());
          $adaptiveTd.appendTo($adaptiveTr);
        } else {
          stack.push($td.html());
        }
      });

      if (stack.length) {
        $adaptiveTd = $('<' + tag + '>');
        $adaptiveTd.html(stack.join(i === 0 ? ', ' : '<br>'));
        $adaptiveTd.appendTo($adaptiveTr);
      }

      $adaptiveTr.appendTo($adaptiveTable);
    });

    $adaptiveTable.insertAfter($table);
  });
});

}());
