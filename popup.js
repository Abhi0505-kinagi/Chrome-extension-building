// DOM elements
const linkInput = document.getElementById("link");
const descInput = document.getElementById("desc");
const saveBtn = document.getElementById("saveBtn");
const notesDiv = document.getElementById("notes");
const titInput=document.getElementById("heading");

// Load notes when page loads
document.addEventListener("DOMContentLoaded", loadNotes);

// Save note on button click
saveBtn.addEventListener("click", () => {
  const link = linkInput.value.trim();
  const desc = descInput.value.trim();
  const title=titInput.value.trim();

  if (!link) return alert("Please enter a link");

  let notes = JSON.parse(localStorage.getItem("notes")) || [];
  notes.push({ title,link, desc });
  localStorage.setItem("notes", JSON.stringify(notes));

  linkInput.value = "";
  descInput.value = "";
  titInput.value="";
  loadNotes();
});

// Load notes and render
function loadNotes() {
  const notes = JSON.parse(localStorage.getItem("notes")) || [];
  notesDiv.innerHTML = "";
  notes.forEach((note, index) => {
    const div = document.createElement("div");
    div.className = "note";
    div.innerHTML = `
      <a href="${note.link}" target="_blank" class="link">${note.title}</a>
      
      <p>${note.desc}</p>
      <button data-index="${index}" class="deleteBtn">Delete</button>
    `;
    notesDiv.appendChild(div);
  });

  // Delete functionality
  document.querySelectorAll(".deleteBtn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const index = e.target.getAttribute("data-index");
      let notes = JSON.parse(localStorage.getItem("notes")) || [];
      notes.splice(index, 1);
      localStorage.setItem("notes", JSON.stringify(notes));
      loadNotes();
    });
  });
}
