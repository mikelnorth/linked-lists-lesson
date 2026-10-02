# Linked Lists: Day 15

Everything here is plain HTML, CSS and JavaScript. No install, no build step.

## Students: how to follow along

1. Open `starter/index.html` in your browser (double-click it, or use the VS Code
   *Live Server* extension so the page refreshes on save).
2. Open `starter/linked-list.js` in your editor. That is the only file you edit in part 1.
3. Follow the numbered steps in the comments. After each step: save, refresh, test with the
   buttons on the page or in the DevTools console (`list.add(10)`, `list.search(10)`).
4. For the music player exercise, open `starter/music-player/index.html` and edit
   `starter/music-player/player.js`.

If you get stuck, the finished code is in `solutions/`.

## What is where

```
starter/
  index.html        follow-along page: playground buttons + live picture of the list
  linked-list.js    YOU write this (Node, LinkedList, add, prepend, delete, traverse, search)
  app.js            wires the buttons to your class (no need to edit)
  visualize.js      draws the boxes and arrows (no need to edit)
  music-player/
    index.html      the music player UI
    player.js       YOU write this (SongNode, Playlist: addSong, play, next, previous, playAll)
    app.js          wires the buttons to your Playlist (no need to edit)
solutions/          the same files, finished, plus stretch goals
teacher/notes.html  teacher-only notes, timeline and live-coding script
```

## Steps at a glance

Part 1, singly linked list (`linked-list.js`):

| Step | What you write | How to test |
| --- | --- | --- |
| 1 | `class Node` with `value` and `next` | console: `const a = new Node(1)` |
| 2 | `class LinkedList` with `head` and `size` | page shows `head → null` |
| 3 | `add(value)` append to the end | add 10, 20, 30 and watch the chain grow |
| 4 | `prepend(value)` insert at the front | prepend 5 |
| 5 | `delete(value)` | delete the head, a middle node, a missing value |
| 6 | `traverse(callback)` | press traverse |
| 7 | `search(value)` | search for 20, then 99 |

Part 2, doubly linked list (`music-player/player.js`):

| Step | What you write |
| --- | --- |
| 1 | `class SongNode` with `title`, `artist`, `next`, `prev` |
| 2 | `class Playlist` with `head`, `tail`, `current`, `length`, `repeat` |
| 3 | `addSong(title, artist)` append using the tail pointer |
| 4 | `play()` |
| 5 | `next()` |
| 6 | `previous()` |
| 7 | `playAll(callback)` |
| 8 | stretch: repeat mode (circular behaviour) and `removeCurrent()` |
