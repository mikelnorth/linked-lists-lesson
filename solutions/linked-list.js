/* ============================================================================
   linked-list.js  (FINISHED VERSION)
   Same steps as the starter, with the code filled in.
   ============================================================================ */


/* ---- Step 1: the Node ---------------------------------------------------- */
class Node {
  constructor(value) {
    this.value = value; // the data we store
    this.next = null;   // pointer to the next node. null means "nothing after me"
  }
}


/* ---- Step 2: the LinkedList ---------------------------------------------- */
class LinkedList {
  constructor() {
    this.head = null; // the only node the list remembers directly
    this.size = 0;
  }

  /* ---- Step 3: add(value): append to the END ---- */
  add(value) {
    const newNode = new Node(value);

    if (!this.head) {          // empty list: the new node IS the list
      this.head = newNode;
      this.size++;
      return this;
    }

    let current = this.head;   // start at the beginning...
    while (current.next) {     // ...and walk until the last node
      current = current.next;
    }
    current.next = newNode;    // hook the new node onto the end
    this.size++;
    return this;               // return this so calls can chain: list.add(1).add(2)
  }

  /* ---- Step 4: prepend(value): insert at the FRONT ---- */
  prepend(value) {
    const newNode = new Node(value);
    newNode.next = this.head;  // the new node points at the old first node
    this.head = newNode;       // and becomes the new first node
    this.size++;
    return this;
  }

  /* ---- Step 5: delete(value): remove the first node with this value ---- */
  delete(value) {
    if (!this.head) return false;             // nothing to delete

    if (this.head.value === value) {          // special case: the head is the match
      this.head = this.head.next;             // the list now starts one node later
      this.size--;
      return true;
    }

    let current = this.head;
    while (current.next && current.next.value !== value) {
      current = current.next;                 // stop at the node BEFORE the match
    }

    if (!current.next) return false;          // walked off the end: not found

    current.next = current.next.next;         // skip over the matched node
    this.size--;                              // nothing points at it now, so it is garbage collected
    return true;
  }

  /* ---- Step 6: traverse(callback): visit every node ---- */
  traverse(callback) {
    let current = this.head;
    let index = 0;
    while (current) {                         // stops when current becomes null
      callback(current.value, index);
      current = current.next;
      index++;
    }
  }

  /* ---- Step 7: search(value): first node with this value, or null ---- */
  search(value) {
    let current = this.head;
    while (current) {
      if (current.value === value) return current;
      current = current.next;
    }
    return null;
  }

  /* ---- Stretch goals ---- */

  toArray() {
    const values = [];
    this.traverse(value => values.push(value));
    return values;
  }

  indexOf(value) {
    let current = this.head;
    let index = 0;
    while (current) {
      if (current.value === value) return index;
      current = current.next;
      index++;
    }
    return -1;
  }

  insertAt(index, value) {
    if (index < 0 || index > this.size) throw new RangeError(`index ${index} is out of bounds`);
    if (index === 0) return this.prepend(value);

    const newNode = new Node(value);
    let current = this.head;
    for (let i = 0; i < index - 1; i++) {     // walk to the node BEFORE the slot
      current = current.next;
    }
    newNode.next = current.next;              // 1. new node points at what comes after
    current.next = newNode;                   // 2. previous node points at the new node
    this.size++;
    return this;
  }

  deleteAt(index) {
    if (index < 0 || index >= this.size) return null;

    let removed;
    if (index === 0) {
      removed = this.head;
      this.head = this.head.next;
    } else {
      let current = this.head;
      for (let i = 0; i < index - 1; i++) current = current.next;
      removed = current.next;
      current.next = removed.next;
    }
    this.size--;
    return removed.value;
  }

  reverse() {
    let previous = null;
    let current = this.head;
    while (current) {
      const nextNode = current.next;          // remember where we were going
      current.next = previous;                // flip the pointer backwards
      previous = current;                     // step both markers forward
      current = nextNode;
    }
    this.head = previous;                     // the old last node is the new head
    return this;
  }

  print() {
    console.log(this.toArray().join(' → ') + ' → null');
  }
}
