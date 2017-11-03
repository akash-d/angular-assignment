var app = angular.module("app", ["highcharts-ng"]);

app.controller("BarCtrl", ["$scope", "$http", "$interval", function ($scope, $http, $interval) {

    function callAPI() {
        $http({
            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
            method: 'GET'
        }).then(
            function (resp) {
                console.log(resp.data);
                generateData(resp.data);
            },
            function () {
                alert("no data")
            }
        )
    }

    $scope.graphData = [];
    $scope.chartConfig = {
        chart: {
            type: 'column',
            events: {
                load: function () {
                    // set up the updating of the chart each second
                    var series = this.series[0];
                    setInterval(function () {
                        $http({
                            url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
                            method: 'GET'
                        }).then(function (resp) {
                                console.log(resp.data);
                                angular.forEach(resp.data, function (value, key) {
                                    var temp = {};
                                    temp.name = value.name;
                                    temp.y = parseFloat(value.price_usd);
                                    series.addPoint(temp,true);
                                });
                            }
                        )
                    }, 5000);
                }
            }
        },
        xAxis: {
            type: 'category'
        },
        legend: {
            enabled: false
        },
        title: {
            text: 'Exchange rate of all crypto currencies',
            align: 'left',
            x: 70
        },
        plotOptions: {
            series: {
                borderWidth: 0,
                dataLabels: {
                    enabled: true,
                    format: '{point.y:.1f}'
                }
            }
        },

        series: [{
            name: 'data',
            colorByPoint: true,
            data: (function () {
                var t = [];
                $http({
                    url: 'https://api.coinmarketcap.com/v1/ticker/?limit=10',
                    method: 'GET'
                }).then(function (resp) {
                        console.log(resp.data);
                        angular.forEach(resp.data, function (value, key) {
                            var temp = {};
                            temp.name = value.name;
                            temp.y = parseFloat(value.price_usd);
                            t.push(temp);
                        });
                    }
                )
                return t;
            }())
        }]
    }

    function generateData(val) {

        if (val.length === t.length) {
            $scope.graphData = t;
            console.log("called",$scope.graphData)

        }
    }


}]);
