import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const dateTimePickerInput = document.querySelector('#datetime-picker');
const startButton = document.querySelector('button[data-start]');
const daysDisplay = document.querySelector('span[data-days]');
const hoursDisplay = document.querySelector('span[data-hours]');
const minutesDisplay = document.querySelector('span[data-minutes]');
const secondsDisplay = document.querySelector('span[data-seconds]');

let selectedDate = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenDate = selectedDates[0];
    console.log('Selected Date:', chosenDate);

    if (chosenDate <= new Date()) {
      iziToast.error({
        title: 'Error',

      });
      startButton.disabled = true;
      return;
    }

    selectedDate = chosenDate;
    startButton.disabled = false;
  },
};

startButton.disabled = true;

function updateTimerDisplay({ days, hours, minutes, seconds }) {
  daysDisplay.textContent = addLeadingZero(days);
  hoursDisplay.textContent = addLeadingZero(hours);
  minutesDisplay.textContent = addLeadingZero(minutes);
  secondsDisplay.textContent = addLeadingZero(seconds);
}


flatpickr(dateTimePickerInput, options);

startButton.addEventListener('click', () => {
  if (!selectedDate) return;

  startButton.disabled = true;
  dateTimePickerInput.disabled = true;

  intervalId = setInterval(() => {
    const timeDifference = selectedDate - new Date();

    if (timeDifference <= 0) {
      clearInterval(intervalId);
      updateTimerDisplay({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      dateTimePickerInput.disabled = false;
      iziToast.success({
        title: 'Completed',
        message: 'The countdown has finished!',
      });
      return;
    }

    updateTimerDisplay(convertMs(timeDifference));
  }, 1000);
});

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
