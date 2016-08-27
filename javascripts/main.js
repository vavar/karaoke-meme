var Karaoke;
(function(obj){
  var canvas;
  var context;
  var x;
  var y;
  var txtMain = 'ยิ่งเธอส่งยิ้มคืนมา ยิ่งหวั่นไหว';
  var txtSub = 'YING-TER-SONG-YIM-KUEN-MA YING-WAN-WAI';
  var img;

  var mainFont = 'bold 56px Angsana New';
  var subFont = 'bold 28px Angsana New';
  var mainText;
  var subText;
  var mainFontSize;
  var subFontSize;
  var w = 40;
  
  function init(){

    mainText = document.getElementById('mainText');
    subText = document.getElementById('subText');
    canvas = document.getElementById('draw-pad');
    
    mainFontSize = document.getElementById('main-fontSize');
    subFontSize = document.getElementById('sub-fontSize');
    
    mainFontSize.addEventListener('change',function(e){ mainFont = 'bold ' + e.target.value +'px Angsana New'; refresh(); });
    subFontSize.addEventListener('change',function(e){ subFont = 'bold ' + e.target.value +'px Angsana New'; refresh(); });
    
    document.getElementById('bgImage').addEventListener('change', handleFiles);

    context = canvas.getContext('2d');
    context.imageSmoothingEnabled = true;

    mainText.value = txtMain;
    subText.value = txtSub;

    x = 30;
    y = canvas.height - 100;
    w = 10;

    drawText();
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
  }

  function clearText() {
    context.clearRect(0, 0, canvas.width, canvas.height);
  }

  function drawImage() {
    if (!img) {
      return;
    }
    canvas.width = img.width;
    canvas.height = img.height;
    context.drawImage(img, 0, 0 );
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
    context.strokeText(txtMain, x, y+30);
    context.fillText(txtMain, x, y+30);
    context.save();
    
    context.globalCompositeOperation = 'source-over';

    context.beginPath();
    // context.clearRect(x-10, y-50, 150, y);
    context.rect(x-10, y-50, 240, y+30);
    context.clip();

    context.strokeStyle = 'white';
    context.strokeText(txtMain, x, y+30);

    context.fillStyle = '#0231D3';
    context.fillText(txtMain, x, y+30);

    context.restore();

    // sub
    context.textBaseline = 'middle';
    context.lineWidth = 2;
    context.strokeStyle = 'black';
    context.fillStyle = '#D07439';
    context.font = subFont;
    context.textAlign = 'left';
        context.strokeText(txtSub, x, y+70);
    context.fillText(txtSub, x, y+70);

    context.save();
    
    context.beginPath();
    context.rect(x-10, y+50, 270, y+100);
    context.clip();

    context.strokeStyle = 'white';
    context.strokeText(txtSub, x, y+70);

    context.fillStyle = '#0231D3';
    context.fillText(txtSub, x, y+70);

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

  return obj;
})(Karaoke || (Karaoke = {}));




