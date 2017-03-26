<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Echarts task1</title>
	<script type="text/javascript" src="echarts.min.js"></script>
</head>
<body>
	<div id="main" style="width: 600px;width: 400px;"></div>
	<script type="text/javascript">
		var myChart = echarts.init(document.getElementById('main'));
		var option = {
			title: {
				text: 'the first demo of echarts'
			},
			tooltip: {},
			legend: {
				data: ['sales']
			},
			xAxis: {
				data: ['Janu', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
			},
			yAxis: {},
			series: {
				name: 'sales',
				type: 'bar',
				data: [1000, 1200, 1100, 900, 2100, 1500, 1099, 1201, 1000, 1022, 1100, 2000]
			}
		};
		myChart.setOptions(option);
	</script>
</body>
</html>