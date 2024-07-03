const chatinput=document.querySelector(".chat-input textarea");
const sendchatbtn=document.querySelector(".chat-input span");
const chatbox=document.querySelector(".chatbox");
let usermessage;
const API_KEY="secret key";
const createchatli= (message,classname)=>{
    const chatli=document.createElement("li");
    chatli.classList.add("chat",classname);
    let chatcontent= classname ==="outgoing" ? `<p></p>` : ` <span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatli.innerHTML=chatcontent;
    chatli.querySelector("p").textContent=message;
    return chatli;
}
const generateresponse=(incomingchatli)=>{
    const API_URL="https://api.openai.com/v1/chat/completions";
    const messageelement=incomingchatli.querySelector("p");
    const requestoptions={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body:JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
              { role: "user",
              content: usermessage
            }
          ]
        })
    }
    fetch(API_URL,requestoptions).then(res=>res.json()).then(data=>{
        messageelement.textContent=data.choices[0].message.content;
    }).catch((error)=>{
        messageelement.textContent="oops!something went wrong.";
    }).finally(()=>chatbox.scrollTo(0,chatbox.scrollHeight));

}

const handlechat = () =>{
    usermessage=chatinput.value.trim();
    if(!usermessage) return;
    chatinput.value="";
    chatbox.appendChild(createchatli(usermessage,"outgoing"));
    chatbox.scrollTo(0,chatbox.scrollHeight);
    setTimeout(()=>{
        const incomingchatli=createchatli("Thinking...","incoming")
        chatbox.appendChild(incomingchatli);
        chatbox.scrollTo(0,chatbox.scrollHeight);
        generateresponse(incomingchatli);

    },600);
}

sendchatbtn.addEventListener("click",handlechat)
