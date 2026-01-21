const addBtn = document.querySelector("#addBtn");
const container = document.querySelector("#container");

addBtn.addEventListener("click", addNote);

function addNote() {
 
    const note = document.createElement("div");
    note.classList.add("note");

    note.innerHTML = `
        <div class="tools">
            <i class="save fa-solid fa-save"></i>
            <i class="trash fa-solid fa-trash"></i>
        </div>
        <textarea></textarea>
    `;

    const save = note.querySelector(".save");
    const trash = note.querySelector(".trash");
    const textarea = note.querySelector("textarea");
    
    save.addEventListener("click",saveNotes);
    textarea.addEventListener("input",saveNotes);
    trash.addEventListener("click",() => {
        note.remove();
        saveNotes(); })
    
    container.appendChild(note);
    
}

function saveNotes(){

    const notes = document.querySelectorAll(".note textarea");
    const data = Array.from(notes).map(note => note.value);
    console.log(notes,data);

    if(data.length ===  0){
        localStorage.removeItem("notes");
    }
    else{
        localStorage.setItem("notes",JSON.stringify(data));
    }
}

function loadNotes(){

    const lsNotes = JSON.parse(localStorage.getItem("notes"));

    if(lsNotes !== null){
        lsNotes.forEach( noteText => {

            addNote();

            const notes = document.querySelectorAll(".note textarea");
            const lastNote = notes[notes.length -1];
            lastNote.value =  noteText;
            

        });
    }
    else{
        addNote();
    }
} 

loadNotes();