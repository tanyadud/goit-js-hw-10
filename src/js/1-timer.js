'use strict';

import flatpickr from "flatpickr";
import iziToast from 'izitoast';


const startButton = document.querySelector('[data-start]'),
datePickerInput = document.querySelector('#datetime-picker'),
dataDays = document.querySelector('span[data-days]'),
dataHours = document.querySelector('span[data-hours]'),
dataMinutes = document.querySelector('span[data-minutes]'),
dataSeconds = document.querySelector('span[data-seconds]')

startButton.disabled = true;
let userSelectedDate;
let countdownInterval;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.error({
              message: 'Please choose a date in the future',
              icon: 'icon-error',
              backgroundColor: '#FC5A5A',
              message: 'Please choose a date in the future',
              messageColor: '#FAFAFB',
              messageSize: '16px',
              position: 'topCenter',
              close: false,
            });
            startButton.disabled = true;
          } else {
            userSelectedDate = selectedDate;
            startButton.disabled = false;
          }
        },
      };

flatpickr("#datetime-picker", options);

startButton.addEventListener('click', event => {
 if (userSelectedDate) {
      startCountdown(userSelectedDate);
      startButton.disabled = true;
      datePickerInput.disabled = true;
    } else {
      updateTimerDisplay
    }
 });

function startCountdown(endDate) {
  clearInterval(countdownInterval);
  countdownInterval = setInterval(() => {
    const now = new Date();
    const timeRemaining = endDate - now;
  
    if (timeRemaining <= 0) {
       clearInterval(countdownInterval);
       updateTimerDisplay(0, 0, 0, 0);
       datePickerInput.disabled = false;
       startButton.disabled = true;
        return;
      }
  
    const { days, hours, minutes, seconds } = convertMs(timeRemaining);
      updateTimerDisplay(days, hours, minutes, seconds);
    }, 1000);
  }

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
  
function updateTimerDisplay(days, hours, minutes, seconds) {
    dataDays.textContent = String(days);
    dataHours.textContent = addLeadingZero(hours);
    dataMinutes.textContent = addLeadingZero(minutes);
    dataSeconds.textContent = addLeadingZero(seconds);
  }
  