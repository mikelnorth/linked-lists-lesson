/* visualize.js: draws a linked list as boxes and arrows.
   You do NOT need to edit this file. It is plain DOM code, read it if you're curious.

   It works with ANY list shaped like ours:
     - the list has a `head` (and optionally a `tail`)
     - each node has `next`, and a `value` (or `title`, or `data`) to display
     - if nodes also have `prev`, it draws two-way arrows (doubly linked)
     - if the chain loops back on itself, it shows that too (circular)

   API:
     LinkedListViz.renderList(container, list, { current })
     LinkedListViz.watch(container, () => list, () => ({ current }))  // auto re-render on change
*/
(function (global) {
  const MAX_NODES = 40;

  function collect(head) {
    const nodes = [];
    const seen = new Set();
    let node = head;
    let loopsTo = null;
    while (node && nodes.length < MAX_NODES) {
      if (seen.has(node)) { loopsTo = node; break; }
      seen.add(node);
      nodes.push(node);
      node = node.next;
    }
    return { nodes, loopsTo, truncated: Boolean(node) && !loopsTo };
  }

  function label(node) {
    if (node == null) return 'null';
    if (node.value !== undefined) return String(node.value);
    if (node.title !== undefined) return String(node.title);
    if (node.data !== undefined) return String(node.data);
    return '?';
  }

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function arrow(text, extraClass) {
    return el('div', 'viz-arrow' + (extraClass ? ' ' + extraClass : ''), text);
  }

  function renderList(container, list, opts) {
    opts = opts || {};
    container.innerHTML = '';
    const head = list && list.head;
    if (!head) {
      container.appendChild(el('div', 'viz-empty', 'head → null   (empty list)'));
      return;
    }

    const { nodes, loopsTo, truncated } = collect(head);
    const doubly = nodes.some(n => 'prev' in n);
    const row = el('div', 'viz-row');

    row.appendChild(el('div', 'viz-tag', 'head'));
    row.appendChild(arrow('→'));

    nodes.forEach((node, i) => {
      const box = el('div', 'viz-node');
      box.appendChild(el('span', 'viz-index', String(i)));
      if (doubly) box.appendChild(el('div', 'viz-cell viz-ptr', 'prev'));
      box.appendChild(el('div', 'viz-cell viz-value', label(node)));
      box.appendChild(el('div', 'viz-cell viz-ptr', 'next'));
      if (opts.current && opts.current === node) box.classList.add('is-current');
      if (opts.highlight && opts.highlight === node) box.classList.add('is-new');
      if (list.tail && list.tail === node) box.appendChild(el('span', 'viz-tag viz-tail', 'tail'));
      row.appendChild(box);
      if (i < nodes.length - 1) row.appendChild(arrow(doubly ? '⇄' : '→'));
    });

    if (loopsTo) {
      row.appendChild(arrow('↻ next → back to "' + label(loopsTo) + '"', 'loop'));
    } else if (truncated) {
      row.appendChild(arrow('→ … (more than ' + MAX_NODES + ' nodes)'));
    } else {
      row.appendChild(arrow('→'));
      row.appendChild(el('div', 'viz-null', 'null'));
    }
    container.appendChild(row);
  }

  // A cheap fingerprint of the list so we only redraw when something changed.
  function snapshot(list, opts) {
    const { nodes, loopsTo } = collect(list && list.head);
    const cur = opts && opts.current ? nodes.indexOf(opts.current) : -1;
    const tail = list && list.tail ? nodes.indexOf(list.tail) : -1;
    return nodes.map(label).join('\u0001') + '|' + (loopsTo ? 'loop' : '') + '|' + cur + '|' + tail;
  }

  function watch(container, getList, getOpts) {
    let last = null;
    function tick() {
      let list, opts;
      try { list = getList(); opts = getOpts ? getOpts() : {}; }
      catch (e) { return; }
      const s = snapshot(list, opts);
      if (s !== last) { last = s; renderList(container, list, opts); }
    }
    tick();
    return setInterval(tick, 200);
  }

  global.LinkedListViz = { renderList, watch };
})(window);
