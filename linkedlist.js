class Node {
  constructor(value, start, inside, end){
    this.value = value || 0;
    this.next = null
    this.$node = $('<span class="dancer"></span>');
    this.top = 0;
    this.bottom = 0;
    this.start = start || false;
    this.loopInside = inside || false;
    this.end = end || false;
  }

  setPosition(top, left) {
    this.top = top;
    this.left = left;
    var styleSettings = {
      top: top,
      left: left
    };
    this.$node.css(styleSettings);
  };

  setColor(color){
    this.$node.css("border-color", color);
  }

  step (on, color, last) {
    let temp = this;
    this.$node.css("border-color", "#FFFFFF");
    setTimeout(function() {
      temp.$node.css("border-color", color);
      if (!last){
        setTimeout(function() {
          temp.$node.css("border-color", "#FFFFFF");
        }, 500);
       }
    }, on);
  };
}

class LinkedList {
  constructor (){
    this.head = null
    this.count = 0;
  }

  addNode ( value, start, inside ){
    let node = new Node(value, start, inside);
    if (this.head === null){
      this.head = node;
    }else {
      let currentNode = this.head;
      while ( currentNode.next ){
        currentNode = currentNode.next
      }
      currentNode.next = node;
    }
    this.count++;
    return node;
  }

  setLoop( value, start){
    let node = new Node(value, false, true, true);
    let currentNode = this.head;
    while ( currentNode.next ){
      currentNode = currentNode.next
    }
    currentNode.next = node;
    node.next = start;
  }

  removeNode( value ){
    if (this.head === null) { return null; }
    if (this.head.value === value){
      this.head = this.head.next;
      return;
    }
    if ( this.head.next ){
      let previous = this.getPrevious(value);
      previous.next = previous.next.next;
    }
  }

  getPrevious( value ){
    let previous;
    let currentNode = this.head;
    while ( currentNode.value !== value ){
      previous = currentNode;
      currentNode = currentNode.next
    }
    return previous
  }

  contains ( value ){
    let currentNode = this.head;
    while (currentNode){
      if( currentNode.value === value ){
        return true;
      }else {
        currentNode = currentNode.next
      }
    }
    return false;
  }
}