let rows = parseInt(prompt('Enter the number of rows in the theater'));
let columns = parseInt(prompt('Enter the number of columns in the theater'));

const theater = document.getElementById('theater');

const createTheater = () => {
  for (let i = 1; i <= rows; i++) {
    const row = document.createElement('div');
    row.classList.add('row');

    for (let j = 1; j <= columns; j++) {
      const seat = document.createElement('div');
      seat.id = `${i}-${j}`;
      seat.classList.add('seat');
      seat.textContent = `${i}-${j}`;
      row.appendChild(seat);
    }

    theater.appendChild(row);
  }
};

const markRandomBookedSeats = () => {
  for (let i = 1; i <= rows; i++) {
    for (let j = 1; j <= columns; j++) {
      const seat = document.getElementById(`${i}-${j}`);
      if (Math.random() < 0.3 && !seat.classList.contains('selected')) {
        seat.classList.add('taken');
      }
    }
  }
};

const promptForGroupSize = () => {
  let groupSize = parseInt(prompt(`Enter the number of people in the group (1-${columns})`), 10);

  while (isNaN(groupSize) || groupSize <= 0 || groupSize > columns) {
    groupSize = parseInt(prompt(`Please enter a valid number of people (1-${columns})`), 10);
  }

  return groupSize;
};

const selectSeats = groupSize => {
  for (let i = 1; i <= rows; i++) {
    let consecutiveSeats = 0;

    for (let j = 1; j <= columns; j++) {
      const seat = document.getElementById(`${i}-${j}`);

      if (!seat.classList.contains('taken') && !seat.classList.contains('selected')) {
        consecutiveSeats++;

        if (consecutiveSeats === groupSize) {
          for (let k = j - groupSize + 1; k <= j; k++) {
            const selectedSeat = document.getElementById(`${i}-${k}`);
            selectedSeat.classList.add('selected');
          }
          return;
        }
      } else {
        consecutiveSeats = 0;
      }
    }
  }

  console.log('No seats available for the group.');
};

createTheater();
markRandomBookedSeats();
const groupSize = promptForGroupSize();
selectSeats(groupSize);