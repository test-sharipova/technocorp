//меню
const menu = document.querySelector('.menu'),
menuItem = document.querySelectorAll('.item'),
body = document.querySelector('body'),
hamburger = document.querySelector('.hamburger');

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('hamburger_active');
	menu.classList.toggle('menu_active');
	body.classList.toggle('overflow');
	  
});

menuItem.forEach(item => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('hamburger_active');
		menu.classList.toggle('menu_active');
		
	});
});




//скрываются пункты меню при сужении экрана
function responseMenu(){
	if (window.innerWidth < 768) return; 
	$('ul.dropdown-menu li.item').appendTo('ul.menu');
	var items = $('ul.menu li.item');
	var max_width = $('ul.menu').width() - $('ul.menu li.dd_menu').outerWidth();
	var width = 0;
	var hide_from = 0;

	items.css({'width':'auto'});

	items.each(function(index){
		if (width + $(this).outerWidth() > max_width)
		{
			return false;
		}
		else
		{
			hide_from = index;
			width += $(this).outerWidth();
		}
	});
	if (hide_from < items.length - 1) {
		items.eq(hide_from).nextAll('li.item').appendTo('ul.dropdown-menu');
		// items.css({'width':(max_width / (hide_from)) + 'px'});
        items.css({'width':'fit-content'});
		$('ul.menu li.dd_menu').show();
	}
	else
	{
		$('ul.menu li.dd_menu').hide();
	}
}



	$('.top_menu').on('click', '.dropdown-toggle', function () {
		$('.dropdown-menu').toggle();
	});

	$(window).on('resize', function(){
		responseMenu();
	}).trigger('resize');


//телефон в моб версии
$('.header__contacts__icon').on('click', function(){
	$('.header__contacts_mobile').toggleClass('header__contacts_mobile_active');
	$('.header__contacts__icon').toggleClass('header__contacts__icon_active');
});


//открыть список телефонов
$('.header__phone__wrap').on('click', function(){
	$('.header__contacts__wrap_hide').toggleClass('header__contacts__wrap_hide_active');
});
$(document).on('click', function(event) {
	var headerPhoneWrap = $('.header__phone__wrap');
	var contactsWrap = $('.header__contacts__wrap_hide');
	if (!headerPhoneWrap.is(event.target) && headerPhoneWrap.has(event.target).length === 0) {
	  
	  contactsWrap.removeClass('header__contacts__wrap_hide_active');
	}
  });

//promo tabs, cases tabs
 
	$('ul.tabs__caption').on('click', 'li:not(.active)', function() {
	  $(this)
		.addClass('active').siblings().removeClass('active')
		.closest('div.tabs').find('div.tabs__content').removeClass('active').eq($(this).index()).addClass('active');
	});

//promo slider
$('.promo__slider').slick({
	arrows: false,
	dots: true
});

//wins slider
$('.wins__slider').each(function(){
	$(this).slick();
});

//cases slider
$('.cases__slider-for').slick({
	slidesToShow: 1,
	slidesToScroll: 1,
	arrows: false,
	fade: true,
	infinite: true,
	
	asNavFor: '.cases__slider-nav'
  });
  $('.cases__slider-nav').slick({
	slidesToShow: 3,
	
	asNavFor: '.cases__slider-for',
	dots: false,
	arrows: false,
	infinite: true,
	focusOnSelect: true
  });

//галерея 
	$('.cases__slider-for').each(function(i){
		$(this).magnificPopup({
			delegate: 'a',
			type: 'image',
			tLoading: 'Загрузка изображения #%curr%...',
			gallery: {
				enabled: true,
				navigateByImgClick: true,
				preload: [0, 1] // Will preload 0 - before current, and 1 after the current image
			}
			});
	});
	$('.open-gallery').each(function(i){
		$(this).click(function() {
			$('.cases__slider-for').eq(i).magnificPopup('open');
		  });
	});

//запускать слайдер в табах
$('.cases .tabs__caption li').each(function(i){
	$(this).on('click', function() {
		
		$('.cases__slider-for').eq(i).slick('resize');
		$('.cases__slider-nav').eq(i).slick('resize');
	   
	});
});

//карта
// initMap();

// async function initMap() {
//     // Промис `ymaps3.ready` будет зарезолвлен, когда загрузятся все компоненты основного модуля API
//     await ymaps3.ready;

//     const {YMap, YMapDefaultSchemeLayer} = ymaps3;

//     // Иницилиазируем карту
//     const map = new YMap(
//         // Передаём ссылку на HTMLElement контейнера
//         document.getElementById('map'),

//         // Передаём параметры инициализации карты
//         {
//             location: {
//                 // Координаты центра карты
//                 center: [23.131094, 113.258989],

//                 // Уровень масштабирования
//                 zoom: 9
//             }
//         },


//     );

// 	

//     // Добавляем слой для отображения схематической карты
    
// 	map.addChild(new YMapDefaultSchemeLayer({
// 		theme: "dark", customization: 
// 	}));
// }

 
ymaps.ready(function () {
	var myMap = new ymaps.Map('map', {
		center: [23.131094, 113.258989],
		zoom: 9
	}, {
		searchControlProvider: 'yandex#search'
	}),

	myPlacemark = new ymaps.Placemark(myMap.getCenter(), {
		hintContent: 'Haizhu District, Гуанчжоу, Гуандун Китай, 510399',
		balloonContent: 'Haizhu District, Гуанчжоу, Гуандун Китай, 510399'
	}, {
		// Опции.
		// Необходимо указать данный тип макета.
		iconLayout: 'default#image',
		// Своё изображение иконки метки.
		iconImageHref: 'img/cases/marker.png',
		// Размеры метки.
		iconImageSize: [60, 60],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-5, -38]
	});
	myPlacemark.events
	.add('mouseenter', function (e) {
		// Ссылку на объект, вызвавший событие,
		// можно получить из поля 'target'.
		e.get('target').options.set('filter', 'islands#invert(0)');
	})
	.add('mouseleave', function (e) {
		e.get('target').options.unset('preset');
	});
	
	
	

myMap.geoObjects
	.add(myPlacemark);
	
  });
  
//Челябинск
  ymaps.ready(function () {
	var myMap = new ymaps.Map('map2', {
		center: [55.159902, 61.402554],
		zoom: 9
	}, {
		searchControlProvider: 'yandex#search'
	}),

	myPlacemark2 = new ymaps.Placemark(myMap.getCenter(), {
		hintContent: 'Челябинск',
		balloonContent: 'Челябинск'
	}, {
		// Опции.
		// Необходимо указать данный тип макета.
		iconLayout: 'default#image',
		// Своё изображение иконки метки.
		iconImageHref: 'img/cases/marker.png',
		// Размеры метки.
		iconImageSize: [60, 60],
		// Смещение левого верхнего угла иконки относительно
		// её "ножки" (точки привязки).
		iconImageOffset: [-5, -38]
	});
	
	

	myMap.geoObjects
	.add(myPlacemark2);
	
  });

//modal
$('.consult').on('click', function(){
    $('.modal').addClass('modal_active');

});
$('.modal__close').on('click', function(){
    $('.modal').removeClass('modal_active');
});

//маска для телефона

let element = document.querySelectorAll('.phone');
let maskOptions = {
    mask: '+7(000)000-00-00'
};
for (let i = 0; i < element.length; i++) {
    let mask = IMask(element[i], maskOptions);
}

//dropdown menu - сужение меню при изменении ширины экрана
// function responseMenu(){
// 	$('ul.dropdown-menu li.item').appendTo('ul.menu');
// 	var items = $('ul.menu li.item');
// 	var max_width = $('ul.menu').width() - $('ul.menu li.dd_menu').outerWidth();
// 	var width = 0;
// 	var hide_from = 0;

// 	items.css({'width':'auto'});

// 	items.each(function(index){
// 		if (width + $(this).outerWidth() > max_width)
// 		{
// 			return false;
// 		}
// 		else
// 		{
// 			hide_from = index;
// 			width += $(this).outerWidth();
// 		}
// 	});
// 	if (hide_from < items.length - 1) {
// 		items.eq(hide_from).nextAll('li.item').appendTo('ul.dropdown-menu');
// 		// items.css({'width':(max_width / (hide_from)) + 'px'});
//         items.css({'width':'fit-content'});
// 		$('ul.menu li.dd_menu').show();
// 	}
// 	else
// 	{
// 		$('ul.menu li.dd_menu').hide();
// 	}
// }