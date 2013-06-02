// http://www.ifreesite.com/gbkbig5.htm
var cheerio = require("cheerio"),
    fs = require("fs");

fs.readFile("gbkbig5.htm", function(err, data) {

    var $ = cheerio.load(data),
        results = [];

    $("#top1 td[colspan='4']").each(function() {
        var eachColumn = $(this).find("b").html(),
            matchedWords = [];

        eachColumn = eachColumn.replace(/(&nbsp;)+/g, " ");
        eachColumn = eachColumn.replace(/——/g, ":");
        eachColumn = eachColumn.match(/\S:\S/g);

        if (eachColumn) {
            for ( var i = 0; i < eachColumn.length; i++ ) {
                console.log(eachColumn[i].match(/[^:]+/)[0]);
            }
        }
    });
});

