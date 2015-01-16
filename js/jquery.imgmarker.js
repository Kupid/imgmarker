/*
 pos:
 [
 {
 "x":2,
 "y":200,
 "w":120,
 "h":50,
 "point":"center-middle",
 "title":"华润支路",
 "event":"event01"
 }
 ]
 */
;(function($){
	$.fn.imgmarker=function(opts){
		var settings={
				"imgurl":"",
				"width":false,
				"height":false,
				"pos":[],
				"events":{}
		};
		
		$.extend(settings,opts);
		return this.each(function(){
			var $this=$(this),$img=$("<div />");
			$img.css({"background-image":"url('"+settings.imgurl+"')",
					  "background-repeat":"no-repeat",
					  "position":"relative"
			});
			$img.width(settings.width||$this.width()).height(settings.height||$this.height());
			$this.html($img);
			$.each(settings.pos,function(){
				var $div=$("<div />"),p=this,_x=0,_y=0,po1,po2;
				if(p.point&&p.point.indexOf("-")>0){
					po1=p.point.split("-")[0];
					po2=p.point.split("-")[1];
					switch(po1.charAt(0)){
					case "c":
						_x=p.x-parseInt(0.5*p.w);
						break;
					default:
						_x=p.x;
					}
					switch(po2.charAt(0)){
					case "m":
						_y=p.y-parseInt(0.5*p.h);
						break;
					default:
						_y=p.y;
					}
				}
				$div.css({"border":"none","position":"absolute","left":_x+"px","top":_y+"px","cursor":"pointer"});
				$div.width(p.w).height(p.h).attr("title",p.title);
				$img.append($div);
				if(typeof(settings.events[p.event])=="function"){
					$div.click(function(event){settings.events[p.event].call(p,event);});
				}
			});
		});
	};
})(jQuery);