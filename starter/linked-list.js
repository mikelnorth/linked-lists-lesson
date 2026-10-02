/* ============================================================================
   linked-list.js  (YOU write this file)

   Follow the steps in order. After each step: save, refresh the page, and test
   with the buttons or in the console (list.add(10), list.search(10), ...).

   Stuck? The finished version is in ../solutions/linked-list.js
   ============================================================================ */


/* ---- Step 1: the Node ------------------------------------------------------
   A node holds a value and a pointer called `next`.
   `next` is null when the node is the last one in the chain.

   Test in the console:
     const a = new Node(1); const b = new Node(2); a.next = b; a
*/

// TODO Step 1: class Node



/* ---- Step 2: the LinkedList ------------------------------------------------
   The list remembers only where it starts: `head`.
   Everything else is reachable by following `next` pointers.
   Keep a `size` counter too.

   After this step the page should say: head → null (empty list)
*/

// TODO Step 2: class LinkedList with constructor
//
//   Put these methods INSIDE the class, one step at a time:
//
//   ---- Step 3: add(value)  -> append to the END ----
//     1. make a new Node
//     2. empty list? the new node becomes the head. done.
//     3. otherwise walk from head to the last node (the one whose .next is null)
//     4. point that node's .next at the new node
//     (return this, so you can chain: list.add(1).add(2))
//
//   ---- Step 4: prepend(value)  -> insert at the FRONT ----
//     no walking needed: newNode.next = this.head, then this.head = newNode
//
//   ---- Step 5: delete(value)  -> remove the FIRST node with this value ----
//     1. empty list? return false
//     2. is it the head? move head forward one node, return true
//     3. otherwise walk until current.next is the node to remove
//     4. skip over it:  current.next = current.next.next
//     return true if something was removed, false if not found
//
//   ---- Step 6: traverse(callback)  -> visit every node ----
//     start at head, call callback(value, index), follow next until null
//
//   ---- Step 7: search(value)  -> return the first node with this value, or null ----
//
//   ---- Stretch goals (if you finish early) ----
//     toArray()               -> [1, 2, 3]
//     indexOf(value)          -> position, or -1
//     insertAt(index, value)  -> insert in the middle
//     deleteAt(index)         -> remove by position
//     reverse()               -> flip all the next pointers (classic interview question)
