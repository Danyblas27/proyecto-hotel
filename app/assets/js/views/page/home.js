import Services from "../../classes/Services.js";

document.addEventListener("DOMContentLoaded", async function(){
    
    const services = await Services.show();
    console.log(services)
});
