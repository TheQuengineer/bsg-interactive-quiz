/*
	Transition by Pixelarity
	pixelarity.com @pixelarity
	License: pixelarity.com/license
*/

(function($) {

	skel.init({
		reset: 'full',
		pollOnce: true,
		breakpoints: {
			'global':	{ href: 'css/style.css', viewport: { scalable: false } },
			'desktop':	{ media: '(min-width: 737px)', href: 'css/style-desktop.css', containers: 1200, grid: { gutters: 25 }, viewport: { width: 1280 } },
			'1000px':	{ media: '(min-width: 737px) and (max-width: 1440px) and (max-height: 840px)', href: 'css/style-1000px.css', containers: 1000, grid: { gutters: 20 }, viewport: { width: 1080 } },
			'mobile':	{ media: '(max-width: 736px)', href: 'css/style-mobile.css', containers: '100%!', grid: { collapse: true, gutters: 10 } }
		}
	});

	$(function() {

		var	$window = $(window),
			$body = $('body'),
			$document = $(document);
			
		// Forms (IE<10).
			var $form = $('form');
			if ($form.length > 0) {
				
				$form.find('.form-button-submit')
					.on('click', function() {
						$(this).parents('form').submit();
						return false;
					});
		
				if (skel.vars.IEVersion < 10) {
					$.fn.n33_formerize=function(){var _fakes=new Array(),_form = $(this);_form.find('input[type=text],textarea').each(function() { var e = $(this); if (e.val() == '' || e.val() == e.attr('placeholder')) { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).blur(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } }).focus(function() { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) return; if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); _form.find('input[type=password]').each(function() { var e = $(this); var x = $($('<div>').append(e.clone()).remove().html().replace(/type="password"/i, 'type="text"').replace(/type=password/i, 'type=text')); if (e.attr('id') != '') x.attr('id', e.attr('id') + '_fakeformerizefield'); if (e.attr('name') != '') x.attr('name', e.attr('name') + '_fakeformerizefield'); x.addClass('formerize-placeholder').val(x.attr('placeholder')).insertAfter(e); if (e.val() == '') e.hide(); else x.hide(); e.blur(function(event) { event.preventDefault(); var e = $(this); var x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } }); x.focus(function(event) { event.preventDefault(); var x = $(this); var e = x.parent().find('input[name=' + x.attr('name').replace('_fakeformerizefield', '') + ']'); x.hide(); e.show().focus(); }); x.keypress(function(event) { event.preventDefault(); x.val(''); }); });  _form.submit(function() { $(this).find('input[type=text],input[type=password],textarea').each(function(event) { var e = $(this); if (e.attr('name').match(/_fakeformerizefield$/)) e.attr('name', ''); if (e.val() == e.attr('placeholder')) { e.removeClass('formerize-placeholder'); e.val(''); } }); }).bind("reset", function(event) { event.preventDefault(); $(this).find('select').val($('option:first').val()); $(this).find('input,textarea').each(function() { var e = $(this); var x; e.removeClass('formerize-placeholder'); switch (this.type) { case 'submit': case 'reset': break; case 'password': e.val(e.attr('defaultValue')); x = e.parent().find('input[name=' + e.attr('name') + '_fakeformerizefield]'); if (e.val() == '') { e.hide(); x.show(); } else { e.show(); x.hide(); } break; case 'checkbox': case 'radio': e.attr('checked', e.attr('defaultValue')); break; case 'text': case 'textarea': e.val(e.attr('defaultValue')); if (e.val() == '') { e.addClass('formerize-placeholder'); e.val(e.attr('placeholder')); } break; default: e.val(e.attr('defaultValue')); break; } }); window.setTimeout(function() { for (x in _fakes) _fakes[x].trigger('formerize_sync'); }, 10); }); return _form; };
					$form.n33_formerize();
				}

			}
			
		// Window.
			$window.on('load', function() {

				// Desktop only.
					if (skel.isActive('desktop')) {

						// Accelerate stuff.
							if (skel.vars.isMobile)
								$('#wrapper .slide *:not(h2)').css('-webkit-transform', 'translate3d(0,0,0)');

						// Vertically center.
							var wh = $window.height(), w = $('#wrapper');
							
							w.fadeTo(0, 0.0001);

							w
								.css('top', '50%')
								.css('margin-top', (w.outerHeight() / -2) + 10);

						// Form key fix.
							$form.keydown(function(e) {
								
								switch (e.keyCode) {
									
									case 35: 
									case 36:
									case 37:
									case 38:
									case 39:
									case 40:
									case 9:
										e.stopPropagation(); 
										break;
										
									default:
										break;
								
								}
							
							});
									
						// Main slider.
							$('#main').slidertron({
								viewerSelector:			'.viewer',
								reelSelector:			'.viewer .reel',
								slidesSelector:			'.viewer .reel .slide',
								navNextSelector:		'.next',
								navPreviousSelector:	'.previous',
								viewerOffset:			(skel.isActive('1000px') ? 92 : 102),
								jumpLinksSelector:		'.jumplink',
								hashJump:				true,
								speed:					1000,
								fadeInSpeed:			0,
								arrowsToNav:			true,
								disableSelection:		false,
								onSlideSwitch:			function(slide) {
									$('#main .inner').scrollTop(0);
									var x = $body.scrollTop();
									slide.find('.inner').focus();
									$body.scrollTop(x);
								}
							});

						// Scrolling.
							if (skel.vars.isTouch)
								$('article .inner')
									.css('overflow-y', 'scroll')
									.css('-webkit-overflow-scrolling', 'touch');
							else
								$('article').each(function() {
									var t = $(this), ti = t.find('.inner');
									ti.niceScroll({
										body: t,
										zindex:	2
									});
								});

						// Tab key fix.
							$document.keydown(function(e) { if (e.keyCode == 9) e.preventDefault(); });

						w.fadeTo(1000, 1);

					}

				// Gallery.
					var poptroxSettings;
					
					if (skel.isActive('mobile'))
						poptroxSettings = {
							overlayClass: 'poptrox-overlay skel-layers-fixed',
							usePopupDefaultStyling: false,
							usePopupCaption: false,
							usePopupCloser: false,
							usePopupEasyClose: true,
							usePopupNav: false,
							useBodyOverflow: false,
							windowMargin: 10,
							overlayOpacity: 0.85,
							popupWidth: 0,
							popupHeight: 0
						};
					else
						poptroxSettings = {
							overlayClass: 'poptrox-overlay skel-layers-fixed',
							usePopupDefaultStyling: false,
							usePopupCaption: true,
							usePopupCloser: true,
							usePopupEasyClose: false,
							usePopupNav: true,
							popupCloserText: ''
						};
				
					$('.gallery').poptrox(poptroxSettings);

			});

	});

})(jQuery);