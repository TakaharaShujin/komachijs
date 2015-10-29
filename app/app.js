Komachi.Setup({
	loader : {
		status : false
	}
})

Komachi.Routes
.Add({
	name : 'index',
	url : '/',
	template : 'views/home.html',
	data : []
})
.Add({
	name : 'about',
	url : '/hakkimizda',
	template : 'views/about.html',
	data : []
})
.Add({
	name : 'contact',
	url : '/iletisim',
	template : 'views/contact.html',
	data : []
})

Komachi.Controllers
.Add('HomeController', function(){

});

Komachi.Run();

