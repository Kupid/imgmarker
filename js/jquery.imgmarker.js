/*

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
			var $this=$(this),$img=$("<div />"),_z=1000;
			$this.empty();
			$img.css({"background-image":"url('"+settings.imgurl+"')",
					  "background-repeat":"no-repeat",
					  "position":"relative"
			});
			$img.width(settings.width||$this.width()).height(settings.height||$this.height());
			$this.html($img);
			$.each(settings.pos,function(){
				var $div=$("<div />"),p=this,_x=0,_y=0,po1,po2;
				_z++;
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
				$div.css({"border":"none","position":"absolute","left":_x+"px","top":_y+"px","cursor":"pointer","z-index":_z});
				$div.width(p.w).height(p.h);
				if(p.title&&$.trim(p.title).length>0)$div.attr("title",p.title);
				$img.append($div);
				switch(typeof(p.event)){
				case "string":
					if(typeof(settings.events[p.event])=="function"){
						$div.click(function(p,settings,$img){return function(event){
							settings.events[p.event].call(p,event,{"mark":$(this),"img":$img});
						};}(p,settings,$img));
					}
					break;
				case "object":
					for(var key in p.event){
						var _key=key;
						if(_key.toLowerCase()=="hover"){
							if(typeof(p.event[_key])=="string"){
								$div.hover(function(p,settings,_key,$img){return function(event){
									settings.events[p.event[_key]].call(p,event,{"mark":$(this),"img":$img});
								};}(p,settings,_key,$img),function(p,settings,_key,$img){return function(event){
									settings.events[p.event[_key]].call(p,event,{"mark":$(this),"img":$img});
								};}(p,settings,_key,$img));
							}else if(typeof(p.event[_key])=="object"){
								$div.hover(function(p,settings,_key,$img){return function(event){
									settings.events[p.event[_key][0]].call(p,event,{"mark":$(this),"img":$img});
								};}(p,settings,_key,$img),function(p,settings,_key,$img){return function(event){
									settings.events[p.event[_key][1]].call(p,event,{"mark":$(this),"img":$img});
								};}(p,settings,_key,$img));
							}
						}else{
							$div.bind(_key,function(p,settings,_key,$img){return function(event){
								settings.events[p.event[_key]].call(p,event,{"mark":$(this),"img":$img});
							};}(p,settings,_key,$img));
						}
					}
					break;
				}
				$div.trigger("mark");
			});
		});
	};
})(jQuery);