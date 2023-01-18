const students = [
  "강승기",
  "김이준",
  "김진휘",
  "박상진",
  "서태웅",
  "신승민",
  "오윤호",
  "윤민준",
  "이준혁",
  "홍윤기",
  "홍준기",
  "황유찬",
  "강민서",
  "김민정",
  "김서진",
  "김소은",
  "김예슬",
  "어지은",
  "원예봄",
  "이시온",
  "이준이",
  "장하린",
  "정하윤",
  "하예린",
];
const roles = [
  "급식(밥)",
  "급식(국)",
  "급식(반찬1)",
  "급식(반찬2)",
  "급식(반찬3)",
  "검사",
  "교실 앞 쓸기",
  "교실 뒤 쓸기",
  "칠판 닦기",
  "칠판 앞 정리",
  "복도 쓸기",
  "계단 쓸기",
  "1분단 쓸기",
  "2분단 쓸기",
  "3분단 쓸기",
  "창틀(앞)",
  "창틀(뒤)",
  "신발장(앞)",
  "신발장(뒤)",
  "책장 정리",
  "쓰레기통 비우기(앞)",
  "쓰레기통 비우기(뒤)",
  "분리수거(기타)",
  "분리수거(종이)",
];

//누적
// const role = [
//   {
//     student: "강승기",
//     role: ["급식(밥)", "책장정리"],
//   },
// ];

const addRoleForm = document.getElementById("addRole-form");
const addRoleName = document.getElementById("addRoleName");
const addRoleRole = document.getElementById("addRoleRole");
const addRoleBtn = document.querySelector("#addRole-form button");

const roleList = document.getElementById("roleList");

const ROLE_KEY = "studentRole";

let newRole = [];

function pickRole() {
  for (let i = 0; i < students.length; i++) {
    newRole.push({
      student: students[i],
      role: roles[i],
    });
  }
  saveRole(newRole);
}

pickRole();

const savedRole = localStorage.getItem(ROLE_KEY);
if (savedRole !== null) {
  const parsedRole = JSON.parse(savedRole);
  newRole = parsedRole;
  parsedRole.forEach(paintRole);
}
function saveRole(newRole) {
  localStorage.setItem(ROLE_KEY, JSON.stringify(newRole));
}

function deleteRole(event) {
  const li = event.target;
  li.remove();
  newRole = newRole.filter((role) => role.student !== role.student);
  saveRole();
}

function paintRole(newRole) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.innerText = `${newRole.student} : ${newRole.role}`;
  li.appendChild(span);
  roleList.appendChild(li);
  li.addEventListener("click", deleteRole);
}

//입력한 내용을 보내는 함수
function handleRoleSubmit(event) {
  event.preventDefault();
  const newStudent = addRoleName.value;
  const newRoleName = addRoleRole.value;

  addRoleName.value = "";
  addRoleRole.value = "";

  const newRoleObj = {
    student: newStudent,
    role: newRoleName,
  };
  paintRole(newRoleObj);
  newRole.push(newRoleObj);
  saveRole();
}

//입력 이벤트 받기
addRoleForm.addEventListener("submit", handleRoleSubmit);
