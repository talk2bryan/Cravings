


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
                    var dollars_int;
                    var dist_float;
                    var cust_rating;
                    // innerDiv.id = 'block-2';


                    var row = restList[ii];

                    var aDiv = document.createElement('a');
                    aDiv.className = 'show-loading';
                    aDiv.setAttribute('href', source + "/Prototype.html"); //link to restaurant

                    var fullDiv = document.createElement('span');
                    fullDiv.className = 'fill-div';
                    aDiv.appendChild(fullDiv);

                    var parentRow = document.createElement('div');
                    parentRow.className = 'row';

                    var restLogo = document.createElement('div');
                    restLogo.className = 'restaurant-logo';

                    var innerLogoA = document.createElement('a');
                    innerLogoA.className = 'show-loading';
                    innerLogoA.setAttribute('href', source + "/Prototype.html");//link to restaurant

                    var logoImg = document.createElement('img');
                    logoImg.className = 'logo-img';


                    logoImg.setAttribute('src', row.picture);

                    innerLogoA.appendChild(logoImg);
                    restLogo.appendChild(innerLogoA);

                    var restInfoDiv = document.createElement('div');
                    restInfoDiv.className = 'col-xs-8';

                    var rowNoGuttersDiv = document.createElement('div');
                    rowNoGuttersDiv.className = 'row no-gutters';

                    var restInfoBucket = document.createElement('div');
                    restInfoBucket.className = 'col-xs-12 restaurant-name-content';

                    var restName = document.createElement('span');
                    restName.className = 'restaurant-name';
                    restName.textContent = row.name;

                    var restLoc = document.createElement('div');
                    restLoc.className = 'location-name';
                    restLoc.textContent = row.address + ', ' + row.city + ' ' + row.province + '. ' + row.postalCode;

                    var ratingsRowDiv = document.createElement('div');
                    ratingsRowDiv.className = 'row';

                    // var starsClass = document.createElement('div');
                    // starsClass.className = 'col-xs-12 stars';
                    //
                    // var num_i = row.rating;
                    //
                    // console.log(num_i);
                    //
                    // for (var j = 0; j<num_i; j++) {
                    //     //old method
                    //     // var oneStarDiv = document.createElement('i');
                    //     // oneStarDiv.className = 'ion-icon ion-android-star filled';
                    //
                    //     //new method
                    //     var oneStarDiv = document.createElement('span');
                    //     oneStarDiv.className='glyphicon glyphicon-star';
                    //     oneStarDiv.setAttribute('aria-hidden',true);
                    //     starsClass.appendChild(oneStarDiv);
                    // }

                    var starsClass = document.createElement('div');
                    starsClass.className = 'col-xs-12 stars';
                    var starImg = document.createElement('img');
                    starImg.className = 'logo-img';
                    cust_rating = row.rating;
                    starImg.setAttribute('src',source+'/resources/images/'+cust_rating+'.png');
                    starsClass.appendChild(starImg);


                    ratingsRowDiv.appendChild(starsClass);



                    //$("#rating").attr("src", "./resources/images/" + restList[id].rating + ".png");
                    //append rating two lines after this...
                    restInfoBucket.appendChild(restName);
                    restInfoBucket.appendChild(restLoc);
                    restInfoBucket.appendChild(ratingsRowDiv);

                    // restInfoBucket.appendChild(ratingsRowDiv);

                    rowNoGuttersDiv.appendChild(restInfoBucket);

                    restInfoDiv.appendChild(rowNoGuttersDiv);


                    var rightPanel = document.createElement('div');
                    rightPanel.className = 'col-xs-4 restaurant-details-right-panel';
                    var rightContent = document.createElement('div');
                    rightContent.className='vertical-align-content';
                    var contentRow = document.createElement('div');
                    contentRow.className='row';
                    var actualContent = document.createElement('div');
                    actualContent.className='col-xs-12 eta-info text-center';
                    var divMiles = document.createElement('div');
                    divMiles.className='info-title';
                    dist_float = row.distance;
                    divMiles.textContent = dist_float+" km";
                    var divDollars = document.createElement('div');
                    divDollars.className='delivery-eta';

                    var dollar_symbols="";
                    dollars_int=row.ratingint;
                    for(var dd=0;dd<dollars_int;dd++){ dollar_symbols=dollar_symbols+"$";}
                    divDollars.textContent =dollar_symbols;

                    actualContent.appendChild(divMiles);
                    actualContent.appendChild(divDollars);
                    contentRow.appendChild(actualContent);
                    rightContent.appendChild(contentRow);
                    rightPanel.appendChild(rightContent);

                    parentRow.appendChild(restLogo);
                    parentRow.appendChild(restInfoDiv);
                    parentRow.appendChild(rightPanel);


                    //append sort params
                    innerDiv.setAttribute('dist-sort',dist_float);
                    innerDiv.setAttribute('price-sort',dollars_int);
                    innerDiv.setAttribute('star-sort',cust_rating);

                    //encapsulate everything as a row
                    innerDiv.appendChild(aDiv);
                    innerDiv.appendChild(parentRow);

                    // iDiv.appendChild(innerDiv); //add it to growing list of restaurants
                    document.getElementById('restaurant-list-container').appendChild(innerDiv); //add it to growing list of restaurants
                }
                sort_div('price-sort');
               // document.getElementById('restaurant-list-container').sort()
                // document.getElementById('restaurant-list-container').appendChild(iDiv); //add it to container
            }
    });
});



function sort_div(dd){
    var mylist = $('#restaurant-list-container');

    var listitems = mylist.children('div').get();

    listitems.sort(function(a, b) {
        var contentA = parseInt($(a).attr(dd));
        var contentB = parseInt($(b).attr(dd));

        return  (contentA < contentB) ? -1 : (contentA > contentB) ? 1 : 0;
    });

    $.each(listitems, function(index, item) {
        mylist.append(item);
    });
    document.getElementById('restaurant-list-container').appendChild(mylist);
}

//