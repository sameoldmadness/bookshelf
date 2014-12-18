(function() {
    var request = new XMLHttpRequest();

    function $(tag, context) {
        return [].slice.apply(context.getElementsByTagName(tag))
    }

    function replaceRating(context) {
        $("h3", context).forEach(function(header) {
            header.innerHTML = header.textContent.replace(/\++/, function(result) {
                var l = result.length;
                var r = "";
                for (var i = 0; i < 5; i += 1) {
                    r += i < l ? "★" : "✩"
                }
                return '<span class="rating">' + r + "</span>"
            })
        })
    }

    function adaptTables(context) {
        $("table", context).forEach(function(table) {
            var adaptiveTable = document.createElement("table");

            adaptiveTable.className = "adaptive";
            
            $("tr", table).forEach(function(tr, i) {
                var stack = [];
                var adaptiveTr = document.createElement("tr");
                var adaptiveCell;
                var tag = i === 0 ? "th" : "td";

                $(tag, tr).forEach(function(cell, j) {
                    if (j < 2) {
                        adaptiveCell = document.createElement(tag);
                        adaptiveCell.innerHTML = cell.innerHTML;
                        adaptiveTr.appendChild(adaptiveCell)
                    } else {
                        stack.push(cell.innerHTML)
                    }
                });

                if (stack.length) {
                    adaptiveCell = document.createElement(tag);
                    adaptiveCell.innerHTML = stack.join(i === 0 ? ", " : "<br>");
                    adaptiveTr.appendChild(adaptiveCell)
                }

                adaptiveTable.appendChild(adaptiveTr)
            });
            table.parentNode.insertBefore(adaptiveTable, table.nextSibling)
        })
    }

    request.onload = function() {
        var content = document.getElementById("content");
        content.style.display = "none";
        content.innerHTML = marked(this.responseText);
        replaceRating(content);
        adaptTables(content);
        content.style.display = ""
    };
    
    request.open("get", "README.md", true);
    request.send()
}());