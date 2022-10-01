const addbox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
const popuptitle = document.querySelector('header p')
const closeIcon = popupBox.querySelector("header i");
const titleTag = popupBox.querySelector("input");
const descTag = popupBox.querySelector("textarea");
const addbutton = popupBox.querySelector("button");
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Agust",
  "Spetember",
  "Noveber",
  "Deceber",
];
const notes = JSON.parse(localStorage.getItem("notes-list")) || [];
let isUpdate = false;
let updateId;
addbox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  isUpdate = false;
  popupBox.classList.remove("show");
  addbutton.innerHTML = 'Add note'
  popuptitle.innerHTML = 'Add a new note'
  titleTag.value = '';
  descTag.value = '';
});

function shownotes() {
  document.querySelectorAll(".note").forEach(li => li.remove());

      notes.forEach((note,id) => {
      let liTag = `      <li class="note">
      <div class="details">
        <p>${note.title}</p>
        <span
          >${note.description}</span
        >
      </div>
      <div class="bottom-content">
        <span>April 3, 2022</span>
        <div class="settings">
          <i onclick = 'showmenu(this)' class="ri-more-fill"></i>
          <ul class="menu">
            <li onclick = "editnote(${id} , '${note.title}' , '${note.description}')"><i class="ri-pencil-line"></i>Edit</li>
            <li onclick= 'deletenote(${id})'><i class="ri-delete-bin-7-line"></i>Delete</li>

          </ul>
        </div>
      </div>
    </li>`;
    addbox.insertAdjacentHTML("afterend", liTag);
  });
    
  
}
shownotes();

function showmenu(selectednote){
  let notemenu = selectednote.parentElement.lastElementChild
  notemenu.classList.add('active')
  document.addEventListener('click',(e)=>{
    if(e.target.tagName != "I" || e.target != selectednote){
      notemenu.classList.remove('active')
    }
  })
}
function deletenote(deleteId){
  let confirmsg = confirm("are you sure ?");
  if(! confirmsg) return;
  notes.splice(deleteId,1)
  shownotes()
  localStorage.setItem('notes-list', JSON.stringify(notes))
}
addbox.addEventListener('click',()=>{
  titleTag.focus();
  popupBox.classList.add('show')
})
function editnote(noteid,title,desc){
  updateId = noteid;
  isUpdate= true;
  addbox.click()
  titleTag.value = title;
  descTag.value = desc;
  addbutton.innerHTML = 'Update notes'
  popuptitle.innerHTML = 'Update notes'
  console.log(noteid,title,desc);
}


addbutton.addEventListener("click", (e) => {
  e.preventDefault();
  let noteTitle = titleTag.value;
  let notedesc = descTag.value;

  if (noteTitle || notedesc) {
    let d = new Date();
    let month = months[d.getMonth()];
    let daynumber = d.getDate();
    let year = d.getFullYear();

    let noteInfo = {
      title: noteTitle,
      description: notedesc,
      date: `${month} ${daynumber}, ${year}`,
    };
   if(!isUpdate){
    if(!notes){
      notes = []
    }
    notes.push(noteInfo);
    }else{
    isUpdate = false;
    notes[updateId] = noteInfo;
    }
    
    localStorage.setItem("notes-list", JSON.stringify(notes))
    closeIcon.click();
    shownotes();

  }
});
