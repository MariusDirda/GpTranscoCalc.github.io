
//text, numbers, variables configs


var tempResult = 0; //temporary variable for outputing 0
var zero = "???"; // text which is shown on top of column before calculation
var averageAnnualNumber = 66711;// average annual income
var averageAnnualText = averageAnnualNumber.toString(); // conversion to string





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
      "Your salary", tempResult, '#23548f', zero //annotation text, annual salary variable, color,annual salary variable
    ],
    [
      "Average salary", averageAnnualNumber, '#5c5c5c', averageAnnualText //annotion text, current annual average, color, current annual evarage
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
      format: ['0.00'], // the type of numbers used
      textPosition: 'none'
    },

    vAxis: {

      fractionDigits: ['0'],
      viewWindow: {
        max: maxV, //maximum value of annotations + 1
      },
      textStyle: {
        fontSize: 22 // chart font size
      },

      ticks: [
        40000, 80000, 100000 //chart baselines
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
    var milesInput = document.getElementById('miles').value;
    var hiddenAlert = document.getElementById("hide");

    var eventListen = eventListen || window.event;

    if (eventListen.which == 13 && milesInput < 2000 != milesInput > 3300) {
      hiddenAlert.style.display = "block";
      return false;
    } else if (eventListen.which == 13) {
      hiddenAlert.style.display = "none";
      calculationFunction();
      count();
      scroll();
      return false;

    }

  });

  //checking if valid number entered on button click
  document.getElementById("submitButton").onclick = function() {
    var milesInput = document.getElementById('miles').value;
    var hiddenAlert = document.getElementById("hide");
    if (milesInput < 2000 != milesInput > 3300) {

      hiddenAlert.style.display = "block";
      return false;
    } else {
      calculationFunction();
      count();
      scroll();
      hiddenAlert.style.display = "none";
      return false;
    }

  }



}


// function to calculate input
function calculationFunction() {

  var userInputMiles = document.getElementById("miles").value; //getting values from input

  //radio buttons output
  if (document.getElementById('radioChecked').checked) {
    temp = 400;
    centsTemp = 0.53;

  } else if (document.getElementById('radioUnchecked').checked) {
    temp = 0;
    centsTemp = 0.5;
  }


  resultAnnual = ((userInputMiles * 52 * centsTemp) + (0.03 * centsTemp * userInputMiles)) + (1 * temp) //formula to count annual salary
  resultWeakly = ((userInputMiles * 0.5) + (0.03 * userInputMiles)) //formula to count weakly salary

  document.getElementById("cent").innerHTML = (centsTemp * 100);

  document.getElementById("resultWeeks").innerHTML = resultWeakly; // weakly result output to html

  document.getElementById("resultAnnual").innerHTML = resultAnnual; // annual result output to html

  tempResult = 0 + resultAnnual; //temporary result  for chart

  zero = tempResult;

  drawChart();


  return false;
}


//function so scroll to result




function scroll() {

  if ($(window).width() <= 823 && $(window).height() >= 500) {
    $('html, body').animate({
      scrollTop: ($('#scrollHere').offset().top)
    }, 500);
  }
else if ( $(window).height() <= 500){

  $('html, body').animate({
  scrollTop: ('1420px')
  }, 500);


}


  return false;
}



//function to animate number count
function count() {

  $('.counter').each(function() {
    $(this).stop();
    $(this).clearQueue();

    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, { //counter animation options
      duration: 1000,
      easing: 'swing',

      step: function(now) {
        $(this).text(commaSeparateNumber(Math.ceil(now)));
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
