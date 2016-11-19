
function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed!";
}
$(document).ready(function() {

    // load row
    $.ajax({
        type: "GET",
        url: "../resources/data.csv",
        success: function (data) {

            var bufferString = Papa.unparse(Papa.parse(data).data);
            var arr = bufferString.split('\n');
            var idName = document.getElementById('restaurant-list-container');

            var iDiv = document.createElement('div');
            iDiv.id = 'body';
            iDiv.className = 'block';

            var restList = [];
            // var headers = arr[0].split(',');
            for (var i = 1; i < arr.length; i++) {
                var innerDiv = document.createElement('div');//one restaurant row
                innerDiv.className = 'restaurant-list';

                var row = arr[i].split(',');
                innerDiv.append($("<h4 />", row[0]));
                iDiv.appendChild(innerDiv);
                // var obj = {};
                // for (var j = 0; j < row.length; j++) {
                //     // obj[headers[j].trim()] = row[j].trim();
                // }
                // restList.push(obj);
            }
            // idName.appendChild(innerDiv);
            document.getElementById('restaurant-list-container').appendChild(iDiv);
        }
    });
});