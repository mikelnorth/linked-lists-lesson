/* app.js: wires the page buttons to YOUR LinkedList.
   You do NOT need to edit this file.

   It puts two things on `window` so you can use the console:
     list      the LinkedList the page is showing
     render()  redraw the picture now (it also redraws on its own every 200ms)
*/
(function () {
  const viz = document.getElementById('viz');
  const status = document.getElementById('status');
  const logEl = document.getElementById('log');
  const input = document.getElementById('value');

  // Which step of linked-list.js introduces each method (used in hints).
  const STEP = { add: 3, prepend: 4, delete: 5, traverse: 6, search: 7 };

  function log(msg) {
    logEl.textContent += msg + '\n';
    logEl.scrollTop = logEl.scrollHeight;
  }
  function say(msg, kind) {
    status.textContent = msg;
    status.dataset.kind = kind || '';
  }

  // "10" becomes the number 10 so that list.search(10) from the console matches.
  function parse(raw) {
    const text = raw.trim();
    if (text === '') return undefined;
    return /^-?\d+(\.\d+)?$/.test(text) ? Number(text) : text;
  }

  function makeList() {
    if (typeof LinkedList !== 'function') {
      say('Step 2: define `class LinkedList` in linked-list.js, save, and refresh.', 'warn');
      return null;
    }
    try {
      return new LinkedList();
    } catch (err) {
      say('new LinkedList() threw: ' + err.message, 'error');
      console.error(err);
      return null;
    }
  }

  function describe(result) {
    if (result === null) return 'null';
    if (result === undefined) return 'undefined';
    if (typeof LinkedList === 'function' && result instanceof LinkedList) return 'the list (chainable)';
    if (typeof result === 'object' && 'next' in result) {
      const next = result.next ? `Node { value: ${JSON.stringify(result.next.value)}, ... }` : 'null';
      return `Node { value: ${JSON.stringify(result.value)}, next: ${next} }`;
    }
    return JSON.stringify(result);
  }

  window.list = makeList();
  window.render = () => LinkedListViz.renderList(viz, window.list);
  // A node to highlight in the picture (search() sets this for a few seconds).
  let highlighted = null;
  let highlightTimer = null;
  function highlight(node) {
    highlighted = node;
    clearTimeout(highlightTimer);
    highlightTimer = setTimeout(() => { highlighted = null; }, 3000);
  }
  LinkedListViz.watch(viz, () => window.list, () => ({ current: highlighted }));

  if (window.list) {
    say('Ready. Type a value and press add, or use the console: list.add(5)', 'ok');
    if (typeof Node !== 'function' || Node === window.Node) {
      // window.Node is the browser's built-in DOM Node. If the student has not defined
      // their own `class Node`, `new Node(5)` will throw inside add().
      say('Step 1: define `class Node` in linked-list.js (the browser has a built-in Node, yours will shadow it).', 'warn');
    }
  }

  document.getElementById('controls').addEventListener('click', (event) => {
    const op = event.target.dataset.op;
    if (!op) return;

    if (op === 'reset') {
      window.list = makeList();
      logEl.textContent = '';
      if (window.list) say('New empty list.', 'ok');
      return;
    }

    const list = window.list;
    if (!list) return;

    if (typeof list[op] !== 'function') {
      say(`Not implemented yet: ${op}(). That is Step ${STEP[op]} in linked-list.js.`, 'warn');
      return;
    }

    const value = parse(input.value);
    if (op !== 'traverse' && value === undefined) {
      say('Type a value first.', 'warn');
      input.focus();
      return;
    }

    try {
      let call, result;
      if (op === 'traverse') {
        const visited = [];
        list.traverse((v, i) => visited.push(`${i}: ${JSON.stringify(v)}`));
        call = 'list.traverse(callback)';
        result = visited.length ? 'visited ' + visited.join(', ') : 'visited nothing (empty list)';
        log(`${call}  →  ${result}`);
        say(result, 'ok');
      } else {
        call = `list.${op}(${JSON.stringify(value)})`;
        result = list[op](value);
        log(`${call}  →  ${describe(result)}`);
        if (op === 'search' && result && typeof result === 'object') {
          highlight(result);
          let index = 0;
          for (let n = list.head; n && n !== result; n = n.next) index++;
          say(`${call} found the node at index ${index} (highlighted). Its next → ${result.next ? JSON.stringify(result.next.value) : 'null'}`, 'ok');
        } else {
          say(`${call} returned ${describe(result)}`, 'ok');
        }
      }
    } catch (err) {
      say(`${op}() threw: ${err.message}`, 'error');
      console.error(err);
    }
    input.select();
  });

  input.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      document.querySelector('[data-op="add"]').click();
    }
  });
})();
