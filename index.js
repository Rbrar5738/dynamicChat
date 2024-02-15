var app=require("express")();
var http=require("http").Server(app);
const path=require("path");
var io=require("socket.io")(http);

const port=8000;

app.get("/",(req,res)=>
{
    var options={
        root:path.join(__dirname),
    };
    var fileName="index.html";
    res.sendFile(fileName,options);
});


io.on("connection",(socket)=>{
    console.log("User Connected");

    // socket.emit("myMessage","Welcome to Server");
    // socket.on("clientMessage",(data)=>{
    //     console.log(data);
    // });
    socket.on("disconnect",()=>{
        console.log("User Disconnecte");
    });

    
});

http.listen(port,()=>{
    console.log(`Server started at port ${port}`);
})