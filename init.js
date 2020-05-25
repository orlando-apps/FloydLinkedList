$(document).ready(function() {
  var lineInput = $('#line');
  var loopInput = $('#loop');
  var radiusInput = $('#radius');
  var $form = $('form')
  var meetingPoint;

  $form.on('submit', function(event) {
    event.preventDefault();
     $('.wrapper').empty();
    var nodeName = $(this).data('node');
    let line = parseInt(lineInput.val())
    let loop = parseInt(loopInput.val())
    let sum = line + loop;
    let loopStart;

    var list = new LinkedList;
    for (let i = 0; i < sum; i++){
      if( i < line ){
        list.addNode (i, false, false)
      }else if ( i === (sum -1) ) {
        list.setLoop(i, loopStart)
      } else {
        if( i === line ) {
          loopStart = list.addNode(i, true, true);
        }else {
          list.addNode(i, false, true);
        }
      }
    }

    var currentNode = list.head;
    var radius = loop*10
    var spacing  = 360 / loop
    var rotation = 0
    let timeOn = 0;
    let timeOff = 0
    let loopL = 1000
    let loopT = 300
    let gap = 40;
    let circleSize = 20
    let lineL = loopL -line*circleSize*2 - line*gap*2 - gap
    var l;
    var t;
    var top = 350
    var left = 200

    while( currentNode ){
      $('.wrapper').append(currentNode.$node);
    if(currentNode.loopInside === false){
        currentNode.setPosition( top, left)
        left += circleSize + gap
     }else {
        l = -Math.cos(rotation * Math.PI / 180) * radius - circleSize;
        t = -Math.sin(rotation * Math.PI / 180) * radius - circleSize;
        currentNode.setPosition(t + top +circleSize, l+left + radius + circleSize)

        if ( currentNode.end === true){
          break;
        }
        rotation += spacing;
      }
      timeOn += 500
      currentNode = currentNode.next;
    }

    timeOn = 0
    let hare = list.head;
    let turtle = list.head

    while (hare.next || hare.next.next){
      turtle.step(timeOn, "#FF0000")
      hare.step(timeOn, "#74A2CE");
      turtle = turtle.next
      hare = hare.next.next;
      if (turtle.value === hare.value){
        meetingPoint = turtle;
        turtle.step(timeOn + 800,  "#FF0000", true );
        timeOn += 3000
        break;
      }
      timeOn += 800
    }

    let snail = list.head;
    while (turtle){
      snail.step(timeOn,"#FF0000")
      turtle.step(timeOn, "#FF0000")
      turtle = turtle.next;
      snail = snail.next;
      if (turtle.value === snail.value){
        turtle.step(timeOn + 500,  "#FF0000", true );
        break;
      }
      timeOn += 800
    }
  });
});
