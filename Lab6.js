



function SetCookie(name, value, days) {

    let date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    let expires = "expires= " + date.toUTCString();

    // set the cookie. ";path=/" to make it available throughout the entire site
    document.cookie = name + "=" + value + ";" + expires + ";path=/";

}

function getCookie(name) {

    let cname = name + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(";");

    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();

        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(cname) === 0) {
            return c.substring(cname.length, c.length);
        }
    }
    return "";
}


function deleteCookie(name) {
    document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
}


let LikeCount = parseInt(getCookie("LikeCount")) || 0;
let DislikeCount = parseInt(getCookie("DislikeCount")) || 0;
let userChoice = getCookie("userChoice");
let comments = JSON.parse(getCookie("comments") || "[]");


document.querySelector("#LikeButton").textContent = LikeCount + " 👍";
document.querySelector("#DislikeButton").textContent = DislikeCount + " 👎";
comments.forEach(comment => displayCommentToUI(comment));




document.querySelector("#LikeButton").addEventListener('click', function () {

    if (!userChoice) {
        LikeCount++;
        SetCookie("LikeCount", LikeCount, 7);
        SetCookie("userChoice", "like", 7);
        userChoice = "like";
        document.querySelector("#LikeButton").textContent = LikeCount + " 👍";
    }else {
        alert("You habe already voted!!");
    }
});


document.querySelector("#DislikeButton").addEventListener('click', function () {
    if (!userChoice) {
        DislikeCount++;
        SetCookie("DislikeCount", DislikeCount, 7);
        SetCookie("userChoice", "dislike", 7);
        userChoice = "dislike";
        document.querySelector("#DislikeButton").textContent = DislikeCount + " 👎";
    }else {
        alert("You habe already voted!!");
    }
    
});   



document.querySelector("#SubmitButton").addEventListener('click', function () {

    let comment = document.querySelector("#Comment").value.trim();
    if(comment && !getCookie("commented")){
        comments.push(comment);
        SetCookie("comments", JSON.stringify(comments), 7);
        SetCookie("commented" , "true", 7);
        displayCommentToUI(comment);
        document.querySelector("#Comment").value = "";
    }else if(getCookie("commented")){
        alert("you have already commented!!");
    }
});



function displayCommentToUI(comment){
    
    let commentsList = document.querySelector("#commentsList");
    let li = document.createElement("li");
    li.textContent = comment;
    commentsList.appendChild(li);
}




document.querySelector("#resetButton").addEventListener('click' , function () {
    deleteCookie("LikeCount");
    deleteCookie("DislikeCount");
    deleteCookie("userChoice");
    deleteCookie("comments");
    deleteCookie("commented");

    LikeCount = 0;
    DislikeCount = 0;
    userChoice = null;
    comments = [];

    document.querySelector("#LikeButton").textContent = LikeCount  + " 👍";
    document.querySelector("#DislikeButton").textContent = DislikeCount + " 👎";
    document.querySelector("#commentsList").innerHTML = "";
});