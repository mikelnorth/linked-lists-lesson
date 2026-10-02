/* ============================================================================
   player.js  (YOU write this file)

   The page (app.js) is already built. It expects a `Playlist` class with:

     addSong(title, artist)   add a song to the END of the playlist
     play()                   return the current song (a SongNode)
     next()                   move `current` forward one song and return it
     previous()               move `current` back one song and return it
     playAll(callback)        call callback(song) for every song, head → tail

   Stretch goals:
     repeat mode              when `this.repeat` is true, next() after the last
                              song wraps to the first (and previous() wraps to the last)
     removeCurrent()          unlink the current song and return it

   Stuck? The finished version is in ../../solutions/music-player/player.js
   ============================================================================ */


/* ---- Step 1: SongNode -------------------------------------------------------
   A doubly linked node: title, artist, next (null) AND prev (null).
*/

// TODO Step 1: class SongNode



/* ---- Step 2: Playlist -------------------------------------------------------
   constructor: head = null, tail = null, current = null, length = 0, repeat = false

   NEW IDEA: we keep a `tail` pointer. In the singly linked list, add() had to
   walk the whole chain to find the end. With a tail, appending is instant.
*/

// TODO Step 2: class Playlist with constructor
//
//   ---- Step 3: addSong(title, artist) ----
//     1. make a SongNode
//     2. empty? head = tail = current = the new song
//     3. otherwise, three pointer moves:
//          song.prev = this.tail       (new song looks back at the old last song)
//          this.tail.next = song       (old last song looks forward at the new song)
//          this.tail = song            (the new song is now the end)
//     4. length++, return the song
//
//   ---- Step 4: play() ----
//     return this.current
//
//   ---- Step 5: next() ----
//     if current has a next, move current to it. return current.
//
//   ---- Step 6: previous() ----
//     if current has a prev, move current to it. return current.
//
//   ---- Step 7: playAll(callback) ----
//     start at head, call callback(song), follow next until null
//
//   ---- Step 8 (stretch): repeat mode + removeCurrent() ----
//     next():     ...else if (this.repeat) current = head
//     previous(): ...else if (this.repeat) current = tail
//     removeCurrent(): re-wire the neighbours' pointers around the current song,
//                      fix head/tail if needed, move current to a neighbour
