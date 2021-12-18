var numBtn = document.querySelectorAll(".square");
var num_1 = '';
var num_2 = ''; 
var operater_1 = '';
var operater_2 = '';
var equation = '';
var ans = 0;
var view_ans = document.querySelector(".view_ans");
var view_equation = document.querySelector(".view_equation");


function calculate (input) {
	if (operater_1 == '' && input != '=' && input != '+' && input !='x' && input !='÷' && input !='-'){
		if(num_1 === 0){  //處理input == d;時，ans = 0; num_1 = ans;的狀況
			num_1 = '';
		}
		num_1 = num_1 + input;
		ans = num_1;
		view_ans.innerText = ans;
	}
	else if (num_1 !== '' && num_2 === '' && (input == '=' || input == '+' || input =='x' || input =='÷' || input =='-')) {
		operater_1 = input;
		equation = '';
		equation = equation + num_1 + operater_1;
		view_equation.innerText = equation;
	}
	else if (operater_1 != '' && input != '=' && input != '+' && input !='x' && input !='÷' && input !='-') {
		if(num_2 === 0){  //處理input == d;時，ans = 0; num_2 = ans;的狀況
			num_2 = '';
		}
		num_2 = num_2 + input;
		ans = num_2;
		view_ans.innerText = ans;
		
	}
	else if (num_2 !== '' && input == '=' || input == '+' || input =='x' || input =='÷' || input =='-') {
		operater_2 = input;
		if(operater_1 == '+'){
			ans = parseFloat(num_1)+parseFloat(num_2);
		}
		else if(operater_1 == '-'){
			ans = parseFloat(num_1)-parseFloat(num_2);
		}
		else if(operater_1 == 'x'){
			ans = parseFloat(num_1)*parseFloat(num_2);
		}
		else if(operater_1 == '÷'){
			ans = parseFloat(num_1)/parseFloat(num_2);
		}

		ans = Math.round(ans*100)/100;
		num_1 = ans.toString();
		
		if(operater_2 == '='){
			operater_1 = '';
			equation = equation + num_2 + operater_2;
			view_equation.innerText = equation;
		}
		else {
			operater_1 = operater_2;
			equation = '';
			equation = equation + num_1 + operater_1;
			view_equation.innerText = equation;
		}
		num_2 = '';
		operater_2 = '';
		view_ans.innerText = ans;
	}
}

for(var i = 0; i < numBtn.length ; i++){
	numBtn[i].addEventListener('click',function(e){

		var input = e.target.dataset.num;

		if(ans == 0 && input == '0'){  //避免出現00000...的情況
			ans = 0;
		}
		else if (input == 'c'){  //歸零
			num_1 = '';
			num_2 = ''; 
			operater_1 = '';
			operater_2 = '';
			equation = '';
			ans = 0;
			view_equation.innerText = equation;
			view_ans.innerText = ans;
		}
		else if (input == 'd'){  //減一位數
			ans = ans.substring(0, ans.length-1);
			if(ans === ''){
				ans = 0;
			}
			if(num_2 == ''){  //如果num_2為空，表示目前在做減位數的是num_1
				num_1 = ans;
			}
			else{  //如果num_2不為空，表示目前在做減位數的是num_2
				num_2 = ans;
			}
			view_ans.innerText = ans;
		}
		else if (ans == 0 && num_1 == '' && input == '.'){  //處理第一個輸入值為'.'的狀況
			num_1 = '0.';
			ans = num_1;
			view_ans.innerText = ans;
		}
		else {
			calculate (input);
		}
		
	})	
}
