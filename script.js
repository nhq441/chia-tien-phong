function createFirstTable(className = '', unit,rows = 0, array = []) {
    const stringtbody = className + ' tbody';
    const tbody = document.querySelector(stringtbody);

    moneyAvg = sumMoney(array)/array.length;
    document.querySelector('.money-avg').innerHTML = `Số tiền trung bình: ${moneyAvg.toFixed(2)} ${unit}`;

    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        
        const cell1 = document.createElement('td');
        cell1.textContent = array[i].name;
        row.appendChild(cell1);

        const cell2 = document.createElement('td');
        cell2.textContent = array[i].money + ' ' + unit;
        row.appendChild(cell2);

        moneyReal = array[i].money - moneyAvg;
        array[i].moneyReal = moneyReal;

        const cell3 = document.createElement('td');
        cell3.textContent = ((moneyReal > 0) ? moneyReal.toFixed(2) : 0) + ' ' + unit; 
        row.appendChild(cell3);

        const cell4 = document.createElement('td');
        cell4.textContent = ((moneyReal < 0) ? (-moneyReal).toFixed(2) : 0) + ' ' + unit; 
        row.appendChild(cell4);
        
        tbody.appendChild(row);
    }
    return array;
}

function createSecondTable(className, array = [], unit = '') {
    const stringtbody = className + ' tbody';
    const tbody = document.querySelector(stringtbody);
    
    for (let i = 0; i < array.length; i++) {
        for (let j = 0; j < array.length; j++) {
            if ((array[j].moneyReal > 0) && (array[i].moneyReal < 0)) {
                const row = document.createElement('tr');
                const cell = document.createElement('td');
                const paied = -(array[i].moneyReal);
                const received = array[j].moneyReal;
                console.log(`${array[i].name} (${array[i].moneyReal}) tra cho ${array[j].name} (${array[j].moneyReal})`);
                if (received < paied) {
                    array[i].moneyReal += received;
                    array[j].moneyReal -= received;
                    console.log(`${received} then ${array[i].name} (${array[i].moneyReal}) tra cho ${array[j].name} (${array[j].moneyReal})`);
                    cell.textContent = `${array[i].name} trả cho ${array[j].name} ${received.toFixed(2)} ${unit}`;
                } else if (received > paied) {
                    array[i].moneyReal += paied;
                    array[j].moneyReal -= paied;
                    console.log(`${paied} then ${array[i].name} (${array[i].moneyReal}) tra cho ${array[j].name} (${array[j].moneyReal})`);
                    cell.textContent = `${array[i].name} trả cho ${array[j].name} ${paied.toFixed(2)} ${unit}`;
                }
                else {
                    array[i].moneyReal = 0;
                    array[j].moneyReal = 0;
                    console.log(`${received} then ${array[i].name} (${array[i].moneyReal}) tra cho ${array[j].name} (${array[j].moneyReal})`);
                    cell.textContent = `${array[i].name} trả cho ${array[j].name} ${received.toFixed(2)} ${unit}`;
                }
                row.appendChild(cell);
                tbody.appendChild(row);
            }
        }
    }
}

function createInput(n = 0) {
    const container = document.querySelector('.input-container');
    for (let i = 0; i < n; i++) {
        const inputName = document.createElement('input');
        inputName.classList.add('name' + i);
        inputName.type = "text";
        inputName.title = "name";
        container.appendChild(inputName);

        const inputmoney = document.createElement('input');
        inputmoney.classList.add('money' + i);
        inputmoney.type = "number";
        inputmoney.title = "money";
        container.appendChild(inputmoney);
    }
    document.querySelector('.span-name').classList.add('show');
    document.querySelector('.span-money').classList.add('show');
    document.querySelector('.next').classList.add('hide');
    document.querySelector('.caculate').classList.remove('hide');
}

function enterData(quantity) {
    let array = [];

    for (let i = 0; i < quantity; i++) {
        const a = document.querySelector('.name' + i).value;
        const b = document.querySelector('.money' + i).value;
        array[i] = {name: a, money: Number(b)};
    }

    return array;
}

function beforeCaculate() {
    const quantity = document.querySelector('.quantity').value;
    createInput(quantity);
}

function showResult() {
    document.querySelector('.note').classList.remove('hide');
    document.querySelector('.container-1').classList.remove('hide');
    document.querySelector('.container-2').classList.remove('hide');
    document.querySelector('.caculate').classList.add('hide');
    document.querySelector('.input-container').classList.add('hide');
}

function sumMoney(array = []) {
    let sum = 0;
    for (let i = 0; i < array.length; i++) {
        sum += Number(array[i].money);
    }
    return sum;
}

function main() {
    const unit = document.querySelector('.unit').value;
    let quantity = document.querySelector('.quantity').value;
    let array = [];

    array = enterData(quantity);
    
    array = createFirstTable('.table-1', unit,quantity, array);
    createSecondTable('.table-2', array, unit);
    console.log(array);
    showResult();
}