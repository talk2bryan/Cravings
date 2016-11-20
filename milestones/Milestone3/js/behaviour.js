


$(document).ready(function() {
    var source = "https://raw.githubusercontent.com/talk2bryan/Cravings/master/milestones/Milestone3";
    // load row
    $.ajax({
            type: "GET",
            url: source +"/resources/data.csv",
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

                var aDiv = document.createElement('a');
                aDiv.className = 'show-loading';
                aDiv.setAttribute('href',source+"/Prototype.html"); //link to restaurant

                var fullDiv = document.createElement('span');
                fullDiv.className = 'full-div';
                aDiv.appendChild(fullDiv);

                // logoDiv.setAttribute('href',source+"/Prototype.html");

                var parentRow = document.createElement('div');
                parentRow.className='row';

                var restLogo = document.createElement('div');
                restLogo.className = 'restaurant-logo';

                var innerLogoA = document.createElement('a');
                innerLogoA.className = 'show-loading';
                innerLogoA.setAttribute('href',source+"/Prototype.html");//link to restaurant

                var logoImg = document.createElement('img');
                logoImg.className = 'logo-img';
                console.log(row.picture);
                    //bug here, TODO
                    //https://raw.githubusercontent.com/talk2bryan/Cravings/master/milestones/Milestone3/Prototype.html
                    //https://raw.githubusercontent.com/talk2bryan/Cravings/master/images/hseih.jpg
                logoImg.setAttribute('src',row.picture);
                    //workaround
                    // logoImg.setAttribute('src',source+ '/resources/images'+row.picture);

                innerLogoA.appendChild(logoImg);
                restLogo.appendChild(innerLogoA);

                var restInfoDiv = document.createElement('div');
                restInfoDiv.className = 'col-xs-10';

                var rowNoGuttersDiv = document.createElement('div');
                rowNoGuttersDiv.className = 'row no-gutters';

                var restInfoBucket = document.createElement('div');
                restInfoBucket.className = 'col-xs-12 restaurant-name-content';
                var restName = document.createElement('span');
                restName.className = 'restaurant-name';
                restName.textContent = row.name;
                var restLoc = document.createElement('div');
                restLoc.className = 'location-name';
                restLoc.textContent = row.address + ', ' + row.city + ' ' + row.province + '. '+ row.postalCode;
                restInfoBucket.appendChild(restName);
                restInfoBucket.appendChild(restLoc);

                rowNoGuttersDiv.appendChild(restInfoBucket);
                restInfoDiv.appendChild(rowNoGuttersDiv);

                parentRow.appendChild(restLogo);
                parentRow.appendChild(restInfoDiv);

                //encapsulate everything as a row
                innerDiv.appendChild(aDiv);
                innerDiv.appendChild(parentRow);

                iDiv.appendChild(innerDiv); //add it to growing list of restaurants
            }
            document.getElementById('restaurant-list-container').appendChild(iDiv); //add it to container
        }
    });
});
