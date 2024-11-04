import logo from './logo.svg';
import './App.css';
const mcal = require('myanmar-calendar');

function calculateAge(myanmarDate, phase) {
  // Split the Myanmar date input into day, month, and year, converting each to a number
  const [myanmarDay, myanmarMonth, myanmarYear] = myanmarDate.split('-').map(Number);

  // Determine the library readable day based on waxing or waning phase
  let actualDay;
  if (phase.toLowerCase() === 'waxing') {
    actualDay = myanmarDay; // For waxing phase, the day is taken as-is
  } else if (phase.toLowerCase() === 'waning') {
    actualDay = 15 + myanmarDay; // For waning phase, the day is offset by 15
  } else {
    throw new Error("Invalid phase. Use 'Waxing' or 'Waning'."); // Throw an error if phase is invalid
  }

  // Convert Myanmar month number to month name string if available in mcal.months.en
  const monthString = mcal.months.en[parseInt(myanmarMonth)] || myanmarMonth;

  // Format the Myanmar date string in a way compatible with mcal.toGregorian
  const formattedMyanmarDate = `${actualDay} ${monthString}, ${myanmarYear}`;

  // Convert the Myanmar date to Gregorian date using mcal.toGregorian
  const gregorianDate = mcal.toGregorian(formattedMyanmarDate);
  if (!gregorianDate) throw new Error("Invalid Myanmar date conversion."); // Check for valid conversion

  // Format the Gregorian date as day-month-year
  const day = gregorianDate.getDate()
  const month = gregorianDate.getMonth() + 1
  const year = gregorianDate.getFullYear()
  
  // Create a Date object for the birth date using Gregorian date
  const birthDate = new Date(year, month - 1, day); // Month index in JS Date is zero-based
  // Get today's date
  const today = new Date();

  // Calculate age based on the year difference between today and the birth date
  let age = today.getFullYear() - birthDate.getFullYear();

  // Check if the birthday has not occurred yet this year
  const isBeforeBirthdayThisYear =
    today.getMonth() < birthDate.getMonth() ||
    (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate());

  // If birthday hasn't happened yet this year, subtract one year from the age
  if (isBeforeBirthdayThisYear) {
    age--;
  }

  // Return the calculated age
  return age;
}


function App() {

  const age = calculateAge("10-1-1350", "waxing")

  return (
    <div className="App">
      <br />
      myanmarDate:______{"10-1-1350"}
      <br />
      gregorianEquivalent:______{age}
    </div>
  );
}

export default App;
