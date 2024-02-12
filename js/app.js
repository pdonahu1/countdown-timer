const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');  // querySelectorAll, also used to populate values (innerHTML())
                                                                 // also grab then h4 tag where then text will display
// check what is current date
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDay();

// let futureDate = new Date(2024,1,5,7,46,0);  
// this will HARDCODE getFullYear, getMonth, getDay, getHours, getMinutes, seconds 
const futureDate = new Date(tempYear, tempMonth, tempDay + 60, 11, 30, 0);  // Setting dynamically, and we are adding 10 days to the current time
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();

let month = futureDate.getMonth();
month = months[month];  // use the months[] array you already set up, referencing the index
const date = futureDate.getDate();

const weekday = weekdays[futureDate.getDay()];  // use the weekday[] array you already set up, referencing the index

giveaway.textContent = `giveaway ends on ${weekday}, ${date} ${month} ${year} ${hours}:${minutes}am`;

// future time in ms
const futureTime = futureDate.getTime();

function getRemainingTime () {
  const today = new Date().getTime();   // use .getTime() for calculating milliseconds to figure out the time remaining
  const t = futureTime - today;         // futureTime - the current time in ms
// console.log(t);
// 1s = 1000 ms
// 1m = 60 sec
// 1hr = 60min
// 1 day = 24hr

// values in ms
  const oneDay = 24 * 60 * 60 * 1000;  // 86400000 ms
  const oneHour = 60 * 60 * 1000;  // 3600000 ms
  const oneMinute = 60 * 1000;  // 60000 ms

// calculate ALL values: days, hours, minutes, seconds - and use the javaScript modulo (%) operator
  let days = t / oneDay;
  days = Math.floor(days);  // Math.floor() will round the value DOWN to the nearest integer

  let hours = Math.floor ((t % oneDay) / oneHour);  // use the modulus (%) operator to only return the remainder
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

// create and set the values [] array;
  const values = [days, hours, minutes, seconds];

// format to add a zero to the beginning of each value - if the values are less than 10
  function format(item) {
    if(item < 10) {
      return item = `0${item}`;
    }
    return item;
  }
// after the counter reaches the deadline (expires), clear the coundown and provide a message back to the user
  items.forEach(function (item, index) {     // the function will optionally index the item value
    item.innerHTML = format(values[index]);  // indexes the values in the correct order: [days, hours, minutes, seconds]
  });
  if(t < 0) {
    clearInterval(countdown);
    deadline.innerHTML = `<h4 class="expired">sorry, this giveaway has expired</h4>`;
  }
}
// countdown 
let countdown = setInterval(getRemainingTime, 1000);  // call getRemainingTime() every second
getRemainingTime ();

// left off at vidio time: 5:30:14