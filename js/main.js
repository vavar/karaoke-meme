var Karaoke;
(function(obj){
  var canvas;
  var context;
  var x;
  var y;
  var txtMain = 'ยิ่งเธอส่งยิ้มคืนมา ยิ่งหวั่นไหว';
  var txtSub = 'YING-TER-SONG-YIM-KUEN-MA YING-WAN-WAI';
  var img;
  var capImg;
  var mainFont = 'bold 56px Angsana New';
  var subFont = 'bold 28px Arial';
  var mainText;
  var subText;
  var mainFontSize;
  var subFontSize;
  var w = 40;
  var main = { 'x' : 140 , 'y' : 600,'w':200, 'size': 56};
  var sub = { 'x': 40, 'y':650, 'w':280,'size':28};
  var imgType = 'rect';
  var IMAGE_TYPE = { 'square':{ width: 720, height: 720},'rectH':{ width: 720, height: 480},'rectV':{ width: 480, height: 720}};
  
  function init(){

    mainText = document.getElementById('mainText');
    subText = document.getElementById('subText');
    canvas = document.getElementById('draw-pad');
    capImg = document.getElementById('capture-image');
    
    mainFontSize = document.getElementById('main-fontSize');
    subFontSize = document.getElementById('sub-fontSize');
    
    mainFontSize.value = main.size;
    subFontSize.value = sub.size;

    mainFontSize.addEventListener('change',function(e){ main['size'] = e.target.value; mainFont = 'bold ' + e.target.value +'px Angsana New'; refresh(); });
    subFontSize.addEventListener('change',function(e){ sub['size'] = e.target.value; subFont = 'bold ' + e.target.value +'px Arial'; refresh(); });
    
    document.getElementById('main-x').value = main.x;
    document.getElementById('main-y').value = main.y;
    document.getElementById('main-w').value = main.w;
    document.getElementById('sub-x').value = sub.x;
    document.getElementById('sub-y').value = sub.y;
    document.getElementById('sub-w').value = sub.w;

    document.getElementById('main-x').addEventListener('change',function(e){ main['x'] = e.target.value; refresh(); });
    document.getElementById('main-y').addEventListener('change',function(e){ main['y'] = e.target.value; refresh();});
    document.getElementById('main-w').addEventListener('change',function(e){ main['w'] = e.target.value; refresh();});
    
    document.getElementById('sub-x').addEventListener('change',function(e){ sub['x'] = e.target.value; refresh();});
    document.getElementById('sub-y').addEventListener('change',function(e){ sub['y'] = e.target.value; refresh();});
    document.getElementById('sub-w').addEventListener('change',function(e){ sub['w'] = e.target.value; refresh();});
    
    document.getElementById('bgImage').addEventListener('change', handleFiles);

    context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;

    mainText.value = txtMain;
    subText.value = txtSub;

    refresh();
  }

  function handleFiles(e) {

    if ( !e.target.files || e.target.files.length === 0 ) {
      return;
    }

    img = new Image();
    img.onload = function () {
      refresh();
    }
    img.src = URL.createObjectURL(e.target.files[0]);
  }

  function refresh() {
    clearText();
    drawImage();
    drawText();
    // save canvas image as data url (png format by default)
    var dataURL = canvas.toDataURL();
    capImg.src = dataURL;
  }

  function clearText() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawImage() {
    if (!img) {
      return;
    }
    context.drawImage(img, 0, 0 ,img.width,img.height,0,0,canvas.width,canvas.height);
    context.save();
  }

  function drawText() {
    
    // main
    context.textBaseline = 'middle';
    context.lineWidth = 6;
    context.strokeStyle = 'black';
    context.fillStyle = 'white';
    context.font = mainFont;
    context.textAlign = 'left';
    context.strokeText(txtMain, main['x'], main['y']);
    context.fillText(txtMain, main['x'], main['y']);
    context.save();

    context.beginPath();
    // context.clearRect(x-10, y-50, 150, y);
    context.rect(main['x'] - main['size'], main['y'] - main['size'], main['w'], main['y'] + main['size'] + main['size'] );
    context.clip();

    context.strokeStyle = 'white';
    context.strokeText(txtMain, main['x'], main['y']);

    context.fillStyle = '#0231D3';
    context.fillText(txtMain, main['x'], main['y']);

    context.restore();

    // sub
    context.textBaseline = 'middle';
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.fillStyle = '#D07439';
    context.font = subFont;
    context.textAlign = 'left';
    context.strokeText(txtSub, sub['x'], sub['y']);
    context.fillText(txtSub, sub['x'], sub['y']);

    context.save();
    
    context.beginPath();
    context.rect(sub['x'] -sub['size'], sub['y']-sub['size'], sub['w'], sub['y'] + sub['size'] + sub['size']);
    context.clip();

    context.strokeStyle = 'white';
    context.strokeText(txtSub, sub['x'], sub['y']);

    context.fillStyle = '#0231D3';
    context.fillText(txtSub, sub['x'], sub['y']);

    context.restore();
  }

  obj.init = init;
  obj.drawText = drawText;
  obj.onMainTextChange = function() {
    txtMain = mainText.value;
    refresh();
  };

  obj.onSubTextChange = function () {
    txtSub = subText.value.toUpperCase();
    refresh();
  };

  obj.selectSquareImage = function(){
    imgType = 'square';
    canvas.width = IMAGE_TYPE[imgType].width;
    canvas.height = IMAGE_TYPE[imgType].height;
    refresh();
  }

  obj.selectHorizontalRectImage = function(){
    imgType = 'rectH';
    canvas.width = IMAGE_TYPE[imgType].width;
    canvas.height = IMAGE_TYPE[imgType].height;
    refresh();
  }

  obj.selectVerticalRectImage = function(){
    imgType = 'rectV';
    canvas.width = IMAGE_TYPE[imgType].width;
    canvas.height = IMAGE_TYPE[imgType].height;
    refresh();
  }

  obj.init();
})(Karaoke || (Karaoke = {}));




