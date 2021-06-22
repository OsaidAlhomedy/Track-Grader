'use strict';

let tableEl = document.getElementById('table');
let formEl = document.getElementById('form');
let headerArray = ['Student Name', 'Student Grade', 'Course', 'Status'];

Grades.array = [];

function Grades(studentName, course) {
  this.studentName = studentName;
  this.course = course;
  this.grade = this.randomGrades();
  this.pass = this.passDecide(this.grade);

  Grades.array.push(this);
}

getLocal();

formEl.addEventListener('submit', handleSub);

function handleSub(event) {
  event.preventDefault();

  let studentName = event.target.studentName.value;
  let course = event.target.courseSelect.value;

  let newGrade = new Grades(studentName, course);
  storeLocal();
  renderData();
}

function renderHeader() {
  let trEl = document.createElement('tr');
  tableEl.appendChild(trEl);
  for (let m = 0; m < headerArray.length; m++) {
    let thEl = document.createElement('th');
    thEl.textContent = headerArray[m];
    trEl.appendChild(thEl);
  }
}

renderHeader();

function renderData() {
  tableEl.textContent = '';
  renderHeader();

  for (let i = 0; i < Grades.array.length; i++) {
    let trEl = document.createElement('tr');
    tableEl.appendChild(trEl);

    let tdEl = document.createElement('td');
    trEl.appendChild(tdEl);
    tdEl.textContent = Grades.array[i].studentName;

    tdEl = document.createElement('td');
    tdEl.textContent = Grades.array[i].grade;
    trEl.appendChild(tdEl);

    tdEl = document.createElement('td');
    tdEl.textContent = Grades.array[i].course;
    trEl.appendChild(tdEl);

    tdEl = document.createElement('td');
    tdEl.textContent = Grades.array[i].pass;
    trEl.appendChild(tdEl);
  }
}

renderData();

Grades.prototype.randomGrades = function () {
  return Math.floor(Math.random() * (100 - 0 + 1)) + 0;
};

Grades.prototype.passDecide = function (grade) {
  let returnedGrade = null;

  if (grade < 50) {
    returnedGrade = 'Fail';
  } else if (grade >= 50) {
    returnedGrade = 'Pass';
  }

  return returnedGrade;
};


//Beyond this line is for LocalStoring and LocalGetting

function storeLocal() {
  localStorage.setItem('gradesArray', JSON.stringify(Grades.array));
}

function getLocal() {
  let newArray = JSON.parse(localStorage.getItem('gradesArray'));

  if (newArray) {
    Grades.array = newArray;
  }
}
