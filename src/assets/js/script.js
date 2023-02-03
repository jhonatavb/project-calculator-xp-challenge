const btnCalculate = document.querySelector('.btn-calculate');
const containerOperation = document.querySelectorAll('.container-operation');

const FACTOR = Math.pow(10, 4);
const MAX_CHILDS_APPEND = 1;
const INFINITY_SIMBOL = '∞';

const createElementForResult = (result) => {
  const operationResult = document.createElement('p');
  operationResult.setAttribute('class', 'result-operation');
  operationResult.innerText = result;
  return operationResult;
};

containerOperation.forEach(el => {
  const res = createElementForResult(0);
  el.appendChild(res);
});

const removeLastResult = (numOp) => {
  if(containerOperation[numOp].childElementCount > MAX_CHILDS_APPEND
    && containerOperation[numOp].lastChild.getAttribute('class') === 'result-operation') {
    containerOperation[numOp].removeChild(containerOperation[numOp].lastChild);
  }
}

const sum = (x, y) => {
  removeLastResult(0);
  const res = (x.toFixed(4) * FACTOR + y.toFixed(4) * FACTOR) / FACTOR;
  const formattedRes = createElementForResult(res);
  containerOperation[0].appendChild(formattedRes);
};

const subtract = (x, y) => {
  removeLastResult(1);
  const res = (x.toFixed(4) * FACTOR - y.toFixed(4) * FACTOR) / FACTOR;
  const formattedRes = createElementForResult(res);
  containerOperation[1].appendChild(formattedRes);

  removeLastResult(2);
  const resReverse = (y.toFixed(4) * FACTOR - x.toFixed(4) * FACTOR) / FACTOR;
  const formattedResReverse = createElementForResult(resReverse);
  containerOperation[2].appendChild(formattedResReverse);
};

const multiplication = (x, y) => {
  removeLastResult(3);
  const res = Math.round((x * y) * FACTOR) / FACTOR;
  const formattedRes = createElementForResult(res);
  containerOperation[3].appendChild(formattedRes);
};

const division = (x, y) => {
  if(x === 0) {
    removeLastResult(4);
    const res = createElementForResult(0);
    containerOperation[4].appendChild(res);

    removeLastResult(5);
    const resReverse = createElementForResult(INFINITY_SIMBOL);
    containerOperation[5].appendChild(resReverse);

    return;
  };

  if(y === 0) {
    removeLastResult(4);
    const res = createElementForResult(INFINITY_SIMBOL);
    containerOperation[4].appendChild(res);

    removeLastResult(5);
    const resReverse = createElement(0);
    containerOperation[5].appendChild(resReverse);

    return;
  }

  removeLastResult(4);
  const res = Number.isInteger(x / y) ? (x / y) : (x / y).toFixed(2);
  const formattedRes = createElementForResult(res);
  containerOperation[4].appendChild(formattedRes);
  
  removeLastResult(5);
  const resReverse = Number.isInteger(y / x) ? (y / x) : (y / x).toFixed(2);
  const formattedResReverse = createElementForResult(resReverse);
  containerOperation[5].appendChild(formattedResReverse);
};

const pow = (x, y) => {
  removeLastResult(6);
  const res = Number.isInteger(Math.pow(x, y)) ? Math.pow(x, y) : Math.pow(x, y).toFixed(2);
  const formattedRes = createElementForResult(!isFinite(res) ? INFINITY_SIMBOL : res);
  containerOperation[6].appendChild(formattedRes);

  removeLastResult(7);
  const resReverse = Number.isInteger(Math.pow(y, x)) ? Math.pow(y, x) : Math.pow(y, x).toFixed(2);
  const formattedResReverse = createElementForResult(!isFinite(resReverse) ? INFINITY_SIMBOL : resReverse);
  containerOperation[7].appendChild(formattedResReverse);
};

const sqrt = (x, y) => {
  removeLastResult(8);
  const res = Number.isInteger(Math.sqrt(x)) ? Math.sqrt(x) : Math.sqrt(x).toFixed(2);
  const formattedRes = createElementForResult(res);
  containerOperation[8].appendChild(formattedRes);

  removeLastResult(9);
  const resReverse = Number.isInteger(Math.sqrt(y)) ? Math.sqrt(y) : Math.sqrt(y).toFixed(2);
  const formattedResReverse = createElementForResult(resReverse);
  containerOperation[9].appendChild(formattedResReverse);
};

const fact = (x, y) => {
  let res = 1;
  let resReverse = 1;

  for(let i = 1; i <= x; i++) {
    res *= i;
  }

  removeLastResult(10);
  const formattedRes = createElementForResult(!isFinite(res) ? INFINITY_SIMBOL : res);
  containerOperation[10].appendChild(formattedRes);

  for(let i = 1; i <= y; i++) {
    resReverse *= i;
  }

  removeLastResult(11);
  const formattedResReverse = createElementForResult(!isFinite(resReverse) ? INFINITY_SIMBOL : resReverse);
  containerOperation[11].appendChild(formattedResReverse);
};

const percent = (x, y) => {
  removeLastResult(12);
  const res = Number.isInteger((y * 100) / x) ? (y * 100) / x : ((y * 100) / x).toFixed(2);
  const formattedRes = createElementForResult(`${isNaN(res) ? 0 : res}%`);
  containerOperation[12].appendChild(formattedRes);

  removeLastResult(13);
  const resReverse = Number.isInteger((100 * x) / y) ? (100 * x) / y : ((100 * x) / y).toFixed(2);
  const formattedResReverse = createElementForResult(`${isNaN(resReverse) ? 0 : resReverse}%`);
  containerOperation[13].appendChild(formattedResReverse);
};

const avg = (x, y) => {
  removeLastResult(14);
  const res = Number.isInteger((x + y) / avg.length)
    ? (x + y) / avg.length : ((x + y) / avg.length).toFixed(2);
  const formattedRes = createElementForResult(res);
  containerOperation[14].appendChild(formattedRes);
};

btnCalculate.addEventListener('click', () => {
  let valueX = Number(document.getElementById('first-number').value);
  let valueY = Number(document.getElementById('second-number').value);

  if(typeof valueX !== 'number' || isNaN(valueX)) valueX = 0;
  if(typeof valueY !== 'number' || isNaN(valueY)) valueY = 0;

  sum(valueX, valueY);
  subtract(valueX, valueY);
  multiplication(valueX, valueY);
  division(valueX, valueY);
  pow(valueX, valueY);
  sqrt(valueX, valueY);
  fact(valueX, valueY);
  percent(valueX, valueY);
  avg(valueX, valueY);


  document.getElementById('first-number').value = "";
  document.getElementById('second-number').value = "";
});
