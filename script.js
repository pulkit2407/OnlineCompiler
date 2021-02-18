var e=ace.edit("jseditor");
e.getSession().setMode("ace/mode/python");
// e.setTheme("ace/theme/terminal")

document.getElementById("language").addEventListener("change",function(){    
    var lid=document.getElementById("language").value;
    var language;
    if(lid==0) language="python";
    else if(lid==4) language="javascript";
    else if(lid==7) language="C";
    else if(lid==77) language="C++";
    else if(lid==8)language="java";
    e.getSession().setMode("ace/mode/"+language);
});
var compile = document.getElementById("Compile");
compile.addEventListener("click", function()
{
    var langId = document.getElementById("language").value;
    var code = e.getValue();
    fetchData(code,langId);
});

function fetchData(code,langId){
    var request=new XMLHttpRequest();
    request.open("POST","https://codequotient.com/api/executeCode");
    var obj=JSON.stringify({code, langId});
    request.setRequestHeader("Content-Type","application/json");
    request.send(obj);

     request.addEventListener("load", function(event)
    {
        var key = JSON.parse(event.currentTarget.responseText);
        if(key.codeId!=null)
            output1(key.codeId);
            
    });
}

function output1(codeId){
    var text=document.getElementById("output");
        var request=new XMLHttpRequest();
        request.open("GET","https://codequotient.com/api/codeResult/"+codeId);
        request.send();
        request.addEventListener("load", function(event)
        {
             var output = JSON.parse(request.responseText).data;
             output = JSON.parse(output);
             var status = output.status;
             if(status=="Pending") output1(codeId);
             else if(output.output!="")
                text.innerHTML = output.output;
            else
                text.innerHTML = "error: "+output.errors;
        });
}
