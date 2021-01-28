let type = "WebGL"
if(!PIXI.utils.isWebGLSupported()){
  type = "Canvas"
}

PIXI.utils.sayHello(type)

var renderers = {virus:{}}

renderers.virus.app = new PIXI.Application({ width:200, height:200, transparent:true, preserveDrawingBuffer: true, resolution:1 })
document.getElementById('virusDisplay').appendChild(renderers.virus.app.view)

renderers.virus.container = new PIXI.Container()
renderers.virus.app.stage.addChild(renderers.virus.container)

renderers.virus.image = PIXI.Sprite.from('https://zimek.tk/viruses/white.png')
renderers.virus.container.addChild(renderers.virus.image)

function render(x) {
    renderers[x].app.render(renderers[x].stage)
}

renderers.virus.save = () => {
    var img = renderers.virus.app.renderer.plugins.extract.image()
		var a = document.createElement('a');
		document.body.append(a);
		a.download = 'virus-' + renderers.virus.container.children[0].tint + '.png';
		a.href = img.src
		a.click();
		a.remove();
}

renderers.virus.changeColor = (color) => {
    renderers.virus.container.children[0].tint = parseInt('0x' + color.replace('#',''))
    render('virus')
    document.getElementById('virusColorText').innerText = color
}

renderers.virus.changeColor('#ff0000')
document.getElementById('virusColor').value = '#ff0000'

render('virus')
