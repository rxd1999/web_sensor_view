function single2Double(number) {
    number = parseInt(number)
    if (number < 10) {
        number = '0' + number;
    }
    return number;
}
var myDate = new Date()
month = single2Double(myDate.getMonth() + 1);
day = single2Double(myDate.getDate());
console.log(month+'-'+day)
document.getElementById("day").value = '2022-'+month+'-'+day;
//画表
function drawChart() {
    //get data
    var xmlhttp;
    var time = []
    var temperature = []
    var data = {}
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            historyData = JSON.parse(xmlhttp.responseText);
            time = historyData.time;
            temperature = historyData.temperature;
            humidity = historyData.humi;
            option_temp = {
                title: {
                    text: '温度变化',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: '气温'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: time
                },
                yAxis: {
                    type: 'value',
                    min: Math.min.apply(Math, temperature) - 3,
                    max: Math.max.apply(Math, temperature) + 3,
                    axisLabel: {
                        formatter: '{value} °C'
                    }
                },
                series: [
                    {
                        name: '温度',
                        type: 'line',
                        data: temperature,
                        smooth: true,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    },
                ]
            };
            option_humi = {
                title: {
                    text: '湿度变化',
                    subtext: ''
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {
                    data: '湿度'
                },
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: time
                },
                yAxis: {
                    type: 'value',
                    min: Math.min.apply(Math, humidity) - 3,
                    max: Math.max.apply(Math, humidity) + 3,
                    axisLabel: {
                        formatter: '{value} %'
                    }
                },
                series: [
                    {
                        name: '湿度',
                        type: 'line',
                        data: humidity,
                        smooth: true,
                        markPoint: {
                            data: [
                                { type: 'max', name: '最大值' },
                                { type: 'min', name: '最小值' }
                            ]
                        },
                        itemStyle:
                        {
                            color: "#3d85c6"
                        },
                        markLine: {
                            data: [
                                { type: 'average', name: '平均值' }
                            ]
                        }
                    },
                ]
            };

            var tempChart = echarts.init(document.getElementById('chart_temp'));
            var humiChart = echarts.init(document.getElementById('chart_humi'));
            tempChart.setOption(option_temp);
            humiChart.setOption(option_humi);
        }
    }
    date = document.getElementById('day').value.split('-')
    month = date[1]
    day = date[2]
    //month = single2Double(document.getElementById("month").value);
    //day = single2Double(document.getElementById("day").value);
    xmlhttp.open("GET", "/data?month=" + month + "&day=" + day, true);
    xmlhttp.send();
}
function changeTemp() {
    var xmlhttp;
    var datas;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            temp = "";
            humi = "";
            datas = JSON.parse(xmlhttp.responseText)
            temp = datas.T;
            humi = datas.RH;
            document.getElementById("temp_value").innerHTML = temp;
            document.getElementById("humi_value").innerHTML = humi;
            document.getElementById("temp_pointer").style.left = (temp + 10) * 4 + "px";
            document.getElementById("humi_pointer").style.left = (humi - 20) * 2.5 + "px";
        }
    }
    xmlhttp.open("GET", "/tempChange/", true);
    xmlhttp.send();
}
//定时获取温度
var t1 = setInterval("changeTemp();", 8000);
var t2 = setInterval("drawChart();", 600000);
drawChart();
changeTemp();
