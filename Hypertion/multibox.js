var multiboxTab = true
function imMultiboxTab(){
  multiboxTab = false
  $(document).keydown(function(objEvent) {
      if (objEvent.keyCode == 9) {  //tab pressed
          objEvent.preventDefault(); // stops its action
      }
  })
  document.onkeyup = function(e) {
    if (e.which == 9) {
      e.preventDefault();
        $("body").trigger("focus")
        $("#multiboxtab").fadeOut(140)
      }
    }
  };


if(localStorage.getItem("hypertionID") == 69 && multiboxTab){ //testing multiboxing
  $("body").append(`<iframe frameBorder="0" id="multiboxtab" src="https://dev.vanis.io/" style="display:none;x-index:99999;top:0;left:0;position: absolute;width:100%;height:100%;"></iframe>`)
setTimeout(function(){
  if(multiboxTab){
  $(document).keydown(function(objEvent) {
      if (objEvent.keyCode == 9) {  //tab pressed
          objEvent.preventDefault(); // stops its action
      }
  })
  document.getElementById('multiboxtab').contentWindow.imMultiboxTab();
  document.onkeyup = function(e) {
    if (e.which == 9) {
      e.preventDefault();
      if($("#multiboxtab").css("display") === "none"){
        $("#multiboxtab").fadeIn(140)
        $("#multiboxtab").trigger("focus")
      } else {
        $("body").trigger("focus")
        $("#multiboxtab").fadeOut(140)
      }
    }
  };}
},2000)
}
