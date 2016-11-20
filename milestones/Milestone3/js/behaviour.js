
function myFunction() {
    document.getElementById("demo").innerHTML = "Paragraph changed!";
}
function test(){
    var div = document.getElementById('restaurant-list-container');

    div.innerHTML = div.innerHTML + 'Extra stuff';
    var ok = "haha";
    document.getElementsByClassName('body')[0].append(ok);
}
$(document).ready(function() {
    var source = "../resources";
    // load row
    $.ajax({
            type: "GET",
            url: source +"/data.csv",
            success: function (data) {
                test();
                var bufferString = Papa.unparse(Papa.parse(data).data);
                var arr = bufferString.split('\n');

                var restList = [];
                var headers = arr[0].split(',');
                for(var i = 1; i < arr.length; i++) {
                    var row_data = arr[i].split(',');
                    var obj = {};
                    for(var j = 0; j < row_data.length; j++) {
                        obj[headers[j].trim()] = row_data[j].trim();
                    }
                    restList.push(obj);
                }

            var iDiv = document.createElement('div');
            iDiv.id = 'body';
            iDiv.className = 'block';

            for (var ii = 1; ii< restList.length; i++) {
                var innerDiv = document.createElement('div');//one restaurant row
                innerDiv.className = 'restaurant-list';

                var row = restList[ii];
                // innerDiv.append($("<h4 />", text(row.name)));
                innerDiv.appendData("Hello");
                iDiv.appendChild(innerDiv);
                // var obj = {};
                // for (var j = 0; j < row.length; j++) {
                //     // obj[headers[j].trim()] = row[j].trim();
                // }
                // restList.push(obj);
            }
                document.getElementsByTagName('body')[0].appendChild(iDiv);            // idName.appendChild(innerDiv);

            document.getElementById('body').appendChild(iDiv);
        }
    });
});