

let clock = document.getElementById('clock');
let calculator = document.getElementById('calculator');
let weather = document.getElementById('weather');
let notes = document.getElementById('notes');

function addBorder(tab){
    if (tab === clock){
        calculator.style.border = '';
        notes.style.border = '';
        weather.style.border = '';
        clock.style.border = '2px solid cyan'
    } else if (tab === calculator){
        calculator.style.border = '2px solid cyan';
        notes.style.border = '';
        weather.style.border = '';
        clock.style.border = '';
        } else if (tab === weather){
            calculator.style.border = '';
            notes.style.border = '';
            weather.style.border = '2px solid cyan';
            clock.style.border = ''
            } else if (tab === notes){
                calculator.style.border = '';
                notes.style.border = '2px solid cyan';
                weather.style.border = '';
                clock.style.border = ''
            }
}

clock.addEventListener('click', ()=> {
    addBorder(clock);
})

calculator.addEventListener('click', ()=> {
    addBorder(calculator);
})

weather.addEventListener('click', ()=> {
    addBorder(weather);
})

notes.addEventListener('click', ()=> {
    addBorder(notes);
})


// ******************* notes section below ************************
let notesAddNote = document.getElementById('notesAddNote');
let notesTextBox = document.getElementById('notesTextBox');
let notesPostNoteButton = document.getElementById('notesPostNoteButton');
let notesViewNotesButton = document.getElementById('notesViewNotesButton');
let notesNotesList = document.getElementById('notesNotesList');
let notesClearNotesButton = document.getElementById('notesClearNotesButton');

// Assigns the local storage key to be first 3 words of the note 
const notesNotePreviewFunc = () => {
    return notesTextBox.value.split(' ').slice(0, 3).join(' ');
}

// adds note to notesNotesList from botom button
notesPostNoteButton.addEventListener('click', ()=> {
    if (notesTextBox.value !== ''){
        localStorage.setItem(notesNotePreviewFunc(), notesTextBox.value);
    }
    return;
});

// hit the plus sign at the top to generate a fresh note
notesAddNote.addEventListener('click', ()=> {
    if (notesNotesList.style.display === 'block'){
        notesClearNotesButton.style.display = 'none';
        notesNotesList.style.display = 'none';
        notesTextBox.style.display = 'block';
    }
    if (notesTextBox.value == ''){
        return;
    } else {
        localStorage.setItem(notesNotePreviewFunc(), notesTextBox.value);
    }
    notesTextBox.value = '';
})

// function adds notes to notesNotesList div 
const notesViewNotesFunc = () => {
    let a = Object.values(localStorage);
    return a.map(e=> e + '</br></br>').join(' ');
}

//shows you list of saved notes
notesViewNotesButton.addEventListener('click', ()=> {
    notesClearNotesButton.style.display = 'inline';
    if (notesTextBox.style.display !== 'none'){
        notesTextBox.style.display = 'none';
        notesNotesList.style.display = 'block'; 
        notesNotesList.innerHTML = notesViewNotesFunc();
    } else {
        notesTextBox.style.display = 'block';
        notesTextBox.value = '';
        notesClearNotesButton.style.display = 'none';
        notesNotesList.style.display = 'none'; 
    }
});

// will clear out all saved notes 
notesClearNotesButton.addEventListener('click', ()=> {
    let deleteAllNotes = confirm('this will delete all notes');
    if (deleteAllNotes){
        localStorage.clear();
        notesNotesList.style.display = 'none';
        notesTextBox.style.display = 'block';
        notesTextBox.value = '';
        notesClearNotesButton.style.display = 'none';
    }
})






// ****************** weather section below ************************
import cities from './cityList.js'; 

let weatherRefreshButton = document.getElementById('weatherRefreshButton');
let weatherCurrentCity = document.getElementById('weatherCurrentCity');
let weatherGoButton = document.getElementById('weatherGoButton');
let weatherCurrentTemp = document.getElementById('weatherCurrentTemp');
let weatherCurrentIcon = document.getElementById('weatherCurrentIcon');
let weatherCurrentDescription = document.getElementById('weatherCurrentDescription');
let weatherPrecip = document.getElementById('weatherPrecip');
let weatherFeelsLike = document.getElementById('weatherFeelsLike');
let weatherWind = document.getElementById('weatherWind');
let weatherHumididty = document.getElementById('weatherHumidity');
let weatherHourOne = document.getElementById('weatherHourOne');
let weatherTextBox = document.getElementById('weatherTextBox');

// uses the openweathermap 1call api with coordinates. defaults to austin coords

/*
const weatherGetCurrentsFunc = (lat = 30.382580, lon = -97.710243) => {
fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=imperial&appid=89487f45423ccbfbdd6e1ea526f5177f`)
    .then(response=> response.json())
    .then(data=> {
        //console.log(data);
        let temp = data.current.temp;
        let icon = data.current.weather[0]['icon'];
        let description = data.current.weather[0]['description'];
        let feelsLike = data.current.feels_like;
        let wind = data.current.wind_speed;
        let humidity = data.current.humidity;
        let precipitation = data.minutely[0]['precipitation'];

        weatherCurrentTemp.innerHTML = `${Math.round(temp)}\u00b0`;
        weatherCurrentIcon.innerHTML =  `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`
        weatherCurrentDescription.innerHTML = description;
        
        const darkText = () => {
            weather.style.color = "#444444";
            weatherRefreshButton.style.color = "#444444";
            weatherTextBox.style.color = "#444444";
            weatherGoButton.style.color = "#444444";
        }

        const lightText = () => {
            weather.style.color = "whitesmoke";
            weatherRefreshButton.style.color = "whitesmoke";
            weatherTextBox.style.color = "whitesmoke";
            weatherGoButton.style.color = "whitesmoke";
        }

        // injects pictures and font color based on conditions
        if (description.includes('clear')){
            weather.style.backgroundImage = "url('pics/clearsky_hud.jpg')";
            darkText();
        } else if (description.includes('cloud')){
            weather.style.backgroundImage= "url('pics/clouds_hud.jpg')";
            lightText();
        } else if (description.includes('rain') || description.includes('drizzle')){
            weather.style.backgroundImage = "url('pics/rain_hud.jpg')";
            lightText();
        } else if (description.includes('storm')){
            weather.style.backgroundImage = "url('pics/storm_hud.jpg')";
            lightText();
        } else if (description.includes('snow')){
            weather.style.backgroundImage = "url('pics/snow_hud.jpg')";
            lightText();
        } else if (description.includes('mist')){
            weather.style.backgroundImage = "url('pics/mist_hud.jpg')";
            lightText();
        } else if (description.includes('fog')){
            weather.style.backgroundImage = "url('pics/fog_hud.jpeg')";
            darkText();
        }
        
        weatherFeelsLike.innerHTML = `feels like ${Math.round(feelsLike)}\u00b0`;
        weatherPrecip.innerHTML = `precipitation ${Math.round(precipitation)}%`;
        weatherWind.innerHTML = `wind ${Math.round(wind)}mph`;
        weatherHumididty.innerHTML = `humidity ${humidity}%`;

        // below deals with assigning am/pm and hourly data
        let timestamp = data.hourly[0]['dt'];
        let date = new Date(timestamp * 1000);
        let pm = false;
        let currentHour = date.getHours();
        
        if (currentHour === 12){
            pm = true;
        }
        if (currentHour > 12){
            currentHour -= 12;
            pm = true;
        }
       
        // handles hourly time stretching from pm -> am   
        if (pm === true && currentHour === 9){
            weatherHourOne.innerHTML = `${currentHour + 1}pm`;
            weatherHourTwo.innerHTML = `${currentHour + 2}pm`;
            weatherHourThree.innerHTML = `${currentHour + 3}am`;
        } else if (pm === true && currentHour === 10){
            weatherHourOne.innerHTML = `${currentHour + 1}pm`;
            weatherHourTwo.innerHTML = `${currentHour + 2}am`;
            weatherHourThree.innerHTML = `${currentHour - 9}am`;
        } else if (pm === true && currentHour === 11){
            weatherHourOne.innerHTML = `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = `${currentHour - 10}am`;
            weatherHourThree.innerHTML = `${currentHour - 9}am`;
        }
        // handles hourly time stretching from am -> pm   
        else if (currentHour === 9){
            weatherHourOne.innerHTML = `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = `${currentHour + 2}am`;
            weatherHourThree.innerHTML = `${currentHour + 3}pm`;
        } else if (currentHour === 10){
            weatherHourOne.innerHTML = `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = `${currentHour + 2}pm`;
            weatherHourThree.innerHTML = `${currentHour - 9}pm`;
        } else if (currentHour === 11){
            weatherHourOne.innerHTML = `${currentHour + 1}pm`;
            weatherHourTwo.innerHTML = `${currentHour - 10}pm`;
            weatherHourThree.innerHTML = `${currentHour - 9}pm`;
        }
        // handles noon hour
        else if (currentHour === 12){
            weatherHourOne.innerHTML = `${currentHour - 11}pm`;
            weatherHourTwo.innerHTML = `${currentHour - 10}pm`;
            weatherHourThree.innerHTML = `${currentHour - 9}pm`;
        }
        //  handles regular hourly time
        else { 
            weatherHourOne.innerHTML = pm === true ? `${currentHour + 1}pm` : `${currentHour + 1}am`;
            weatherHourTwo.innerHTML = pm === true ? `${currentHour + 2}pm` : `${currentHour + 2}am`;
            weatherHourThree.innerHTML = pm === true ? `${currentHour + 3}pm` : `${currentHour + 3}am`;
        }

        let hour1Icon = data.hourly[0].weather[0]['icon'];
        weatherIconOne.innerHTML = `<img src="http://openweathermap.org/img/wn/${hour1Icon}.png">`; 

        let hour2Icon = data.hourly[1].weather[0]['icon'];
        weatherIconTwo.innerHTML =  `<img src="http://openweathermap.org/img/wn/${hour2Icon}.png">`; 
        
        let hour3Icon =  data.hourly[2].weather[0]['icon'];
        weatherIconThree.innerHTML = `<img src="http://openweathermap.org/img/wn/${hour3Icon}.png">`; 

        let hour1Temp = Math.round(data.hourly[0]['temp']);
        weatherTempOne.innerHTML = `${hour1Temp}\u00b0`;

        let hour2Temp = Math.round(data.hourly[1]['temp']);
        weatherTempTwo.innerHTML = `${hour2Temp}\u00b0`;
       
        let hour3Temp = Math.round(data.hourly[2]['temp']);
        weatherTempThree.innerHTML = `${hour3Temp}\u00b0`;
    })
    .catch(errror=> {
        //alert('could not load weather data');
        console.error('the 1call api to via openweathermap failed. check coords or api key');
    })
}


// takes weatherTextBox input and spits out the city 'id' to find a match within citiyList
const nameMatchFunc = (userInput) => {
    let cityList = (Object.values(cities)[0]).filter(e=> e['state'] !== '');
    let cityString = '';
    let id; 
    let cityMatches = [];

    if (userInput.split(' ').length === 1){
        cityString = userInput.split('').map((e,i,a)=> i === 0 ? e.toUpperCase() : e).join('');
    } else {
        cityString = userInput.split('').map((e,i,a)=> i === 0 ? e.toUpperCase() : 
            a[i-1] === ' ' ? e.toUpperCase() : e).join('');
    }
    for (let i=0;i<cityList.length;i++){
            if (cityString === cityList[i]['name'] && cityList[i]['state'] !== ''){
                cityMatches.push(cityList[i]['id']);
            }
    }

    // Uses first match found in cityList. Can give problems with duplicate city names
    id = cityMatches[0];
    // assigns the the userInput to the current city div 
    weatherCurrentCity.innerHTML = cityString;
    return id;
}

// ****** comments below for getCitySearchCurrentsFunc ********
// used for searches or refreshing after a search
// plugs in either the weatherTextBox input or uses current city
// calls nameMatchFunc to get the city id then uses that to get the city's coords to run the weatherGetCurrentsFunc
const getCitySearchCurrentsFunc = () => {
    let status = weatherTextBox.value;
    if (status === ''){
        status = weatherCurrentCity.innerHTML;
    }
    fetch(`https://api.openweathermap.org/data/2.5/weather?id=${nameMatchFunc(status)}&units=imperial&appid=89487f45423ccbfbdd6e1ea526f5177f`)
        .then(response=> response.json())
        .then(data=> {
            let lat = data.coord['lat'];
            let lon = data.coord['lon'];
            weatherGetCurrentsFunc(lat, lon);
            weatherTextBox.value = '';
        })
        .catch(error=> {
            console.error(`no match for "${weatherTextBox.value}." could not find the city id for gitCitySearchCurrentsFunc`);
            alert(`could not get weather for "${weatherTextBox.value}"`)
            weatherTextBox.value = '';
        })
}

// when refreshed manually
weatherRefreshButton.addEventListener('click', ()=> {
    getCitySearchCurrentsFunc();
})

weatherGoButton.addEventListener('click', ()=> {
    getCitySearchCurrentsFunc();
});

weatherTextBox.addEventListener('keydown', (e)=> {
    if (e.keyCode === 13){
        getCitySearchCurrentsFunc();
    }
});

// refreshes current temps every minute
window.setInterval(()=> {
    getCitySearchCurrentsFunc();
}, 60000)

// runs on page load to get austin weather
weatherGetCurrentsFunc();

*/


// ****************** clock section below *********************

let alarm = new Audio('sounds/alarm.mp3');

const clockAlarmFunc = () => alarm.play();
const stopAlarmFunc = () => alarm.pause();

let clockDigit1 = document.getElementById('clockDigit1');
let clockDigit2 = document.getElementById('clockDigit2');
let clockDigit3 = document.getElementById('clockDigit3');
let clockDigit4 = document.getElementById('clockDigit4');
let clockDigitSeconds1 = document.getElementById('clockDigitSecs1');
let clockDigitSeconds2 = document.getElementById('clockDigitSecs2');
let clockAP = document.getElementById('clockAP');

let clockAlarmIcon = document.getElementById('clockAlarmIcon');
let clockTimerIcon = document.getElementById('clockTimerIcon');
let clockPomoIcon = document.getElementById('clockPomoIcon');

//let clockAlarmSettings = document.getElementById('clockAlarmSettings');
let clockInputTime = document.getElementById('clockInputTime');
let clockAlarmSetButton = document.getElementById('clockAlarmSetButton');
let clockAlarmRecall = document.getElementById('clockAlarmRecall');
let clockEndAlarm = document.getElementById('clockEndAlarm');

let clockTimerHeader = document.getElementById('clockTimerHeader');
let clockTimerUp = document.getElementById('clockTimerUp');
let clockTimerInputUp = document.getElementById('clockTimerInputUp');
let clockTimerInputDown = document.getElementById('clockTimerInputDown');
let clockTimerStart = document.getElementById('clockTimerStart');
let clockTimerReset = document.getElementById('clockTimerReset');
let clockTimerStop = document.getElementById('clockTimerStop');
let clockTimerEnd = document.getElementById('clockTimerEnd');



let clockTimerDown = document.getElementById('clockTimerDown');

let clockPomoSettings = document.getElementById('clockPomoSettings');


let alarmActive = false;
let timerActive = false;
let pomoActive = false;


window.setInterval(()=>{
    let date = new Date();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    let pm = false;

    if (hour === 12){
        pm = true;
    } else if (hour > 12){
        hour -= 12;
        pm = true;
    }
    
    let hourArr = ('' + hour).split('');
    let minArr = ('' + min).split('');
    let secArr = ('' + sec).split('');

    //console.log(hourArr) 
    if (hourArr.length === 1 && hour === 0){
        clockDigit1.innerHTML = '1';
        clockDigit2.innerHTML = '2';
    } else if (hourArr.length === 1){
        clockDigit1.innerHTML = '';
        clockDigit2.innerHTML = hourArr[0];
    } else {
        clockDigit1.innerHTML = hourArr[0];
        clockDigit2.innerHTML = hourArr[1];
    }

    if (minArr.length === 1){
        clockDigit3.innerHTML = '0'; 
        clockDigit4.innerHTML = minArr[0];
    } else {
        clockDigit3.innerHTML = minArr[0];
        clockDigit4.innerHTML = minArr[1];
    }

    if (secArr.length === 1){
        clockDigitSecs1.innerHTML = '0';
        clockDigitSecs2.innerHTML = secArr[0];
    } else {
        clockDigitSecs1.innerHTML = secArr[0];
        clockDigitSecs2.innerHTML = secArr[1];
    }

    if (pm === true){
        clockAP.innerHTML = 'p';
    } else {
        clockAP.innerHTML = 'a';
    }

    clockM.innerHTML = 'm';
}, 1000);

// hide and show icons on main page below 
const hideSettingsIconsFunc = () => {
    clockAlarmIcon.style.display = 'none';
    clockTimerIcon.style.display = 'none';
    clockPomoIcon.style.display = 'none';
}

const showSettingsIconsFunc = () => {
    clockAlarmIcon.style.display = 'block';
    clockTimerIcon.style.display = 'block';
    clockPomoIcon.style.display = 'block';
}

// Alarm functionality below 
const showAlarmSettings = () =>{
    hideSettingsIconsFunc();
    clockAlarmHeader.style.display = 'block';
    clockSetTime.style.display = 'block';
    clockAlarmSetButton.style.display = 'block';
} 

const hideAlarmSettings = () =>{
    clockAlarmHeader.style.display = 'none';
    clockSetTime.style.display = 'none';
    clockAlarmSetButton.style.display = 'none';
    showSettingsIconsFunc();
}

// hides timer recall buttons so you can set the alarm. disable clicks on the div
clockAlarmIcon.addEventListener('click', ()=> {
    if (alarmActive){
        return;
    }
    showAlarmSettings();
    hideTimerButtons();
    clockAlarmIcon.style.pointerEvents = 'none';
})

clockAlarmSetButton.addEventListener('click', ()=> {
    hideAlarmSettings();
    clockAlarmRecall.style.display = 'block';
    let time = clockInputTime.value.split(':');
    let m = 'am';
    
    if (time[0] === '12'){
        m = 'pm';
    } else if (+time[0] > 12){
        time[0] -= 12;
        m = 'pm';
    } else if (time[0] === '00'){
        time[0] = '12';
    }
    
    clockAlarmRecall.innerHTML = `${time.join(':')} ${m}`;
   
    // handles times with  without a zero in front like 9:44 pm 
    if (clockAlarmRecall.innerHTML.length === 7){
        clockAlarmRecall.innerHTML = `0${time.join(':')} ${m}`;
    }
   
    //should work with the {1,2} investigate further
    let regValidateTime = /\d{1,2}:\d{2}\s[apAP]M/i;
    
    if (!clockAlarmRecall.innerHTML.match(regValidateTime)){
        clockAlarmRecall.style.display = 'none';
        alert('invalid time');
        console.error('invlaid time');
        clockAlarmIcon.style.pointerEvents = 'auto';
    } else {
        clockEndAlarm.style.display = 'block';
        clockAlarmRecall.style.display = 'block';
        clockAlarmIcon.style.backgroundColor = 'yellow';
    }
})

// sets the alarm. setInterveral checks for alarm time to match real time.  
let setTheAlarm;
clockAlarmSetButton.addEventListener('click', ()=>{
    alarmActive = true;
    if (timerActive){
        timerUpRecall();
    }
   
    let a = clockAlarmRecall.innerHTML.split('');
    let count = 0;
   
    setTheAlarm = setInterval(() => {
    let alarm = false;

    if (count === 0 && a[0] === '0' && clockDigit1.innerHTML === '' && a[1] === clockDigit2.innerHTML && a[3] === clockDigit3.innerHTML && a[4] === clockDigit4.innerHTML && a[a.length-2] === clockAP.innerHTML){
        alarm = true;
    } else if (count === 0 && a[0] === clockDigit1.innerHTML && a[1] === clockDigit2.innerHTML && a[3] === clockDigit3.innerHTML && a[4] === clockDigit4.innerHTML && a[a.length-2] === clockAP.innerHTML){
        alarm = true;
    }
    if (alarm === true && count === 0){
       clockAlarmFunc();
       count++;
    }

    }, 1000);
})

// stops / cancels alarm
clockEndAlarm.addEventListener('click', ()=>{
    alarmActive = false;
    clockAlarmIcon.style.pointerEvents = 'auto';
   
    clearInterval(setTheAlarm);
    stopAlarmFunc();

    clockAlarmRecall.style.display = 'none';
    clockEndAlarm.style.display = 'none';
    clockAlarmIcon.style.backgroundColor = '#bc4555'
})

// refactored timer section below ******************************************************************
let timerDownHour = document.getElementById('timerDownHour');
let timerDownMin = document.getElementById('timerDownMin');
let timerDownSec = document.getElementById('timerDownSec');
let timerDownHour1 = document.getElementById('timerDownHour1');
let timerDownMin1 = document.getElementById('timerDownMin1');
let timerDownSec1 = document.getElementById('timerDownSec1');
let clockTimerDownRecall = document.getElementById('clockTimerDownRecall');
let timerDownActive = false;

clockTimerIcon.addEventListener('click', ()=> {
    clockEndAlarm.style.display = 'none';
    if (timerUpReady){
        showTimerSettings();
        console.log('t up ready')
    }
    if (timerDownReady){
        console.log('t down ready')
        hideSettingsIconsFunc();
        clockTimerHeader.style.display = 'block';
        clockTimerUp.style.display = 'block';
        clockTimerDown.style.display = 'block';
        clockTimerStart.style.display = 'block';
    
        clockTimerInputDown.style.display = 'block';
        clockTimerInputDown.innerHTML = `<input id="timerDownHour1" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownMin1" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownSec1" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">`
    }
}) 

const showTimerSettings = () =>{
    hideSettingsIconsFunc();
    clockTimerHeader.style.display = 'block';
    clockTimerUp.style.display = 'block';
    clockTimerDown.style.display = 'block';
    clockTimerStart.style.display = 'block';
    clockTimerInputUp.style.display = 'block';
} 

const hideTimerSettings = () =>{
    showSettingsIconsFunc();
    clockTimerHeader.style.display = 'none';
    clockTimerUp.style.display = 'none';
    clockTimerDown.style.display = 'none';
    clockTimerStart.style.display = 'none';
}

const showTimerDownSettings = () => {
    timerDownHour.style.display = 'block';
    timerDownMin.style.display = 'block';
    timerDownSec.style.display = 'block';
}

const hideTimerDownSettings = () => {
    timerDownHour.style.display = 'none';
    timerDownMin.style.display = 'none';
    timerDownSec.style.display = 'none';
}

let timerUpReady = true;
clockTimerUp.addEventListener('click', ()=>{
    timerUpReady = true;
    timerDownReady = false;

    clockTimerInputUp.style.display = 'block'
    clockTimerUp.style.backgroundColor = 'yellow';
    
    clockTimerInputDown.style.display = 'none'
    clockTimerDown.style.backgroundColor = '#bc4555';
})

let timerDownReady = false
clockTimerDown.addEventListener('click', ()=>{
    timerDownReady = true;
    timerUpReady = false;

    clockTimerInputUp.style.display = 'none';
    clockTimerUp.style.backgroundColor = '#bc4555';

    clockTimerInputDown.style.display = 'block';
    clockTimerDown.style.backgroundColor = 'yellow';
})

const showTimerButtons = () => {
    clockTimerReset.style.display = 'block';
    clockTimerStop.style.display = 'block';
    clockTimerEnd.style.display = 'block';
}

const hideTimerButtons = () => {
    clockTimerReset.style.display = 'none';
    clockTimerStop.style.display = 'none';
    clockTimerEnd.style.display = 'none';
}

clockTimerStart.addEventListener('click', ()=>{
    clockTimerIcon.style.pointerEvents = 'none';
    if (timerUpReady){
        if (!timerActive){
            timerActive = true;
            hideTimerSettings();
            showTimerButtons();
            timerStartFunc();
        } else {
            console.log('could not start timer up');
        }
    } 
    ////// timer down code here
    if (timerDownReady) {
        if (!timerDownActive && timerDownWasReset){
            timerDownActive = true;
            hideTimerSettings();
            showTimerButtons();
            
            let hour = document.getElementById('timerDownHour1');
            let min = document.getElementById('timerDownMin1');
            let sec = document.getElementById('timerDownSec1');
            countDownFunc(hour.value, min.value, sec.value);
            clockTimerDownRecall.style.display = 'block';
        }
        if (!timerDownActive && !timerDownWasReset){
            timerDownActive = true;
            hideTimerSettings();
            showTimerButtons();
            countDownFunc();
        }
    }
})

// still need to add reset condiions
let downPauseAfterReset = false;
clockTimerStop.addEventListener('click', ()=> {
    if (timerUpReady){
        console.log('up code here');
        let a = timeElapsed.split(':')
        if (timerActive){
            timerActive = false;
            clearInterval(startTheTimer);
            clockTimerStop.innerHTML = 'start'
        } else if (!timerActive && timerUpWasReset){
            timerActive = true;
            timerStartFunc();
            clockTimerStop.innerHTML = 'stop';
        } else if (!timerActive){
            timerActive = true;
            timerStartFunc(+a[0], +a[1], +(`${+a[2] + 1}`));
            clockTimerStop.innerHTML = 'stop';
        }
    }

    if (timerDownReady){
        if (!timerDownActive && timerDownWasReset && downPauseAfterReset){
            let a = timeRemaining.split(':');
            timerDownActive = true;
            countDownFunc(+a[0], +a[1], +a[2] - 1);
            clockTimerStop.innerHTML = 'stop';
        } else if (!timerDownActive && timerDownWasReset){
            console.log('n the right place');
            let hour = document.getElementById('timerDownHourReset');
            let min = document.getElementById('timerDownMinReset');
            let sec = document.getElementById('timerDownSecReset');
            timerDownActive = true;
            countDownFunc(+hour.value, +min.value, +sec.value);
            clockTimerDownRecall.style.display = 'block';
            clockTimerStop.innerHTML = 'stop';
        } else if (timerDownActive && timerDownWasReset){
            console.log('edge case here')
            timeRemaining = clockTimerDownRecall.innerHTML;
            clearInterval(startDownTimer);
            clockTimerDownRecall.innerHTML = timeRemaining;
            timerDownActive = false
            clockTimerStop.innerHTML = 'start'

            downPauseAfterReset = true;

            clockTimerReset.style.display = 'none';

        } else if (!timerDownActive && !timerDownWasReset){
            let a = timeRemaining.split(':');
            timerDownActive = true;
            countDownFunc(+a[0], +a[1], +a[2] - 1);
            console.log('subtracting here?')
            clockTimerStop.innerHTML = 'stop';
        } else if (timerDownActive){
            timeRemaining = clockTimerDownRecall.innerHTML;
            clearInterval(startDownTimer);
            clockTimerDownRecall.innerHTML = timeRemaining;
            timerDownActive = false;
            clockTimerStop.innerHTML = 'start';
        }
    }
})

clockTimerEnd.addEventListener('click', ()=> {
    clockTimerIcon.style.pointerEvents = 'auto';
    hideTimerButtons();
    timerActive = false;
    timerDownActive = false;
    if (timerUpReady){
        clearInterval(startTheTimer);
        clockTimerInputUp.style.display = 'none';
        clockTimerInputUp.innerHTML = '00:00:00';
        timerUpWasReset = true;
    }
    if (timerDownReady){
        clearInterval(startDownTimer);
        clockTimerDownRecall.style.display = 'none';
        timerDownWasReset = true;
    }
})

// reset and end will have the same functionality
let timerUpWasReset = false;
let timerDownWasReset = false;

clockTimerReset.addEventListener('click', ()=>{
    timerActive = false;
    timerDownActive = false;
    if (timerUpReady){
        clearInterval(startTheTimer);
        clockTimerInputUp.innerHTML = '00:00:00';
        clockTimerStop.innerHTML = 'start';
        timerUpWasReset = true;
    }
    if (timerDownReady){
        clearInterval(startDownTimer);
        clockTimerStop.innerHTML = 'start';
        clockTimerDownRecall.style.display = 'none';
        timerDownWasReset = true;

        clockTimerInputDown.style.display = 'block';
        clockTimerInputDown.innerHTML = `<input id="timerDownHourReset" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownMinReset" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">
                <input id="timerDownSecReset" class="timerDownSettings" type="number" max="60" min="0" placeholder="00">`
    }
})


// timer UP func
let startTheTimer;
let timeElapsed;
function timerStartFunc(hour = 0, min = 0, sec = 1){
    if (timerActive){
        startTheTimer = setInterval(() => {
            if (sec === 60){
                sec = 0;
                min++;
            } else if (min === 60){
                min = 0;
                hour++;
            }

            if (('' + hour).length === 1){
                hour = '0' + hour;
            }
            if (('' + min).length === 1) {
                min = '0' + min;
            }
            if (('' + sec).length === 1){
                sec = `0${sec}`;
            }
            timeElapsed = [hour, min, sec].join(':');
            clockTimerInputUp.innerHTML = timeElapsed;
            sec++;
        }, 1000);
    } else {
        clearInterval(startTheTimer);
    }
}   

//  timer DOWN func
let startDownTimer;
let timeRemaining;
function countDownFunc(hour = +(timerDownHour.value), min = +(timerDownMin.value), sec = +(timerDownSec.value)){
    if (timerDownActive){
        hideTimerDownSettings();
        clockTimerInputDown.style.display = 'none';
            startDownTimer = setInterval(()=>{
                if (hour > 0 && min === 0 && sec === -1){
                    hour--;
                    min = 59;
                    sec = 59;
                } else if (min > 0 && sec === -1){
                    min--;
                    sec = 59;
                } else if (hour === 0 && min === 0 & sec === 0){
                    clearInterval(startDownTimer);
                    hour = `00`;
                    min = `00`;
                    sec = `00`;
                }
                console.log([hour, min, sec]);
                let a = [hour, min, sec].map(e=> ('' + e).length === 0 ? `00` :
                        ('' + e).length === 1 ? `0${e}` : e);
                console.log(a);
                clockTimerDownRecall.innerHTML = `${a[0]}:${a[1]}:${a[2]}`;
                if (clockTimerDownRecall.innerHTML === `00:00:00`){
                    clearInterval(startDownTimer);
                }
                sec--;
            }, 1000);
    } else {
        clearInterval(startDownTimer);
    }
}
















































const showPomoSettings = () =>{
    hideSettingsIconsFunc();
    clockPomoSettings.style.display = 'block';
} 


clockPomoIcon.addEventListener('click', ()=> {
    showPomoSettings();
})


