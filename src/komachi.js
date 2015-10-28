/*
* Komachi.js v0.0.1
* (c) 2015 Üsame F. AVCI http://usameavci.com
* License: MIT
*/

(function(){
"use strict";

	var Komachi = {};

	Komachi = {
		Setup : function (options)
		{
			if (options.loader != undefined)
			{
				PageLoader.setStatus(options.loader.status);
				PageLoader.setTemplate(options.loader.template);
			}
			return this;
		},
		Run : function (){
			Komachi.Routes.Catch();
		},
		Controllers : {
			controllers : {},

			Add : function (name, callback)
			{
				this.controllers = name;
				return this;
			},
			Get : function () {}
		},
		Routes : {
			routes : [],

			Add : function (args){
				this.routes[this.routes.length] = args;
				return this;
			},
			Get : function (data, type){
				var result  = {};
				for(var index in this.routes)
				{
					var route = this.routes[index];
					if (type == 'name')
					{
						if(data == route.name) result = route;
					}
					else if (type == 'url')
					{
						if(data == route.url) result = route;
					}
				}
				if (!result.name) result = false;
				return result;
			},
			List : function (){
				return this.routes;
			},
			Catch : function (){
				var currentRoute = this.Get(location.hash.replace('#', ''), 'url')
				if(currentRoute)
				{
					if ($('ko-view').length < 1)
						console.log("Komachi görünüm çerçevesi eklenmemiş! Bkz. http://komachi.co/viewer#not-found");
					else
					{
						if (PageLoader.getStatus())
						{
							$('body').append(PageLoader.getTemplate());
							$('.ko-loader').fadeIn('fast');
						}
						$.ajax({
							type : 'get',
							url : currentRoute.template,
							async : true
						})
						.success(function(tpl){
							$('ko-view').html(tpl);
						})
						.error(function(){
							console.log("Şablon dosyası bulunamadı. Bkz. http://komachi.co/routing#template-not-found");
						});
						$('.ko-loader').fadeOut('fast');
					}
				}
				else
				{
					if (location.hash)
						console.log('Rota bulunamadı! Eklemiş olduğunuz rotaları kontrol ediniz..');
					else
						location.hash = "#/";
				}
			}

		}
	}



	var PageLoader = {
		status : true,
		template : '<div class="ko-loader" style="background-color: #fff; position: fixed; top: 0px; right: 0px; width: 100%; height: 100%; display: none; z-index: 9999; vertical-align: middle; text-align: center; line-height: 250px; color: #8f8f8f;"><h1>Yükleniyor...</h1></div>',

		getStatus : function () {
			return this.status;
		},
		setStatus : function (status) {
			if (status != undefined) this.status = status;
		},
		getTemplate : function () {
			return this.template;
		},
		setTemplate : function (template) {
			if (template != undefined) this.template = template;
		}
	}

	window.onhashchange = function ()
	{
		Komachi.Routes.Catch();
	}


	$(document).ajaxComplete(function(){
		$('[ko-route]').each(function(){
			$(this).attr("href", Komachi.Routes.Get($(this).attr('ko-route'), 'name').url.replace('/', '#/'));
		});
	});








	window.Komachi = Komachi;


	if (typeof window.define === 'function' && window.define.amd) {
		window.define('Komachi', [], function(){
			return Komachi;
		});
	}
})();