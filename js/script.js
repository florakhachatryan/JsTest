var jsonRepresentationOfTree =
    [
        {
            id:1,
            label:"a",

            children:[
                {
                    id:2,
                    label:"b",

                    children:[
                        {
                            id:5,
                            label:"e",
                        },
                        {
                            id:6,
                            label:"f",
                        },
                        {
                            id:7,
                            label:"c",
                        },
                    ]
                },
                {
                    id:3,
                    label:"c",
                },
                {
                    id:4,
                    label:"d",

                    children:[
                        {
                            id:8,
                            label:"h",
                        },
                        {
                            id:9,
                            label:"i",
                        },
                    ]
                },
            ]
        }
    ];

var responseObject = null;
/*** PROBLEM 1 ***/
document.getElementById('problem1').addEventListener('click',function () {
    console.log("/***** PROBLEM 1 *****/");
    console.log(jsonRepresentationOfTree);
    console.log("/***** PROBLEM 1 *****/\n\n");
});

/*** PROBLEM 2 ***/
document.getElementById('problem2').addEventListener('click',function () {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var jsonResponse = this.responseText;

            try {
                var jsonObject = JSON.parse(jsonResponse);
                responseObject = jsonObject;
                console.log("/***** PROBLEM 2 *****/");
                console.log(jsonObject);
                console.log("/***** PROBLEM 2 *****/\n\n");
            }catch (e) {
                console.log("ERROR WHILE PARSING JSON\n\n");
            }
        }
    };
    xhttp.open("POST", "server.php", true);
    xhttp.send();
});

/*** PROBLEM 3 ***/
var peakLabel = "";
document.getElementById('problem3').addEventListener('click',function () {
    if(null == responseObject){
        console.log("FIRST GET THE GRAPH FROM SERVER BY PRESSING SECOND BUTTON \n\n");
        return false;
    }else{
        var id = document.getElementById('graph-peak-id').value;

        if("" == id){
            console.log("GIVE ME AN ID TO FIND THE PEAK \n\n");
            return false;
        }else{
            findPeak(id,responseObject)
            if("" == peakLabel){
                console.log("NO LABEL FOUND WITH ID:"+id+"\n\n");
            }else{
                console.log("FOUNDED LABEL WITH ID:"+id+" -> "+peakLabel+"\n\n");
                peakLabel = "";
            }
        }
    }
});



document.getElementById('problem4-cancel').addEventListener('click',function () {
    cleanInputsData(true);
});

document.getElementById('problem4-ok').addEventListener('click',function () {
    cleanInputsData();
    var name = document.getElementById('name');
    var address1 = document.getElementById('address-1');
    var address2 = document.getElementById('address-2');
    var city = document.getElementById('city');
    var state = document.getElementById('state');
    var zipCode = document.getElementById('zip-code');
    if(!name.value.match(/^[A-Za-z]+$/) || name.value.length > 100 || name.value.length < 1 ) {
        name.classList.add('invalid-data');
        name.previousElementSibling.querySelector('span').innerHTML = 'Invalid name (only alpha and max length 100)'
    }
    if(!address1.value.match(/^[A-Za-z0-9]+$/) || address1.value.length > 100 || address1.value.length < 1 ) {
        address1.classList.add('invalid-data');
        address1.previousElementSibling.querySelector('span').innerHTML = 'Invalid address(only alphanumeric and max length 100)'
    }
    if( (!address2.value.match(/^[A-Za-z0-9]+$/) || address2.value.length > 100) && address2.value.length>0) {
        address2.classList.add('invalid-data');
        address2.previousElementSibling.querySelector('span').innerHTML = 'Invalid address(only alphanumeric and max length 100)'
    }
    if(!city.value.match(/^[A-Za-z0-9]+$/) || city.value.length > 50 || city.value.length < 1 ) {
        city.classList.add('invalid-data');
        city.previousElementSibling.querySelector('span').innerHTML = 'Invalid city(only alphanumeric and max length 50)'
    }
    if(!state.value.match(/^[A-Za-z]+$/) || state.value.length > 2 || state.value.length < 2 ) {
        state.classList.add('invalid-data');
        state.previousElementSibling.querySelector('span').innerHTML = 'Invalid state(only alpha and length 2)'
    }
    if(!zipCode.value.match(/^[0-9]+$/) || zipCode.value.length > 5 || zipCode.value.length < 5 ) {
        zipCode.classList.add('invalid-data');
        zipCode.previousElementSibling.querySelector('span').innerHTML = 'Invalid zip code(only numeric and length 5)'
    }
});


function cleanInputsData(cleanData = false) {
    var problem4Form = document.getElementsByClassName('problem4-form')[0];
    var errorMessage = problem4Form.querySelectorAll('.error-message');
    for (var i = 0; i < errorMessage.length; i++) {
        errorMessage[i].innerHTML = '';
    }
    var invalidInput = problem4Form.querySelectorAll('.problem4-field');
    for (var i = 0; i < invalidInput.length; i++) {
        invalidInput[i].classList.remove('invalid-data');
        if(cleanData){
            invalidInput[i].value = '';
        }
    }
}


function findPeak(id,graph) {

    for (var i = 0 ; i < graph.length ; i ++) {

        if(id == graph[i].id){
            peakLabel = graph[i].label;
            return;
        } else if(undefined != graph[i].children) {
            findPeak(id, graph[i].children)
        }
    }
}

/*** PROBLEM 4 ***/

