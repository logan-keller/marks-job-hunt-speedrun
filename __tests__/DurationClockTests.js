let moment = require('moment')
let DurationClock = require('../src/DurationClock')
let dc = new DurationClock()
dc.startTime = moment()

test('1 second', ()=> {
    dc.stopTime = dc.startTime.clone().add('1', 'seconds')
    expect(dc.formattedTime).toBe('01s')
})

test('10 seconds', ()=> {
    dc.stopTime = dc.startTime.clone().add('10', 'seconds')
    expect(dc.formattedTime).toBe('10s')
})

test('1 minute', ()=> {
    dc.stopTime = dc.startTime.clone().add('1', 'minutes')
    expect(dc.formattedTime).toBe('01m : 00s')
})

test('10 minutes', ()=> {
    dc.stopTime = dc.startTime.clone().add('10', 'minutes')
    expect(dc.formattedTime).toBe('10m : 00s')
})

test('1 hour', ()=> {
    dc.stopTime = dc.startTime.clone().add('1', 'hours')
    expect(dc.formattedTime).toBe('01h : 00m : 00s')
})

test('10 hours', ()=> {
    dc.stopTime = dc.startTime.clone().add('10', 'hours')
    expect(dc.formattedTime).toBe('10h : 00m : 00s')
})

test('1 day', ()=> {
    dc.stopTime = dc.startTime.clone().add('1', 'days')
    expect(dc.formattedTime).toBe('01d : 00h : 00m : 00s')
})

test('10 days', ()=> {
    dc.stopTime = dc.startTime.clone().add('10', 'days')
    expect(dc.formattedTime).toBe('10d : 00h : 00m : 00s')
})

// adding months requires special handling because of varying number of days
// https://github.com/moment/moment/issues/854
test('1 month', ()=> {
    let dc = new DurationClock()
    dc.startTime = moment('2019-10-01', 'YYYY-MM-DD')
    dc.stopTime = moment('2019-11-01', 'YYYY-MM-DD')
    expect(dc.formattedTime).toBe('01mo : 00d : 00h : 00m : 00s')
})

test('10 months', ()=> {
    let dc = new DurationClock()
    dc.startTime = moment('2019-01-01', 'YYYY-MM-DD')
    dc.stopTime = moment('2019-11-02-01', 'YYYY-MM-DD-HH')
    expect(dc.formattedTime).toBe('10mo : 00d : 00h : 00m : 00s')
})

test('1 year', ()=> {
    dc.stopTime = dc.startTime.clone().add('1', 'years')
    expect(dc.formattedTime).toBe('01y : 00mo : 00d : 00h : 00m : 00s')
})

test('10 years', ()=> {
    dc.stopTime = dc.startTime.clone().add('10', 'years')
    expect(dc.formattedTime).toBe('10y : 00mo : 00d : 00h : 00m : 00s')
})

test('negative single digits', ()=> {
    let dc = new DurationClock()
    dc.startTime = moment('2019-10-01', 'YYYY-MM-DD')
    dc.stopTime = moment('2018-08-29-22:58:59', 'YYYY-MM-DD-HH:mm:ss')
    expect(dc.formattedTime).toBe('-01y : -01mo : -01d : -01h : -01m : -01s')
})

test('negative double digits', ()=> {
    let dc = new DurationClock()
    dc.startTime = moment('2019-10-01', 'YYYY-MM-DD')
    dc.stopTime = moment('2008-11-19-12:49:50', 'YYYY-MM-DD-HH:mm:ss')
    expect(dc.formattedTime).toBe('-10y : -10mo : -10d : -10h : -10m : -10s')
})