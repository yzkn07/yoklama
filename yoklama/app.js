

import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Create a single supabase client for interacting with your database
const supabase = createClient('https://cooakmqsybltysqlnmlr.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNvb2FrbXFzeWJsdHlzcWxubWxyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTcxNTAyMDM0MCwiZXhwIjoyMDMwNTk2MzQwfQ.-xNjb8iZk7J7c3UP8gJOvdYaok6wLizruE01DjbHRus')


const studentForm = document.querySelector("#studentForm")
const firstName = document.querySelector("#firstName")
const lastName = document.querySelector("#lastName")
const classroomNo = document.querySelector("#classroomNo")

const studentsInfosList = document.querySelector(".studentsInfosList")



studentForm.addEventListener("submit",async (e)=>{
    e.preventDefault();
    studentsInfosList.innerHTML = "";
    
    // const formData = Object.fromEntries(new FormData(e.target))
    const formData = new FormData(e.target)
    const formObj = Object.fromEntries(formData)

    firstName.value = "";
    lastName.value = "";
    classroomNo.value = "";
    
    const { data, error } = await supabase
    .from('students_infos')
    .insert([
        { first_name: formObj.first_name, last_name: formObj.last_name , classroom_no: Number(formObj.classroom_no)},
    ])
    .select()
    
    getStudentsList()
    
    
})


// öğrencilerin bilgilerinin gösterilmesi 

async function getStudentsList() {
    let { data: students_infos, error: hata } = await supabase
    .from('students_infos')
    .select('*')
    
    
    students_infos.map((e) =>{
        const studentsInfos = document.createElement("li")
        studentsInfos.innerText = `${e.first_name + ` ` + e.last_name + ` ` +`sınıfı: ` + e.classroom_no}`
        studentsInfosList.appendChild(studentsInfos)
        
        const yoklamaForm = document.createElement("form")
        yoklamaForm.setAttribute("id", `${e.id}`);
        studentsInfos.appendChild(yoklamaForm)
        
        yoklamaForm.innerHTML = `
        <label for="var${e.id}">
        <input type="radio" name="yoklama" id="var${e.id}" required>
        var
        </label>
        <label for="yok${e.id}">
        <input type="radio" name="yoklama" id="yok${e.id}" required>
        yok
        </label>
        `
        
    })
    
}

// sayfa ilk açıldığında kayıtlı olan öğrenci listesini getir
window.addEventListener("load", getStudentsList())

// öğrencinin yoklama durumunu öğren
function yoklamaDurumu() {
    
}
yoklamaDurumu()
