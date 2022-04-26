 var num = 0,
     len;
 var messageBox = document.getElementsByClassName("shower");
 len = messageBox.length;
 messageBox[num].style.display = 'block';

 function rolling() {
     num++;
     if (num >= len) num = 0;
     for (var i = 0; i < len; i++) {
         messageBox[i].style.display = 'none';
     }
     messageBox[num].style.display = 'block';
 }
 setInterval(rolling, 3000);