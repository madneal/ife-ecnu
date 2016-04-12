/**
 * Created by 安超 on 2016/3/22.
 */
"sue strict";
/* 数据格式演示
 var aqiSourceData = {
 "北京": {
 "2016-01-01": 10,
 "2016-01-02": 10,
 "2016-01-03": 10,
 "2016-01-04": 10
 }
 };
 */

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
    var y = dat.getFullYear();
    var m = dat.getMonth() + 1;
    m = m < 10 ? '0' + m : m;
    var d = dat.getDate();
    d = d < 10 ? '0' + d : d;
    return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
    var returnData = {};
    var dat = new Date("2016-01-01");
    var datStr = '';
    for (var i = 1; i < 92; i++) {
        datStr = getDateStr(dat);
        returnData[datStr] = Math.ceil(Math.random() * seed);
        dat.setDate(dat.getDate() + 1);
    }
    return returnData;
}

var aqiSourceData = {
    "北京": randomBuildData(500),
    "上海": randomBuildData(300),
    "广州": randomBuildData(200),
    "深圳": randomBuildData(100),
    "成都": randomBuildData(300),
    "西安": randomBuildData(500),
    "福州": randomBuildData(100),
    "厦门": randomBuildData(100),
    "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

var pageState = {
    nowSelectCity: "-1",
    nowGraTime: "day"
};
//获取随机颜色
function randomColor(){
    return "#"+Math.random().toString(16).substring(2,8);
}
/**
 * 渲染图表
 */
function renderChart() {
    var aqiChartWrap = document.getElementsByClassName("aqi-chart-wrap")[0];
    var city = pageState["nowSelectCity"];
    var gradTime = pageState["nowGraTime"];

    aqiChartWrap.innerHTML = "";
    var cityData = chartData[gradTime][city];
    var fragment = document.createDocumentFragment();
    var width = 0;
    var left = null;
    var classN = null;
    if(gradTime === "day"){
        left = 13;
        classN = "by-day";
    }else if(gradTime === "week"){
        left = 80;
        classN = "by-week";
    }else if(gradTime === "month"){
        left = 270;
        classN = "by-month";
    }


    for(var date in cityData){
        var i = document.createElement("i");
        i.title = date + ":" + cityData[date];
        i.style.background = randomColor();
        i.style.height = cityData[date] + "px";
        i.className = classN;
        width += left;
        i.style.left = width + "px";

        fragment.appendChild(i);
    }

    aqiChartWrap.appendChild(fragment);

}
/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
    // 确定是否选项发生了变化
    var formGraTime = document.getElementById("form-gra-time");
    formGraTime.onchange = function(){
        var inputs = formGraTime.getElementsByTagName("input");

        for (var i= 0, len=inputs.length; i<len; i++){
            if(inputs[i].checked === true){
                var current = inputs[i].value;
            }
        }

        if(current !== pageState.nowGraTime){
            pageState.nowGraTime = current;
            renderChart();
        }
    }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
    // 确定是否选项发生了变化
    var citySelect = document.getElementById("city-select");

    citySelect.onchange = function(){
        var options = this.getElementsByTagName("option");

        for(var i= 0, len=options.length; i<len; i++){
            if(options[i].selected === true){
                var current = options[i].innerHTML;
                break;
            }
        }
        if(current !== pageState.nowSelectCity){
            pageState.nowSelectCity = current;
            renderChart();
        }
    }
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
    // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
    var content = "";
    var citySelect = document.getElementById("city-select");

    for(var city in aqiSourceData){
        content += "<option>" + city + "</option>";
    }

    citySelect.innerHTML = content;
    // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
    // 将原始的源数据处理成图表需要的数据格式
    var week = {};
    var month = {};
    for(var city in aqiSourceData){
        week[city] = {};
        month[city] = {};
        var source = aqiSourceData[city];
        var dates = Object.getOwnPropertyNames(source);
        var firstDay = (new Date(dates[0])).getDay() + 1;
        var sum = 0;
        var weekNum = 0;
        var n = 1;
        //week
        for (var i= 0, len=dates.length; i<len; i++){
            sum += source[dates[i]];
            if((firstDay + i) % 7 === 0){
                week[city][weekNum] = sum / n;
                sum = 0;
                n = 1;
                weekNum++;
            }else {
                n++;
            }
        }
        if(n != 1){
            week[city][weekNum] = sum / n;
        }
        //month
        for(var j= 0, len=dates.length; j<len; j++){
            sum += source[dates[j]];
            if(j === 30){
                month[city][0] = sum / 31;
                sum = 0;
            }else if(j === 59){
                month[city][1] = sum / 29;
                sum = 0;
            }else if(j === 90){
                month[city][2] = sum / 31;
            }
        }
    }
    // 处理好的数据存到 chartData 中
    chartData["day"] = aqiSourceData;
    chartData["week"] = week;
    chartData["month"] = month;
}

/**
 * 初始化函数
 */
function init() {
    initCitySelector();
    initAqiChartData();
    graTimeChange();
    citySelectChange();
    renderChart();
}
init();
