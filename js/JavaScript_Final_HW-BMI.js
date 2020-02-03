var btn = document.querySelector('.btn-1');
btn.addEventListener('click', addData);

var list = document.querySelector('.list');

var btnDel = document.querySelector('ul');
btnDel.addEventListener('click',delData);

var str = '';
var color = '';
var calBMIResult ='';
var dataAry = JSON.parse(localStorage.getItem('dataAll')) || [];
var btn2 = document.querySelector('.btn-2');

update();

function addData(){
    var cm = document.getElementById('cm').value
    var kg = document.getElementById('kg').value

    // 計算BMI的值
    if(isNaN(cm) || cm <= 0){
        alert('請輸入正確的身高');
        return
    }

    if(isNaN(kg) || kg <= 0){
        alert('請輸入正確的體重');
        return
    }

    calBMIResult = calBMI(cm,kg);

    // 判斷BMI等級
    BMILevel(calBMIResult);
    // 計算當日日期
    var nowDate = getDate();
    // 放計算好的數值
    var data = {
    state: str,
    height: cm,
    weight: kg,
    BMI: calBMIResult,
    date: nowDate,
    color: color,
    }
    // 推資料進總集
    dataAry.push(data);


    // 存入localstorage
    localStorage.setItem('dataAll',JSON.stringify(dataAry));

    update();

    btnSwitch();
}

function calBMI(cm,kg){
    var m = cm/100;
    var bmiFormula = kg/(m*m);
    var bmi = bmiFormula.toFixed(1);
    
    return bmi;
}

function BMILevel(value){
    if(18.5 > value){
        str = '過輕';
        color = '#31BAF9';    
    }else if(18.5 <= value && 25 > value){
        str = '理想';
        color = '#86D73F';     
    }else if(25 <= value && 30 > value){
        str = '過重';
        color = '#FF982D';        
    }else if(30 <= value && 35 > value){
        str = '輕度肥胖';
        color = '#FF6C03';        
    }else if(35 <= value && 40 > value){
        str = '中度肥胖';
        color = '#FF6C03';        
    }else if(value > 40){
        str = '重度肥胖';
        color = '#FF1200';        
    }      
}

function getDate(){
    var dt = new Date();
    var year = dt.getFullYear();
    var month = dt.getMonth()+1;
    var day = dt.getDate();
    var fullDate = month+'-'+day+'-'+year;
    return fullDate;
}

function update(){
    var len = dataAry.length;

    var total ='';

    for (i = 0 ; i < len ; i++){
        
        total += `<li style="border-left: 7px solid ${dataAry[i].color};"><p>${dataAry[i].state}</p>
        <p><span>BMI </span>${dataAry[i].BMI}</p>
        <p><span>weight </span>${dataAry[i].weight}</p>
        <p><span>height </span>${dataAry[i].height}</p>
        <p><span>${dataAry[i].date}</span></p>
        <a href="#" data-num="${i}"><i class="fas fa-times"></i></a></li>`
        
    }
    list.innerHTML = total;
}

function delData(e){
    e.preventDefault();
    var num = e.target.parentNode.dataset.num;
    if (e.target.nodeName !== 'I'){return};
    dataAry.splice(num,1);
    // console.log(e.target.nodeName);
        
    localStorage.setItem('dataAll', JSON.stringify(dataAry));
    update();
}

function btnSwitch(){
    btn.style.display = 'none';
    btn2.style.display = 'block';    
    btn2.innerHTML = `<div class="txt">
                            ${calBMIResult}
                            <p>BMI</p>
                        </div>
                            
                        <div class="btn-s" style="background-color:${color};" onclick="reLoad()" >
                        </div>
                        <div class="str">
                            <p>${str}</p>                
                        </div>
                        `;
    btn2.style.color = color;
    btn2.style.border = `6px solid ${color}`;    
}

function reLoad(){
    window.location.reload();
}



