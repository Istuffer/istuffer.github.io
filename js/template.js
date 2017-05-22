//!window.addEventListener&&function(e,t,n,r,i,s,o){e[r]=t[r]=n[r]=function(e,t){var n=this;o.unshift([n,e,t,function(e){e.currentTarget=n,e.preventDefault=function(){e.returnValue=!1},e.stopPropagation=function(){e.cancelBubble=!0},e.target=e.srcElement||n,t.call(n,e)}]),this.attachEvent("on"+e,o[0][3])},e[i]=t[i]=n[i]=function(e,t){for(var n=0,r;r=o[n];++n)if(r[0]==this&&r[1]==e&&r[2]==t)return this.detachEvent("on"+e,o.splice(n,1)[0][3])},e[s]=t[s]=n[s]=function(e){return this.fireEvent("on"+e.type,e)}}(Window.prototype,HTMLDocument.prototype,Element.prototype,"addEventListener","removeEventListener","dispatchEvent",[])
	sizeCheck = Number(0);
	mobWidth = Number(720);
	deskWidth = Number(920);
	var once = false;
//view finder
	$(window).on("resize",function() {
		if(window.innerWidth < mobWidth && sizeCheck != 3) {appendMaster(3);sizeCheck = 3;}
		else if(window.innerWidth > mobWidth && window.innerWidth < deskWidth && sizeCheck != 2) {appendMaster(2);sizeCheck = 2;}
		else if(window.innerWidth > deskWidth && sizeCheck != 1) {appendMaster(1);sizeCheck = 1;}
	}).resize();
//append master
	function appendMaster(res) {
		var heroImages = $(".hero-container").attr('data-img');

		if(!$('body').hasClass("other")){
			if(res === 3) {
				$(".hero-container").css({"background":"url("+heroImages.split(",")[2]+") no-repeat top center","background-size":"cover"});
			}else if(res === 2) {
				$(".hero-container").css({"background":"url("+heroImages.split(",")[1]+") no-repeat top center","background-size":"cover"});
			}else if(res === 1) {
				$(".hero-container").css({"background":"url("+heroImages.split(",")[0]+") no-repeat top center","background-size":"cover"});
			}
		}
		nav(".mega-menu",res);
		if(!$('body').hasClass("index") || !$('body').hasClass("other")){
			listIt('.list-section', res);
		}
		var origText = $('.mob-call').attr('href').replace('tel:','');
		textChange('.mob-call-text','Call Local: '+origText,'Call Local: '+origText,'Call',res);		
		
		//fix logo center on mobile;
		if(res === 3){
			var left = (($(window).width() - $(".logo-brand img").outerWidth())/$(window).width()) / 2;
			$('.nav .logo-brand').css('left',(left*100)+"%");
			//$('.main-content .section').attr('style','');
			
			//change tel from toll to local on city page
			if($('body').hasClass('city')){
				var telno = $('.mob-call').attr('href');
				$('.hero-content a.phone-mob').attr('href',telno);
				$('.hero-content a.phone-mob .phone-desk').text(telno.replace("tel:",""));
				
			}
			
		}else{
			var divHt = $('.main .container').height();
			//$('.main-content .section').css('height', divHt+'px');
			$('.nav .logo-brand').attr('style','');
		}


		
	}
//element appender
	function sizes(tarEle,mobEle,mobApp,deskEle,deskApp,delEle,res) {
		if(delEle === true) {
			$("#"+$(tarEle).attr("id")).remove();}
		if (res === 3) {$(tarEle)[mobApp](mobEle);}
		else if ((res === 1 || res === 2) && delEle !== true) {$(tarEle)[deskApp](deskEle);}
	}
//text changer
	function textChange(ele,dText,tText,mText,res) {
		if(res === 3) {
			$(ele).text(mText);
		} else if(res === 2) {
			$(ele).text(tText);
		} else if(res ==- 1) {
			$(ele).text(dText);
		}
	}


//navigation
function nav(navs,res) {
		$(navs + " li").css({"user-select":"none"});		
		tapDrop = Boolean(true);
		tapCheck = String(null);
		tapList = Object($(navs + ">ul>li"));	
		if(res == 3) {	
			
			$(".dropdown-toggle.drop").on("click",function() {

				if(tapDrop === true) {
								
					$('.mainMenu').css({"display":"block"}); 
					$(this).html("<i class=\"fa fa-times\"></i> Close");					
					//$('html,body').animate({ scrollTop: $('.header').offset().top});
					tapDrop = false;
					
				} else {
					
					$('.mainMenu').css({"display":"none"});
					$('.sub-subMenu').css({"display":"none"});
					$(this).html("<i class=\"fa fa-bars\"></i> Menu");					
					tapDrop = true;
				}
			});	

			$('.mainMenu>li>a').on("click", function(e) {
				e.preventDefault();
				
				$(this).find('i').toggleClass('fa-chevron-right fa-chevron-down');
			
				if(tapCheck == $(this).text()) {
					window.location = $(this).attr("href");
				} else {
					$('.subMenu').css({"display":"none"});
					$(this).parent('li').children('ul.subMenu').css({'display':'block'});
					tapCheck = $(this).text();
				}
			});

			$('.subMenu>li>a').on("click", function(e) {
				e.preventDefault();
				if($(this).siblings('ul').length == 0){
					window.location = $(this).attr("href");
				}else{
					
					$(this).find('i').toggleClass('fa-caret-right fa-caret-down');
				
					if(tapCheck == $(this).text()) {
						window.location = $(this).attr("href");
					} else {
						$(".sub-subMenu").css({"display":"none"});
						$(this).parent('li').children('ul.sub-subMenu').css({'display':'block'});
						tapCheck = $(this).text();
					}
				}
			});	

		} else {
			$(navs).unbind();	

			if(!jQuery.support.touch){
	
				$('.nav ul.mainMenu li').click(function() {
				  $(this).find('.subMenu').toggle();
				});
			}	

		}
	} //navigation
	
	
 function listIt(eleTar,res){
	var num_cols = (res == 3) ? 2 : 3,
    container = $(eleTar),
    listItem = 'li',
    listClass = 'sub-list';
    container.each(function() {
        var items_per_col = new Array(),
        items = $(this).find(listItem),
        min_items_per_col = Math.floor(items.length / num_cols),
        difference = items.length - (min_items_per_col * num_cols);
        for (var i = 0; i < num_cols; i++) {
            if (i < difference) {
                items_per_col[i] = min_items_per_col + 1;
            } else {
                items_per_col[i] = min_items_per_col;
            }
        }
        for (var i = 0; i < num_cols; i++) {
            $(this).append($('<ul ></ul>').addClass(listClass));
            for (var j = 0; j < items_per_col[i]; j++) {
                var pointer = 0;
                for (var k = 0; k < i; k++) {
                    pointer += items_per_col[k];
                }
                $(this).find('.' + listClass).last().append(items[j + pointer]);
            }
        }
    }); 	
	$( ".sub-list" ).each(function( index ) {
		if($(this).find("li").length === 0){$(this).detach();};
	});
 } //listIt
	
//tracking
	function trackthis(cat, action, label){
		var actionLabel = ((sizeCheck === 3) ? "mobile - "+action : "desktop - "+action).toLowerCase();
		if(label == undefined || label == ""){label = "";}
		dataLayer.push({
			'event':'trackevent',
			'category':cat,
			'action':actionLabel,
			'label':label
		});			
	} //tracking

$(document).ready(function(){
	$('.no-js').css('display','none');
	//select nav populate
	$('.no-js a').each(function(){
		var hrefVal = $(this).attr('href');
		var textVal = $(this).text();
		$('#service-nav').append("<option value=\""+hrefVal+"\">"+textVal+"</option");
	});

	$('.select-nav .button').click(function(){
		var thisCat = $(this).attr('data-track');
		//check if select or zipcode
		if($('.input_zip').val() != "" && $(this).parent().find('select option:selected').val() == "" && !$('body').hasClass("index")){
			
			var zipVal = $('.input_zip').val();
			var kwUrl = $('.input_zip').attr('data-page');
			thisCat = "pt-zip-code-finder";
			if((/(^\d{5}(?:[-\s]\d{4})?$)|(^\d{9})/).test(zipVal)){
				$.ajax({
					url: '/zip-finder?zipcode='+zipVal+'&keywordUrl='+kwUrl,
					type: 'POST',
					success: function(data){
						if(data.trim() == ""){
							trackthis(thisCat,'submit click','invalid');
							//alert("Please choose a "+thisCat.replace("pt-","").replace("-nav","")+" or use zip code finder.");
							window.location.href = "/"+kwUrl;
						
						}else{
							trackthis(thisCat,'submit click','valid');
							window.location.href = data;
						}
						
					}
					
				});
			}else{
				trackthis(thisCat,'submit click','invalid');
				alert("Please enter a valid Zip Code.");
			}
			
			
			
		}else if(($('.input_zip').val() == "" && $(this).parent().find('select option:selected').val() != "") || $('body').hasClass("index")){			
			var hrefLink = $(this).parent().find('select option:selected').val();			
			var thisSelected = $(this).parent().find('select option:selected').text();
			
				trackthis(thisCat,'submit click',thisSelected.trim().toLowerCase());				
				window.location.href = hrefLink;
		}else if(($('.input_zip').val() != "" && $(this).parent().find('select option:selected').val() != "") || $('body').hasClass("index")){	
			$('.input_zip').val("");
			var hrefLink = $(this).parent().find('select option:selected').val();			
			var thisSelected = $(this).parent().find('select option:selected').text();
			
				trackthis(thisCat,'submit click',thisSelected.trim().toLowerCase());				
				window.location.href = hrefLink;
			
		} else{
			trackthis(thisCat,'submit click','invalid');
			alert("Please choose a "+thisCat.replace("pt-","").replace("-nav","")+" or use zip code finder.");
		}
		
		
		
	});
	
	//check select nav if empty list then hide it.
		if($('.no-js a').length == 0){
			$('.or-text, .dropdown-select').hide();
			$('.select-nav .button').css('margin-top','15px');
		}else{
			$('.or-text, .dropdown-select').show();
			$('.select-nav .button').css('margin-top','0');
		}
		
	//modal window
	$(function(){
		$('.modal-overlay').css('height',$(document).height() + "px");		
		$('.show-modal').click(function(e){
			e.preventDefault();			 
			$(".modal-overlay").fadeTo(500, 0.7).css({"display":"block"});
				
			var modalBox = $(this).attr('data-modal-id');
			$('#'+modalBox).fadeIn($(this).data());
			if(modalBox == "popup"){ 
				$('html,body').animate({
				  scrollTop:  $('#'+modalBox).offset().top - 150
				}); 
			}
			
		});  		  
		$(".js-modal-close").click(function() {
			var trackAction = ($(this).attr('data-source') == "lightbox") ? "close lightbox click" : "close outside click";
			var trackCat = ($('#promoPopup').is(':visible')) ? "pt-coupon" : "pt-learn-more";
		
			trackthis(trackCat, trackAction, '');
			
		  $(".modal-box, .modal-overlay").fadeOut(500, function() {
				//$(".modal-box, .modal-overlay").fadeOut(500);
				$(".modal-overlay").css("display","none");			
			 });
		});		 
		$(window).resize(function() {
			$(".modal-box").css({
				top:  150, //($(document).height() - $(".modal-box").outerHeight()) / 2,
				left: ($(window).width() - $(".modal-box").outerWidth()) / 2
			}); 
		});		 
		$(window).resize();		 
	});
	
//tracking
$('.tracked').on('click', function(){
	var dataParam = $(this).attr('data-track');
	var cat = dataParam.split('_')[0];
	var action = dataParam.split('_')[1];
	var label = dataParam.split('_')[2];
	if(label == undefined || label == ""){label = "";}
	if(action.indexOf(',') > -1){action = (sizeCheck === 3) ? action.split(',')[0] : action.split(',')[1];}	
	
	if(action.indexOf('this.text') > -1){
		action =  $(this).text() + action.replace('this.text','');
	}
	if(label.indexOf('this.text') > -1){
		label = $(this).text() + label.replace('this.text','');		
	}
	if(label.indexOf('this.href') > -1){
		label = $(this).attr('href');
	}	
	trackthis(cat, action.trim(), label);
	if($(this).hasClass('external')){
		trackthis('pt-external', $(this).text().toLowerCase(), $(this).attr('href'));
	}
	//console.log(cat+" : "+action+" : "+label);
});
	
//coupon print
$("#promoPopup img").click(function(){
	window.open($(this).attr('src'));
});



});

/* Placeholders.js v3.0.2 */
(function(t){"use strict";function e(t,e,r){return t.addEventListener?t.addEventListener(e,r,!1):t.attachEvent?t.attachEvent("on"+e,r):void 0}function r(t,e){var r,n;for(r=0,n=t.length;n>r;r++)if(t[r]===e)return!0;return!1}function n(t,e){var r;t.createTextRange?(r=t.createTextRange(),r.move("character",e),r.select()):t.selectionStart&&(t.focus(),t.setSelectionRange(e,e))}function a(t,e){try{return t.type=e,!0}catch(r){return!1}}t.Placeholders={Utils:{addEventListener:e,inArray:r,moveCaret:n,changeType:a}}})(this),function(t){"use strict";function e(){}function r(){try{return document.activeElement}catch(t){}}function n(t,e){var r,n,a=!!e&&t.value!==e,u=t.value===t.getAttribute(V);return(a||u)&&"true"===t.getAttribute(D)?(t.removeAttribute(D),t.value=t.value.replace(t.getAttribute(V),""),t.className=t.className.replace(R,""),n=t.getAttribute(F),parseInt(n,10)>=0&&(t.setAttribute("maxLength",n),t.removeAttribute(F)),r=t.getAttribute(P),r&&(t.type=r),!0):!1}function a(t){var e,r,n=t.getAttribute(V);return""===t.value&&n?(t.setAttribute(D,"true"),t.value=n,t.className+=" "+I,r=t.getAttribute(F),r||(t.setAttribute(F,t.maxLength),t.removeAttribute("maxLength")),e=t.getAttribute(P),e?t.type="text":"password"===t.type&&M.changeType(t,"text")&&t.setAttribute(P,"password"),!0):!1}function u(t,e){var r,n,a,u,i,l,o;if(t&&t.getAttribute(V))e(t);else for(a=t?t.getElementsByTagName("input"):b,u=t?t.getElementsByTagName("textarea"):f,r=a?a.length:0,n=u?u.length:0,o=0,l=r+n;l>o;o++)i=r>o?a[o]:u[o-r],e(i)}function i(t){u(t,n)}function l(t){u(t,a)}function o(t){return function(){m&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)?M.moveCaret(t,0):n(t)}}function c(t){return function(){a(t)}}function s(t){return function(e){return A=t.value,"true"===t.getAttribute(D)&&A===t.getAttribute(V)&&M.inArray(C,e.keyCode)?(e.preventDefault&&e.preventDefault(),!1):void 0}}function d(t){return function(){n(t,A),""===t.value&&(t.blur(),M.moveCaret(t,0))}}function g(t){return function(){t===r()&&t.value===t.getAttribute(V)&&"true"===t.getAttribute(D)&&M.moveCaret(t,0)}}function v(t){return function(){i(t)}}function p(t){t.form&&(T=t.form,"string"==typeof T&&(T=document.getElementById(T)),T.getAttribute(U)||(M.addEventListener(T,"submit",v(T)),T.setAttribute(U,"true"))),M.addEventListener(t,"focus",o(t)),M.addEventListener(t,"blur",c(t)),m&&(M.addEventListener(t,"keydown",s(t)),M.addEventListener(t,"keyup",d(t)),M.addEventListener(t,"click",g(t))),t.setAttribute(j,"true"),t.setAttribute(V,x),(m||t!==r())&&a(t)}var b,f,m,h,A,y,E,x,L,T,N,S,w,B=["text","search","url","tel","email","password","number","textarea"],C=[27,33,34,35,36,37,38,39,40,8,46],k="#ccc",I="placeholdersjs",R=RegExp("(?:^|\\s)"+I+"(?!\\S)"),V="data-placeholder-value",D="data-placeholder-active",P="data-placeholder-type",U="data-placeholder-submit",j="data-placeholder-bound",q="data-placeholder-focus",z="data-placeholder-live",F="data-placeholder-maxlength",G=document.createElement("input"),H=document.getElementsByTagName("head")[0],J=document.documentElement,K=t.Placeholders,M=K.Utils;if(K.nativeSupport=void 0!==G.placeholder,!K.nativeSupport){for(b=document.getElementsByTagName("input"),f=document.getElementsByTagName("textarea"),m="false"===J.getAttribute(q),h="false"!==J.getAttribute(z),y=document.createElement("style"),y.type="text/css",E=document.createTextNode("."+I+" { color:"+k+"; }"),y.styleSheet?y.styleSheet.cssText=E.nodeValue:y.appendChild(E),H.insertBefore(y,H.firstChild),w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x&&(x=x.nodeValue,x&&M.inArray(B,N.type)&&p(N));L=setInterval(function(){for(w=0,S=b.length+f.length;S>w;w++)N=b.length>w?b[w]:f[w-b.length],x=N.attributes.placeholder,x?(x=x.nodeValue,x&&M.inArray(B,N.type)&&(N.getAttribute(j)||p(N),(x!==N.getAttribute(V)||"password"===N.type&&!N.getAttribute(P))&&("password"===N.type&&!N.getAttribute(P)&&M.changeType(N,"text")&&N.setAttribute(P,"password"),N.value===N.getAttribute(V)&&(N.value=x),N.setAttribute(V,x)))):N.getAttribute(D)&&(n(N),N.removeAttribute(V));h||clearInterval(L)},100)}M.addEventListener(t,"beforeunload",function(){K.disable()}),K.disable=K.nativeSupport?e:i,K.enable=K.nativeSupport?e:l}(this);