/**
 * Created by neal on 16/3/26.
 */
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityInput = document.getElementById('aqi-city-input');
var aqiInput = document.getElementById('aqi-value-input');
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var city = cityInput.value.trim();
    var aqi = aqiInput.value.trim();
    if (!city.match(/^[A-Za-z\u4E00-\u9FA5]+$/))
    {
        alert("the city must be Chinese or English characters!");
    }
    if(!aqi.match((/^\d+$/)))
    {
        alert("the air quality of the city must be integer! ");
    }
    aqiData[city] = aqi;
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    var items = "<tr><td>city</td><td>air quality</td><td>manage</td></tr>";
    for (var city in aqiData)
    {
        items += "<tr><td>"+city+"</td><td>"+aqiData[city]+"</td><td><button data-city='"+city+"'>delete</button></td></tr>"
    }
    document.getElementById("aqi-table").innerHTML = city ? items:"";
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
    addAqiData();
    renderAqiList();
    cityInput.value = "";
    aqiInput.value = "";
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(city) {
    // do sth.
    delete aqiData[city];
    renderAqiList();
}

function init() {
    // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
    document.getElementById("add-btn").onclick = function(){
        addBtnHandle();
    }

    // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
    document.getElementById("aqi-table").addEventListener("click",function(event){
        if (event.target.nodeName.toLowerCase()==="button")
        {
            delBtnHandle.call(null,event.target.dataset.city);
        }
    })

}

init();