


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

            document.getElementById("list-info").innerHTML = restList.length-1 + " restaurants offering X food";

                var iDiv = document.createElement('div');
            iDiv.id = 'block';
            iDiv.className = 'block';

            for (var ii = 0; ii<restList.length-1; ii++) {
                var innerDiv = document.createElement('div');//one restaurant row
                innerDiv.className = 'restaurant-list';
                innerDiv.id = 'block-2';

                var row = restList[ii];

                // var rowDiv = document.createElement('div');
                // rowDiv.className='row';
                //
                // var logoDiv = document.createElement('div');
                // logoDiv.className = 'restaurant-logo';
                // var imgDiv = document.createElement('img');
                // imgDiv.className = 'lazy';
                // imgDiv.setAttribute('src',row.picture);
                // imgDiv.style = 'display: inline';
                // logoDiv.appendChild(imgDiv);
                //
                // rowDiv.appendChild(logoDiv);
                //
                // innerDiv.appendChild(rowDiv);
                innerDiv.append(row.name);

                iDiv.appendChild(innerDiv);
            }
            document.getElementById('restaurant-list-container').appendChild(iDiv);
        }
    });
});
