var folderOpened = 0;
function updateTime(){
  var date = new Date();
  let minutes = date.getMinutes();
  if(minutes<10) minutes="0"+minutes
  document.getElementsByClassName('time')[0].innerHTML = date.getHours()+":"+minutes;

}
updateTime();
setInterval(updateTime, 3000);

function openApp(e){
  if(folderOpened==1) return;
    var app = e.currentTarget;
    console.log(typeof e);
    var app_bounding_rect = app.getBoundingClientRect(),
        c_bounding_rect = document.querySelector(".app-container").getBoundingClientRect(),
  			translateX =  app_bounding_rect.left + 'px',
  			translateY =  app_bounding_rect.top + 'px',
  			scaleX = app_bounding_rect.width / c_bounding_rect.width,
  			scaleY = app_bounding_rect.height / c_bounding_rect.height,
        app_transform = "translate3d("+ translateX +","+ translateY+",0) scale("+ scaleX +", "+ scaleY +")";
    document.querySelector(".app-container").style.transform = app_transform
    document.body.offsetWidth;
    document.body.classList.add("app-open");
  	document.querySelector(".app-container").style.transform = "translate3d(0,0,0) scale(1)";
    let className = app.getAttribute("data-app");
    document.querySelector(".app-container-body").innerHTML = document.querySelector(".app-"+className).innerHTML;
    document.querySelector(".app-container-wrap").classList.add("app-"+className);
}

var appSeparate =document.getElementsByClassName('app');
for (var i = 0; i < appSeparate.length; i++) {
  appSeparate[i].setAttribute("data-app",i+1);

  if(appSeparate[i].classList.contains("link")) appSeparate[i].addEventListener('click',function(e){window.open(e.currentTarget.getAttribute('data-link'))});
  else appSeparate[i].addEventListener('click',openApp);
}



function closeFolder(){
    document.getElementsByClassName("folder")[0].children[2].style.opacity=1;
    document.getElementById("folderClicked").style.opacity = 0;

    window.setTimeout(function(){
      document.getElementById("folderClicked").style.display = "none";
      let apps = document.getElementsByClassName('apps')[0];
      apps.style.display = 'block';
    },600);

    document.body.removeAttribute('id');
    document.getElementsByClassName('onOpen')[0].setAttribute('id','hiddenText');

    document.documentElement.style.setProperty('--folder-name', 'none');

    var appSeparate =document.getElementsByClassName('app');
    for (var i = 0; i < appSeparate.length; i++) {
      appSeparate[i].style.filter = "blur(0px)";
    }
}

document.getElementsByClassName('folder')[0].addEventListener('click',function(e){
  var folder = e.currentTarget;

  folder.children[2].style.opacity=0;
    folderOpened=1;

  document.body.setAttribute('id','blurredBody');

  document.documentElement.style.setProperty('--folder-name', 'inline-block');

  var appSeparate =document.getElementsByClassName('app');
  for (var i = 0; i < appSeparate.length; i++) {
    appSeparate[i].style.filter = "blur(2px)";
  }
  document.getElementById("folderClicked").style.display = "block";

  window.setTimeout(function(){
   document.getElementById("folderClicked").style.opacity = 1;
  },0);
})

document.onclick = function(e){
    if(e.target.className=="apps" && folderOpened==1){
      folderOpened=0;
      closeFolder();
    }
}
function closeApp(e){
    document.body.offsetWidth;
    document.body.classList.remove("app-open");
    document.querySelector(".app-container").style.transform = "translate3d(0,0,0) scale(0)";
    document.querySelector(".app-container-body").innerHTML = "";
    document.querySelector(".app-container-wrap").className = "app-container-wrap";
}
// document.querySelector(".close-app").addEventListener("click",)

function openProj(e){
  if(!e) e = window.event;
  folderOpened=0;
  closeFolder();
  console.log(e);
  openApp(e);
}
