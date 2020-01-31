let addMode = true;

function Student(studentID,fullname,DOB,sex,studentClass){
    this.studentID = studentID;
    this.fullname = fullname;
    this.DOB = DOB;
    this.sex = sex;
    this.studentClass = studentClass;
    this.showInList = function(){
        let str = "";
        str += "<td>"+this.studentID+"</td>";
        str += "<td>"+this.fullname+"</td>";
        str += "<td>"+this.DOB+"</td>";
        str += "<td>"+this.sex+"</td>";
        str += "<td>"+this.studentClass+"</td>";
        str += "<td> <a onclick=\"editStudent('" + this.studentID + "')\">Sửa</a> | " +
            "<a onclick=\"removeStudent('" + this.studentID + "')\">Xóa</a></td>";
        str = "<tr>"+ str +"</tr>";

        let tbody = document.getElementById("content").getElementsByTagName("tbody")[0];
        let newRow = tbody.insertRow();
        newRow.innerHTML = str;
        newRow.setAttribute("id",this.studentID);
    };
    this.update = function(fullname,DOB,sex,studentClass)
    {
        this.fullname = fullname;
        this.DOB = DOB;
        this.sex = sex;
        this.studentClass = studentClass;
    }
}
let studentList = new Array();

function openDialog() {
    document.getElementById("dialog").style.display = "block";
}
function closeDialog() {
    document.getElementById("dialog").style.display = "none";
    addMode = true;
}

function addStudent() {
    let id = document.getElementById("id").value;
    let fullname = document.getElementById("fullname").value;
    let DOB = document.getElementById("DOB").value;
    let studentSex = "";
    let sex = document.getElementsByName("sex");
     for(let i = 0; i < sex.length; i++){
         if(sex[i].checked){
             studentSex = sex[i].value;
         }
     }
    let studentClass = document.getElementById("class").value;
    if(addMode){
    let s = new Student(id,fullname,DOB,studentSex,studentClass);
    s.showInList();
    studentList.push(s);
    }
    else{
        let s;
        for(let i in studentList){
            if(studentList[i].studentID == id){
                s = studentList[i];
                break;
            }
        }
        s.update(fullname,DOB,studentSex,studentClass);
        refreshList();
    }
    closeDialog();
}


function removeStudent(studentID){
    document.getElementById(studentID).style.display = "none";
    // xóa một phần tử của mảng
    for(let i in studentList){
        if(studentList[i].studentID == studentID){
            studentList.splice(i,1); // xoa phan tu thu i  mot don vi
        }
    }
}

function editStudent(studentID){
    for(let i in studentList){
        if(studentList[i].studentID == studentID){
            document.getElementById("id").value = studentID;
            document.getElementById("fullname").value = studentList[i].fullname;
            document.getElementById("DOB").value = studentList[i].DOB;
           let sexes = document.getElementsByName("sex");
           for(let j in sexes){
               if(sexes[j].value == studentList[i].sex){
                   sexes[j].checked = true;
               }
               else{
                   sexes[j].checked = false;
               }
           }
            document.getElementById("class").value = studentList.studentClass;
           addMode = false;
           document.getElementById("dialog").style.display = "block";
           break;
        }
    }
}
function refreshList(){
    let tbody = document.getElementById("content").getElementsByTagName("tbody")[0];
    tbody.innerHTML = "";
    for(let i in studentList){
        studentList[i].showInList();
    }
}
function orderByFullname(){
    let len = studentList.length;
    for(let i = 0; i < len - 1; i++){
        for(let j = i + 1; j < len; j++){
            if(studentList[i].fullname > studentList[j].fullname){
                let temp = studentList[i];
                studentList[i] = studentList[j];
                studentList[j] = temp;
            }
        }
    }
    refreshList();
}

