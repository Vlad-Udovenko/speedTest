const Http = new XMLHttpRequest();
const url = 'https://technodreams.biz/speedtest/';
let arrSpeed = [];
let counter = 100;
let avarageNum = Number;

function average(arr) {
    return avarageNum = arr.reduce((a, b) => (a + b)) / arr.length
}

function createString(val) {
    if (val < 10) {
        return res = '00' + val;
    } else if (10 <= val && val < 100) {
        return res = '0' + val;
    } else {
        return res = val;
    }
}

let getVal = () => {
    document.getElementById("speedButton").disabled = true;
    if (counter > 0) {
        createString(counter);
        counter--;
        Http.open("GET", url + res);
        Http.send();
        let startDate = Date.now();
        Http.onload = (e) => {
            let endDate = Date.now();
            let time = endDate - startDate;
            let speed = 1000000 / (time)
            arrSpeed.push(speed * 1000 / 1024 / 1024 * 8);
            drowGraph(arrSpeed);
            getVal()
        }
    } else {
        if (arrSpeed.length) {
            average(arrSpeed);
        }
        drowGraph(arrSpeed);
        arrSpeed = [];
        document.getElementById("speedButton").disabled = false;
        counter = 100;
    }
}
drowGraph = function (arr) {
    let div = document.getElementById("graphContainer");
    settings = {};
    let d = new liteChart("chart", settings);
    d.setLabels([...Array(100)]);
    d.addLegend({
        "name": "Mb/s",
        "stroke": "#3b95f7",
        "fill": "#fff",
        "values": arr
    });
    if (arrSpeed.length) {
        average(arrSpeed);
    }
    if (avarageNum > 0) {
        div.innerHTML += `<h3 id="avarage">Internet connection speed ${avarageNum.toFixed(2)}Mb/s</h3>`;
    }
    d.inject(div);
    d.draw();
};