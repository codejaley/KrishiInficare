//[Dashboard Javascript]

//Project:	UniquePro Admin - Responsive Admin Template
//Primary use:   Used only for the main dashboard (index.html)


$(function () {

  'use strict';
	
	
	 window.Apex = {
      stroke: {
        width: 3
      },
      markers: {
        size: 0
      },
      tooltip: {
        fixed: {
          enabled: true,
        }
      }
    };
    
    var randomizeArray = function (arg) {
      var array = arg.slice();
      var currentIndex = array.length,
        temporaryValue, randomIndex;

      while (0 !== currentIndex) {

        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }

      return array;
    }

    // data for the sparklines that appear below header area
    var sparklineData = [35, 27, 93, 53, 61, 27, 54, 43, 19, 46, 47, 45, 54, 38, 56, 24, 65, 31, 37, 39, 62, 51, 35, 41 ];

    var spark1 = {
      chart: {
        type: 'area',
        height: 200,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight',
      },
      fill: {
        opacity: 0.9,
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
		labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
      yaxis: {
        min: 0
      },
	  xaxis: {
		type: 'datetime',
	  },
      colors: ['#2cdd9b'],
		tooltip: {
			theme: 'dark'
  		},
    }
	
	var spark2 = {
      chart: {
        type: 'area',
        height: 200,
        sparkline: {
          enabled: true
        },
      },
      stroke: {
        curve: 'straight'
      },
      fill: {
        opacity: 0.9
      },
      series: [{
        data: randomizeArray(sparklineData)
      }],
	  labels: [...Array(24).keys()].map(n => `2018-09-0${n+1}`),
      yaxis: {
        min: 0
      },
	  xaxis: {
		type: 'datetime',
	  },
      colors: ['#188ef4'],
		tooltip: {
			theme: 'dark'
  		},
    };
	
	
	
	var spark1 = new ApexCharts(document.querySelector("#spark1"), spark1);
    spark1.render();
	var spark2 = new ApexCharts(document.querySelector("#spark2"), spark2);
    spark2.render();
	
	

	var options = {
      chart: {
        height: 390,
        type: 'line',
        zoom: {
          enabled: false
        },
      },
      dataLabels: {
        enabled: false
      },
	  colors: ["#ff8f00", '#ee1044', '#389f99'],
      stroke: {
        width: [5, 7, 5],
        curve: 'smooth',
        dashArray: [0, 8, 5]
      },
      series: [{
          name: "In Store",
          data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
        },
        {
          name: "Online",
          data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
        },
        {
          name: 'Total Visits',
          data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
        }
      ],
      markers: {
        size: 0,

        hover: {
          sizeOffset: 6
        }
      },
      xaxis: {
        categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
          '10 Jan', '11 Jan', '12 Jan'
        ],
      },
      tooltip: {
        y: [{
          title: {
            formatter: function (val) {
              return val + " (Avg)"
            }
          }
        }, {
          title: {
            formatter: function (val) {
              return val + " Avg"
            }
          }
        }, {
          title: {
            formatter: function (val) {
              return val;
            }
          }
        }]
      },
      grid: {
        borderColor: '#f1f1f1',
      }
    }
    
    var chart = new ApexCharts(
      document.querySelector("#sales-overview"),
      options
    );

    chart.render();
	

}); // End of use strict
