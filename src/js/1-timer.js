'use strict';

import flatpickr from "flatpickr";
import iziToast from 'izitoast';


const startButton = document.querySelector('[data-start]'),
dataDays = document.querySelector('span[data-days]'),
dataHours = document.querySelector('span[data-hours]'),
dataMinutes = document.querySelector('span[data-minutes]'),
dataSeconds = document.querySelector('span[data-seconds]')

startButton.disabled = true;
let userSelectedDate;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        if (selectedDates[0] > new Date()) {
            userSelectedDate = selectedDates[0];
            startButton.disabled = false;
          } else {
            iziToast.show({
              icon: 'icon-error',
              backgroundColor: '#FC5A5A',
              message: 'Please choose a date in the future',
              messageColor: '#FAFAFB',
              messageSize: '16px',
              position: 'topCenter',
              close: false,
            });
            startButton.disabled = true;
          }
        },
      };

  flatpickr("#datetime-picker", options);

  startButton.addEventListener('click', event => {
    const timer = setInterval(() => {
        startButton.disabled = true;
      const timeDiff = userSelectedDate - Date.now();
      const timerDate = convertMs(timeDiff);
      if (timeDiff <= 0) {
        clearInterval(timer);
      } else {
        dataDays.textContent = addLeadingZero(timerDate.days);
        dataHours.textContent = addLeadingZero(timerDate.hours);
        dataMinutes.textContent = addLeadingZero(timerDate.minutes);
        dataSeconds.textContent = addLeadingZero(timerDate.seconds);
      }
    }, 1000);
  });

  function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  function addLeadingZero(value) {
    let time = String(value);
    if (time.length < 2) {
      return time.padStart(2, '0');
    } else {
      return time;
    }
  }
