


$(document).ready(function() {
    var source = "https://raw.githubusercontent.com/talk2bryan/Cravings/master/milestones/Milestone3/resources";
    // load row
    $.ajax({
            type: "GET",
            url: source +"/data.csv",
            success: function (data) {
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
            iDiv.id = 'block';
            iDiv.className = 'block';

            for (var ii = 1; ii< restList.length; i++) {
                var innerDiv = document.createElement('div');//one restaurant row
                innerDiv.className = 'restaurant-list';
                innerDiv.className = 'block-2';

                var row = restList[ii];
                $("#block-2").html("Hello World");
                $("#block-2").html(row.name);
                // innerDiv.append($("<h4 />", row.name));
                iDiv.appendChild(innerDiv);
                // var obj = {};
                // for (var j = 0; j < row.length; j++) {
                //     // obj[headers[j].trim()] = row[j].trim();
                // }
                // restList.push(obj);
            }
                document.getElementsByTagName('body')[0].appendChild(iDiv);            // idName.appendChild(innerDiv);

            document.getElementById('restaurant-list-container').appendChild(iDiv);
        }
    });
});