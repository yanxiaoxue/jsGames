//文档加载成功触发的函数

window.onload = function() {
	//随机函数
	function random(m, n) {
		return Math.floor(Math.random() * (n - m + 1) + m);
	}
	//分数对象
	var scoring = document.getElementById("scroing");
	//倒计时
	var countDown = document.getElementById("countDown");
	//灰太狼
	var wolfs = document.getElementById("wolfs");
	//开始菜单
	var menu = document.getElementById("menu");
	//结束菜单
	var gameOver = document.getElementById("gameOver");
	//开始按钮
	var startBtn = document.getElementById("start");
	//倒计时图片宽度
	var countDownWidth = countDown.offsetWidth;
	var timer;
	var creatWolfTimer;
	//灰太狼随机出现的位置,使用数组来存储对应关系的数据 -- 出现的位置
	//随机出现以下9个位置
	var arrPosi = [{
		l: "98px",
		t: "115px"
	}, {
		l: "17px",
		t: "160px"
	}, {
		l: "15px",
		t: "220px"
	}, {
		l: "30px",
		t: "293px"
	}, {
		l: "122px",
		t: "273px"
	}, {
		l: "207px",
		t: "295px"
	}, {
		l: "200px",
		t: "211px"
	}, {
		l: "187px",
		t: "141px"
	}, {
		l: "100px",
		t: "185px"
	}];
	
	var preIndex = -6;//记录上一次随机的位置下标

	//开始
	startBtn.onclick = function() {
		// 1.开始菜单隐藏
		menu.style.display = "none";
		//2.处理倒计时
		dealCountDown();
		//3.创建灰太狼或者小灰灰的定时器
		creatWolfTimer = setInterval(function() {
			var wolf = document.createElement("img");
			//随机是灰太狼还是小灰灰“h”/"x"
			wolf.type = random(1, 100) > 70 ? "x" : "h";
			//设置属性值，狼出现时的状态，第一张
			wolf.index = 0;
			wolf.src = "img/" + wolf.type + wolf.index + ".png";
			//代表继续随机，是否和上一次狼出现的位置一样
			var resultBol = true;
			//随机狼所在位置下标
			var r = random(0,arrPosi.length-1);
			while(resultBol){
				if(r == preIndex){
					//说明和上一次的随机下标相同，继续随机下标
					 r = random(0,arrPosi.length-1);
				}else{
					//不重复，跳出循环
					break;
				}
			}
			wolf.style.left = arrPosi[r].l;
			wolf.style.top = arrPosi[r].t;
			//将wolf结点插入wolfs结点
			wolfs.appendChild(wolf);
			//狼上升的定时器
			wolf.upTimer = setInterval(function(){
				wolf.index++;
				if(wolf.index > 4){
					clearInterval(wolf.upTimer);
					//启动狼下降的定时器
					wolf.downFn();
				}
				wolf.src = "img/" + wolf.type + wolf.index + ".png";
			},150);
			
			//狼下降的定时器函数
			wolf.downFn = function(){
				wolf.downTimer = setInterval(function(){
					wolf.index--;
					if(wolf.index == 0){
						clearInterval(wolf.downTimer);
						//移出狼
						wolfs.removeChild(wolf);
					}
					wolf.src = "img/" + wolf.type + wolf.index + ".png";
				},150)
			}
			
			//记录狼点击的状态，假设true为未点击，只能点击一次该节点img
			wolf.clickBlo = true;
			//添加点击事件(只能点击一次)
			wolf.onclick = function(){
				if(wolf.clickBlo = false){
					//提前终止函数的执行
					return;
				}
				//每次点击后修改状态，表示已点击
				wolf.clickBlo = false;
				//清除狼上升和下降的定时器
				clearInterval(wolf.upTimer);
				clearInterval(wolf.downTimer);
				//重置index为5 目的:为了处理击打动画
				wolf.index = 5;
				//处理点击狼之后，执行的动画
				wolf.clickTimer = setInterval(function(){
					wolf.index++;
					if(wolf.index == 9){
						clearInterval(wolf.clickTimer);
						wolfs.removeChild(wolf);
					}
					wolf.src = "img/" + wolf.type + wolf.index + ".png";
					
				},150)
				//处理得分还是失分
				if(wolf.type == "h"){
					scoring.innerHTML = parseInt(scoring.innerHTML)+10;
				}else{
					scoring.innerHTML = parseInt(scoring.innerHTML)-10;
				}
			}
			
			
			
			//记录上一次的下标
			preIndex = r ;
		}, 1000)
	}

    //处理倒计时函数
	function dealCountDown() {
		timer = setInterval(function() {
			countDownWidth -= 2;
			countDown.style.width = countDownWidth + "px";
			if (countDownWidth < 0) {
				//清除倒计时
				clearInterval(timer);
				//游戏结束操作
				gameOver.style.display = "block";
				//清除随机狼出现的定时器
				clearInterval(creatWolfTimer);

			}
		}, 100)
	}



}
