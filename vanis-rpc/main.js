
if(!window.rpc){
  window.rpc = {
    enabled:true,
    vanisAppId:'743911345610686568'
  }

  window.rpc.data = {
      tagTrue:'on a Tag',
      tagFalse:'on No Tag',
      playing:'Playing %tag%',
      spectating:'Spectating %tag%',
      dead:'Dead',
      serverList:'%region% Server list',
      replay:"Watching a replay",
      afk:"AFK",
      server:'%server%',
      spectateAFK:"Spectating (AFK)",
      serverListState:'',
      replayState:'',
      time:true,
      loggedOut:'Login page',
      skinsPage:'%page%',
      vanis:{
        largeImageKey:'vanis'
      },
      skins:{
        largeImageKey:'skins',
        largeImageText:'Vanis.io Skins'
      },
  }

  window.rpc.getRPCdata = function() {
      switch (location.host) {
          case 'vanis.io':
              return JSON.stringify({
                  type: 'vanis',
                  data:window.rpc.data,
                  appID:window.rpc.vanisAppId,
                  connected: $(".vanis-list-item.active .server-name").text() !== "",
                  replay: $(".vanis-list-item.active").length < 1 && $(".stats > div").eq(3).css("display") !== 'none',
                  spectate: $(".stats > div").eq(2).css("display") === 'none' && $("#overlay").is(":hidden"),
                  score: $(".stats > div").eq(2).text().replace("Mass: ", ''),
                  afk: window.afk.afk,
                  region: $(".tabs .tab.active").text().replace(/\s/g, " ").replace("NEW", "").replace(/\s/g, ""),
                  tag: $("#teamtag").val() !== "",
                  server: ($(".tabs .tab.active").text().replace(/\s/g, " ").replace("NEW", "").replace(/\s/g, "") + " " + ($(".vanis-list-item.active .server-name").text() === '' ? 'Server list' : $(".vanis-list-item.active .server-name").text() + ` (${$(".vanis-list-item.active > div").eq(1).text()})`))
              })

              break
          case 'skins.vanis.io':
          return JSON.stringify({
              type: 'skins',
              data:window.rpc.data,
              appID:'744316433080778784',
              skinsPage:$(".menu-item.selected").text(),
              loggedOut:$(".login").is(':visible'),
              afk: window.afk.afk,
          })
      }
  }


  window.rpc.connection = new WebSocket("ws://127.0.0.1:2137");

  window.rpc.connection.onopen = function(){


if(window.rpc.enabled){

    window.rpc.interval = setInterval(function(){
      window.rpc.connection.send(window.rpc.getRPCdata())
    }, 15e3)

    window.rpc.connection.onclose = function(){
      clearInterval(window.rpc.interval)
    }
}

  }


  window.afk = {
    afk:false,
    lastMove:0,
  }

  window.afk.lastMoveTrigger = function() {
    window.afk.lastMove = 0
    window.afk.afk = false
  }

  window.afk.checkInterval = setInterval(function(){
    window.afk.lastMove += 5

    if(window.afk.lastMove > 60)
    window.afk.afk = true

  }, 5000)

  $("body").attr("onmousemove", "window.afk.lastMoveTrigger()")
}
