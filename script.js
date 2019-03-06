var tempResult = 0; //temporary variable for outputing 0

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
      "Your salary", tempResult, '#23548f', tempResult //annotation text, annual salary variable, color,annual salary variable
    ],
    [
      "Average salary", 66711, '#5c5c5c', '66711' //annotion text, current annual average, color, current annual evarage
    ]
  ]);

  var formatter = new google.visualization.NumberFormat({ // formatter for number type
    prefix: '$',
    patern: 'short'
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

      format: ['currency'], // the type of numbers used
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

    if (eventListen.which == 13 && milesInput < 2500 != milesInput > 20000) {
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
    if (milesInput < 2500 != milesInput > 20000) {

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

  } else if (document.getElementById('radioUnchecked').checked) {
    temp = 0;
  }

  resultAnnual = (userInputMiles * 52 * 0.5) + (0.03 * 52 * userInputMiles) + (1 * temp) //formula to count annual salary
  resultWeakly = (userInputMiles * 0.5) + (0.03 * userInputMiles) //formula to count weakly salary

  document.getElementById("cent").innerHTML = 51.5;

  document.getElementById("resultWeeks").innerHTML = resultWeakly; // weakly result output to html

  document.getElementById("resultAnnual").innerHTML = resultAnnual; // annual result output to html

  tempResult = 0 + resultAnnual; //temporary result  for chart

  drawChart();


  return false;
}


//function so scroll to result
function scroll() {
  $('html, body').animate({
    scrollTop: ($('#scrollHere').offset().top)
  }, 500);
}


//function to animate number count
function count() {
  $('.counter').each(function() {



    $(this).prop('Counter', 0).animate({
      Counter: $(this).text()
    }, { //counter animation options
      duration: 1000,
      easing: 'swing',

      step: function(now) {
        $(this).text(commaSeparateNumber(now));
      }
    });
  });


  //function to sepparate number with commas
  function commaSeparateNumber(val) {



    val = Math.round(val * 100) / 100; //decimal options, for 1 decimal write 10 instead of 100

    while (/(\d+)(\d{3})/.test(val.toString())) {
      val = val.toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    }
    return val;
  }
}
