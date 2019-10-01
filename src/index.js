let moment = require('moment')
let DurationClock = require('./DurationClock')

let clock = document.getElementById('clock')

let dc = new DurationClock()
dc.startTime = moment('2019-10-01', 'YYYY-MM-DD')
dc.onTick = (formattedTime) => {
    clock.innerHTML = formattedTime
}
dc.start()