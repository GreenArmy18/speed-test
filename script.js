/*(
    function () {
    // We are resizing for mobile devices only. For other devices, the
    // dimensions will be stuck at 800 * 600. To change the default dimensions,
    // change the height and width of the canvas and the width of the #container
    var win = window,
        doc = document,
        w = win.innerWidth,
        h = win.innerHeight,
        container = doc.getElementById('container'),
        canvas = doc.getElementById('myChart');

    if (win.navigator.userAgent.match(/(iPhone|iPod|iPad|Android|BlackBerry)/i)) {
        canvas.height = h;
        canvas.width = w;
    }
})();
*/

window.addEventListener('load', setup);

async function setup() {
    const ctx = document.getElementById('myChart').getContext('2d');
    const speedData = await getData();
    const myChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: speedData.time,
            datasets: [{
                label: 'Upload Speed',
                data: speedData.upload,
                fill: true,
                borderColor: 'rgba(97, 131, 255, 1)',
                backgroundColor: 'rgba(97, 131, 255, 0.5)',
                borderWidth: 1
            }, {
                label: 'Ping Speed',
                data: speedData.ping,
                fill: true,
                borderColor: 'rgba(131, 255, 97, 1)',
                backgroundColor: 'rgba(131, 255, 97, 0.5)',
                borderWidth: 1
            }, {
                label: 'Download Speed',
                data: speedData.download,
                fill: true,
                borderColor: 'rgba(255, 99, 132, 1)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            title: {
                display: true,
                text: 'Combain Speed Tests'
            }

        },
    });
}

async function getData() {
    const response = await fetch('speedTest.csv');
    const data = await response.text();
    const download = [];
    const upload = [];
    const ping = [];
    const time = [];
    const rows = data.split('\n').slice(1);
    rows.forEach(row => {
        const cols = row.split(',');
        time.push(cols[0]);
        download.push(cols[1]);
        upload.push(cols[2]);
        ping.push(cols[3]);
    });
    return {
        time,
        download,
        upload,
        ping
    };
}
