//封装获取style样式
function getStyle(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj)[attr];
	};
};
window.onload=function(){
	//图片切换效果
	//图片
	var aImg=document.getElementById("aImg");//图片父级，用来运动
	var aLi=aImg.getElementsByTagName("li");//所有的图片
	//底部圆点
	var oDiv=document.getElementById("qieHua");//圆点父级
	var aA=oDiv.getElementsByTagName("a");//圆点
	//左右按钮
	var oPie=document.getElementById("piece");//左
	var oNext=document.getElementById("next");//右
	//获取当前一张大图的宽度
	var current=parseInt(getStyle(aLi[0],"width"));
	var timer;//定时器
	var n=1;//下标
	init();
	//自定义函数，让图片自动轮播
	function init(){
		//开启定时器
		timer=setInterval(function(){
			n++;
			if(n>aLi.length-1){//到最后一张让他回到第一张
				n=1;
			};
			aImg.style.left=-(n*current)+"px";
			aImg.style.transition=".5s";							
			for(var i=0;i<aA.length;i++){//暴力清除所有的className
				aA[i].className="";
			}
			if(n>aA.length){
				aA[0].className="active";
			}else{
				aA[n-1].className="active";
			}
			
		},2000)
	};				
	var onOff=false;
	aImg.addEventListener("webkitTransitionEnd",function(){
		if(n>=aLi.length-1&&n>aA.length){//判断下标如果大于最后一张，那么去掉transition,把图片拉回到第二张图
			aImg.style.transition = "none";
			aImg.style.left=-current+"px";
			n=1;
		}else if(n<=0){//判断下标如果小于第一张，那么把它拉回到倒数第二张
			aImg.style.transition = "none";
			aImg.style.left=-((aLi.length-2)*current)+"px";
			n=aLi.length-2;
		}
		onOff=false;
	});
	//给底部圆点添加事件
	for(var i=0;i<aA.length;i++){
		aA[i].index=i;
		aA[i].onmouseover=function(){
			clearInterval(timer);
			for(var i=0;i<aA.length;i++){//暴力清除所有的className
				aA[i].className="";
			}
			this.className="active";
			aImg.style.left=-(this.index+1)*current+"px";
			aImg.style.transition=".5s";	
			onOff=true;
		};
		aA[i].onmouseout=function(){	
			n=this.index+1;
			init();
		};
	};
	//给上下按钮加鼠标移入
	oPie.onmouseover=function(){
		clearInterval(timer);
	};
	oNext.onmouseover=function(){
		clearInterval(timer);
	};
	//给上下按钮加鼠标移出
	oPie.onmouseout=function(){
		init();
	};
	oNext.onmouseout=function(){
		init();
	};
	//给上下按钮添加点击
	oPie.onclick=function(){
		if(onOff) return;
		n--;
		if(n<0){//到最后一张让他回到第一张
			n=aLi.length-1;
		};
		aImg.style.left=-(n*current)+"px";
		aImg.style.transition=".5s";	
		for(var i=0;i<aA.length;i++){//暴力清除所有的className
			aA[i].className="";
		};
		if(n==0){
			aA[n+3].className="active";
		}else{
			aA[n-1].className="active";
		}
		onOff=true;
	};
	oNext.onclick=function(){
		if(onOff) return;
		n++;
		if(n>aLi.length-1){//到最后一张让他回到第一张
			n=0;
		};
		aImg.style.left=-(n*current)+"px";
		aImg.style.transition=".5s";	
		for(var i=0;i<aA.length;i++){//暴力清除所有的className
			aA[i].className="";
		};
		if(n>aA.length){
			aA[0].className="active";
		}else{
			aA[n-1].className="active";
		}
		onOff=true;
	};	
	
}