const events=require("events");
const eventEmitter=new events.EventEmitter();
//Olay tanımlanır olay adı ve yapacağı işlem
eventEmitter.on("selamla",(isim)=>{
    console.log("merhaba ${isim}")
})

//Olay tetiklenir
const name="Mehmet";
eventEmitter.emit('selamla',name);



setTimeout(()=>{
    eventEmitter.emit('selamla',name);
},2000)

