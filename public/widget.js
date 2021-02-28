window.myWidgetParam ? window.myWidgetParam : (window.myWidgetParam = []);
window.myWidgetParam.push({
	id: 19,
	cityid: '792680',
	appid: '1c991d24d0cd49c462d60dcb3c10a85b',
	units: 'metric',
	containerid: 'openweathermap-widget-19',
});
(function () {
	var script = document.createElement('script');
	script.async = true;
	script.charset = 'utf-8';
	script.src =
		'//openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js';
	var s = document.getElementsByTagName('script')[0];
	s.parentNode.insertBefore(script, s);
})();
