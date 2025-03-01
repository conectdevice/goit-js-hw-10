import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';


const generatePromise = ({ delay, outcome }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (outcome === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};

const form = document.querySelector('.form');
form.addEventListener('submit', (event) => {
  event.preventDefault();


  const delay = parseInt(form.elements['delay'].value);
  const outcome = form.elements['state'].value;


  generatePromise({ delay, outcome })
    .then((delay) => {
      iziToast.success({
        title: 'Success',
        message: `Fulfilled promise in ${delay} ms`,
      });
    })
    .catch((delay) => {
      iziToast.error({
        title: 'Error',
        message: `Rejected promise in ${delay} ms`,
      });
    });

 
  form.reset();
});