const fs=require("fs");
fs.unlink('text.txt',(err)=>{
if (err)
    throw error;
    console.log("Dosya silindi")
})