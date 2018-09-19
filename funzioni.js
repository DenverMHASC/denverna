<!--
function MM_swapImgRestore() { //v3.0
  var i,x,a=document.MM_sr; for(i=0;a&&i<a.length&&(x=a[i])&&x.oSrc;i++) x.src=x.oSrc;
}

function MM_findObj(n, d) { //v4.01
  var p,i,x;  if(!d) d=document; if((p=n.indexOf("?"))>0&&parent.frames.length) {
    d=parent.frames[n.substring(p+1)].document; n=n.substring(0,p);}
  if(!(x=d[n])&&d.all) x=d.all[n]; for (i=0;!x&&i<d.forms.length;i++) x=d.forms[i][n];
  for(i=0;!x&&d.layers&&i<d.layers.length;i++) x=MM_findObj(n,d.layers[i].document);
  if(!x && d.getElementById) x=d.getElementById(n); return x;
}

function MM_swapImage() { //v3.0
  var i,j=0,x,a=MM_swapImage.arguments; document.MM_sr=new Array; for(i=0;i<(a.length-2);i+=3)
   if ((x=MM_findObj(a[i]))!=null){document.MM_sr[j++]=x; if(!x.oSrc) x.oSrc=x.src; x.src=a[i+2];}
}

function openWindow(url) {
  popupWin = window.open(url, 'remote',  'menubar,toolbar=no,location=no,directories=no,status=no,scrollbars=no,resizable=no,dependent,left=20,top=20')
}

function MM_openBrWindow(theURL,winName,features) { //v2.0
  window.open(theURL,winName,features);
}
function init() {
  if (!document.getElementById) return
  var imgOriginSrc;
  var imgTemp = new Array();
  var imgarr = document.getElementsByTagName('img');
  for (var i = 0; i < imgarr.length; i++) {
    if (imgarr[i].getAttribute('hsrc')) {
        imgTemp[i] = new Image();
        imgTemp[i].src = imgarr[i].getAttribute('hsrc');
        imgarr[i].onmouseover = function() {
            imgOriginSrc = this.getAttribute('src');
            this.setAttribute('src',this.getAttribute('hsrc'))
        }
        imgarr[i].onmouseout = function() {
            this.setAttribute('src',imgOriginSrc)
        }
    }
  }
}


function writeFlashObject(movie, qs, width, height)
{document.write(
'<OBJECT classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"\n'+
' codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=7,0,19,0"\n'+' WIDTH="' + width + '" HEIGHT="' + height + '">\n'+' <PARAM NAME=movie VALUE="' + movie + '">\n'+' <PARAM NAME=FlashVars VALUE="'+qs+'">\n'+' <PARAM NAME=quality VALUE=high>\n'+' <PARAM NAME=menu VALUE=false>\n'+' <PARAM name="wmode" VALUE="transparent">\n'+' <EMBED src="' + movie +'"\n'+' FlashVars="'+qs+'"\n'+' wmode="transparent" ' +' quality=high menu="false" WIDTH="' + width + '" HEIGHT="' + height +' TYPE="application/x-shockwave-flash"\n'+' PLUGINSPAGE="http://www.macromedia.com/go/getflashplayer"></EMBED>\n'+'</OBJECT>');}


onload=init;
//-->