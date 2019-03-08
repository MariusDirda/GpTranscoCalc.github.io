//variable data
var tempResult = 0; //temporary variable for outputing 0
var yourTextTemp = "???"; // text which is shown on top of column before calculation
var nationalTextTemp = '$66,711' ; // national average text on start
var nationalPay = 0.427635; // current national pay cents/mile
var centsYes = 0.53; // cents/mile if pressed yes
var centsNo = 0.5; // cents/mile if pressed no
var defaultValue = 3000; // value for calculation on starting chart bar


var nationalTemp = defaultValue * 52 * nationalPay; //  calculation for default average values






//settings for google chart
google.charts.load('current', {
  packages: ['corechart'],
  'language': 'us'
});
google.charts.setOnLoadCallback(drawChart);


//google chart function

function drawChart() {
  var data = google.visualization.arrayToDataTable([
    //column options
    [
      'Salary',
      'USD', {
        role: 'style'
      }, {
        role: 'annotation'
      }
    ],
    [
      "Your salary", tempResult, '#23548f', yourTextTemp //annotation text, annual salary variable, color,annual salary variable
    ],
    [
      "Average salary", nationalTemp, '#5c5c5c', nationalTextTemp //annotion text, current annual average, color, current annual evarage
    ]
  ]);

  var formatter = new google.visualization.NumberFormat({ // formatter for number type
    prefix: '$', //dollar sign before numbers
    patern: 'short', //type of patern
    fractionDigits: '0' // removing decimals
  });
  formatter.format(data, 1);
  formatter.format(data, 3);

  //calculation for annotations to apear on top of collumns
  var maxV = 0;
  for (var i = 0; i < data.getNumberOfRows(); i++) {
    if (data.getValue(i, 1) > maxV) {
      maxV = data.getValue(i, 1);
    }
  }
  maxV += maxV / 10;


  var view = new google.visualization.DataView(data);
  view.setColumns([0, 1, {
    calc: "stringify",
    sourceColumn: 1,
    type: "string",
    role: "annotation",
  }, ]);



  //google chart options
  var options = {

    'tooltip': {
      trigger: 'none'
    },

    width: 250, //chart width
    height: 450, //chart height

    legend: 'none',
    bar: {
      groupWidth: '75%' //space beetwen columns
    },

    hAxis: {
      // the type of numbers used
      textPosition: 'none'
    },

    vAxis: {
      viewWindow: {
        max: maxV, //maximum value of annotations + 1
      },
      textStyle: {
        fontSize: 22 // chart font size
      },

      ticks: [
        20000, 40000, 80000, 100000 //chart baselines
      ],
      textPosition: 'none'
    },

    chartArea: { //chart area options, where chart is
      'height': '100%',
      left: 0,
      right: 0,
      top: 70
    },

    animation: { //chart animation options
      startup: true,
      duration: 900,
      easing: 'out'
    },

    annotations: { //chart annotation options
      highContrast: false,
      textStyle: {
        color: '#5c5c5c',
        fontSize: 22,
        prefix: '$'
      },
      alwaysOutside: true
    }

  };

  var chart = new google.visualization.ColumnChart(document.getElementById('columnchart')); //where chart will appear. Class

  chart.draw(data, options);

}







// function to check if input is correct
function check() {

  //checking if valid number entered on enter button
  $("#miles").keypress(function(eventListen) {
    var milesInput = document.getElementById('miles').value; // get value from miles
    var hiddenAlert = document.getElementById("hide"); // alert field

    var eventListen = eventListen || window.event;

    if (eventListen.which == 13 && milesInput < 2000 != milesInput > 3300) { // if input is invalid and pressed enter
      hiddenAlert.style.display = "block";
      return false;
    } else if (eventListen.which == 13) { // if input is valid and pressed enter
      hiddenAlert.style.display = "none";
      calculationFunction();
      count();
      scroll();
      return false;

    }

  });

  //checking if valid number entered on button click
  document.getElementById("submitButton").onclick = function() { // on click function for submit button id
    var milesInput = document.getElementById('miles').value; // get value from miles
    var hiddenAlert = document.getElementById("hide"); // alert field
    if (milesInput < 2000 != milesInput > 3300) {

      hiddenAlert.style.display = "block"; // show alert field if number is not valid
      return false;
    } else {
      calculationFunction();
      count();
      scroll();
      hiddenAlert.style.display = "none"; // dont show alert if number is correct
      return false;
    }

  }



}


// function to calculate input
function calculationFunction() {

  var userInputMiles = document.getElementById("miles").value; //getting values from input

  //radio buttons output
  if (document.getElementById('radioChecked').checked) { // if checked Yes
    temp = 400;
    centsTemp = centsYes //cents per mile if checked Yes

  } else if (document.getElementById('radioUnchecked').checked) { // if checked No
    temp = 0;
    centsTemp = centsNo; // cents per mile if checked NO
  }


  resultNational = (userInputMiles * 52 * nationalPay)

  resultNationalText = resultNational.toString();

  resultAnnual = ((userInputMiles * 52 * centsTemp) + (0.03 * centsTemp * userInputMiles)) + (1 * temp) //formula to count annual salary
  resultWeakly = ((userInputMiles * 0.5) + (0.03 * userInputMiles)) //formula to count weakly salary

  document.getElementById("cent").innerHTML = (centsTemp * 100); // cents per mile output for text

  document.getElementById("resultWeeks").innerHTML = resultWeakly; // weakly result output to html

  document.getElementById("resultAnnual").innerHTML = resultAnnual; // annual result output to html

  tempResult = 0 + resultAnnual; //temporary result  for chart

  nationalTemp = 0 + resultNational;

  yourTextTemp = tempResult;

  nationalTextTemp = nationalTemp;


  drawChart(); // redraw chart after calculation


  return false;
}


//function so scroll to result
// function scroll() {
//
//   if ($(window).width() <= 823 && $(window).height() >= 500) { // scroll if width is less than 823 and height is more than
//     $('html, body').animate({
//       scrollTop: ($('#scrollHere').offset().top)
//     }, 500); // scroll animation speed
//   } else if ($(window).height() <= 500) { // do something if screen height is less than 500
//   }
//
//
//
//   return false;
// }



//function to animate number count
function count() {

  $('.counter').each(function() {
    $(this).stop();
    $(this).clearQueue();

    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, { //counter animation options
      duration: 780,
      easing: 'swing', // animation type

      step: function(now) {
        $(this).text(commaSeparateNumber(Math.ceil(now))); // commas
      }
    });
  });


  //function to sepparate number with commas
  function commaSeparateNumber(val) {

    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d+)(\d{3})/, '$1,$2');
    }
    return val;
  }
}
