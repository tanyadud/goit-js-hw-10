'use strict';

import iziToast from 'izitoast';


const form = document.querySelector('.form');

const errorMsg = delay =>
  iziToast.show({
    icon: 'icon-error',
    backgroundColor: '#EF4040',
    message: `Rejected promise in ${delay}ms`,
    messageColor: '#FAFAFB',
    messageSize: '16px',
    position: 'topCenter',
    close: false,
  });
  
  const correctMsg = delay =>
    iziToast.show({
      icon: 'icon-true',
      backgroundColor: '#59A10D',
      message: `Fulfilled promise in ${delay}ms`,
      messageColor: '#FAFAFB',
      messageSize: '16px',
      position: 'topCenter',
      close: false,
    });
  
  form.addEventListener('submit', evt => {
    evt.preventDefault();
    const delay = form.elements.delay.value;
    const state = form.elements.state.value;
    const makePromise = () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          if (state === 'fulfilled') {
            resolve();
          } else if (state === 'rejected') {
            reject();
          }
        }, delay);
      });
    };
    makePromise()
      .then(value => correctMsg(delay))
      .catch(error => errorMsg(delay));
  });