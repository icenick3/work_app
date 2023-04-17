const showSignup = () => {
    document.querySelector(".rec-prism").style.transform = "translateZ(-100px) rotateY( -90deg)";
}

const showLogin = () =>  {
    document.querySelector(".rec-prism").style.transform = "translateZ(-100px)";
}

const showThankYou = () => {
    document.querySelector(".rec-prism").style.transform = "translateZ(-100px) rotateX( 90deg)";
}

export {showLogin, showSignup, showThankYou};