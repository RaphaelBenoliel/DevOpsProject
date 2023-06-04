document.getElementById('registerForm').addEventListener('submit', handleSubmit);

async function handleSubmit(event) {
  console.log('Here');
  const StudentModel = require('./models/StudentModel');
  event.preventDefault();

  const grade1 = Number(document.getElementById('grade1').value);
  const grade2 = Number(document.getElementById('grade2').value);
  const grade3 = Number(document.getElementById('grade3').value);

  if (grade1 < 0 || grade1 > 100 || grade2 < 0 || grade2 > 100 || grade3 < 0 || grade3 > 100) {
    alert('Please enter valid grades between 0 and 100.');
    return;
  }

  try {
    const student = new StudentModel({
      name: document.getElementById('name').value,
      grade1,
      grade2,
      grade3
    });
    console.log('Here');
    await student.save();
    console.log('Student saved successfully!');
    alert('Student registered successfully!');
  } catch (error) {
    console.error(error);
    alert('Error occurred while saving student data.');
  }

  document.getElementById('registerForm').reset();
}
