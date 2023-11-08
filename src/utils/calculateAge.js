export function calculateAge(birthYear, birthMonth, birthDay) {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth() + 1; // Get the current month (0-based, so add 1)
  const currentDay = new Date().getDate();


  let years = currentYear - birthYear;
  let months = currentMonth - birthMonth;
  let days = currentDay - birthDay;


  if (years < 0) {
    return;
  }
  if (months < 0) {
    years--;
    months = 12 + months; // Adjust months to a positive value  
    }
  if (days < 0) {
    months--;
    days = 30 + days; // Adjust days to a positive value
  }
  return { years, months, days };
}
