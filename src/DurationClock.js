let moment = require('moment')

let _tick

function formatTime(time) {
    if (time >= 0 && time < 10) return `0${time}`
    if (time > -10 && time < 0) return `-0${Math.abs(time)}`
    return time
}

class DurationClock {

    constructor() {
        this.startTime = null
        this.stopTime = null
        this.onTick = null
    }

    get formattedTime() {
        if (!this.startTime) throw Error('Must specify a start time')
        let start = this.startTime
        let stop = this.stopTime || moment()
        let time = moment.duration(stop.diff(start))
        
        let years = formatTime(time.years())
        let months = formatTime(time.months())
        let days = formatTime(time.days())
        let hours = formatTime(time.hours())
        let mins = formatTime(time.minutes())
        let secs = formatTime(time.seconds())

        let formattedTime = ''
        if (time.years()) return `${years}y : ${months}mo : ${days}d : ${hours}h : ${mins}m : ${secs}s`
        if (time.months()) return `${months}mo : ${days}d : ${hours}h : ${mins}m : ${secs}s`
        if (time.days()) return `${days}d : ${hours}h : ${mins}m : ${secs}s`
        if (time.hours()) return `${hours}h : ${mins}m : ${secs}s`
        if (time.minutes()) return `${mins}m : ${secs}s`
        return `${secs}s`
    }

    start() {
        _tick = setInterval(() => {
            if (this.onTick) this.onTick(this.formattedTime)
        }, 1000)
    }

    stop() {
        clearInterval(_tick)
    }

}

module.exports = DurationClock