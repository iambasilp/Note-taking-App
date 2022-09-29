const addbox = document.querySelector(".add-box");
const popupBox = document.querySelector(".popup-box");
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

addbox.addEventListener("click", () => {
  popupBox.classList.add("show");
});

closeIcon.addEventListener("click", () => {
  popupBox.classList.remove("show");
});

function shownotes() {
    document.querySelectorAll('.note').forEach((note)=>{note.remove()})
  notes.forEach((note) => {
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
          <i class="ri-more-fill"></i>
          <ul class="menu">
            <li><i class="ri-pencil-line"></i>Edit</li>
            <li><i class="ri-delete-bin-7-line"></i>Delete</li>

          </ul>
        </div>
      </div>
    </li>`;
    addbox.insertAdjacentHTML("afterend", liTag);
  });
}
shownotes();

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
    notes.push(noteInfo);
    localStorage.setItem("notes-list", JSON.stringify(notes));
    closeIcon.click();
    shownotes();
  }
});
