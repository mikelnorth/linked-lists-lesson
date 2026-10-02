/* ============================================================================
   player.js  (FINISHED VERSION, including the stretch goals)
   ============================================================================ */


/* ---- Step 1: SongNode ---------------------------------------------------- */
class SongNode {
  constructor(title, artist) {
    this.title = title;
    this.artist = artist;
    this.next = null;   // the song after this one
    this.prev = null;   // the song before this one (this is what makes it "doubly")
  }
}


/* ---- Step 2: Playlist ---------------------------------------------------- */
class Playlist {
  constructor() {
    this.head = null;      // first song
    this.tail = null;      // last song. Keeping this makes addSong() instant.
    this.current = null;   // the song that is "playing"
    this.length = 0;
    this.repeat = false;   // stretch goal: wrap around like a circular list
  }

  /* ---- Step 3: addSong(title, artist): append to the END ---- */
  addSong(title, artist) {
    const song = new SongNode(title, artist);

    if (!this.head) {            // empty playlist: this song is everything
      this.head = song;
      this.tail = song;
      this.current = song;
    } else {
      song.prev = this.tail;     // 1. new song looks back at the old last song
      this.tail.next = song;     // 2. old last song looks forward at the new song
      this.tail = song;          // 3. the new song is now the end
    }

    this.length++;
    return song;
  }

  /* ---- Step 4: play() ---- */
  play() {
    return this.current;
  }

  /* ---- Step 5: next() ---- */
  next() {
    if (!this.current) return null;
    if (this.current.next) {
      this.current = this.current.next;
    } else if (this.repeat) {
      this.current = this.head;  // stretch: wrap around to the start
    }
    return this.current;         // at the end without repeat: stays put
  }

  /* ---- Step 6: previous() ---- */
  previous() {
    if (!this.current) return null;
    if (this.current.prev) {
      this.current = this.current.prev;
    } else if (this.repeat) {
      this.current = this.tail;  // stretch: wrap around to the end
    }
    return this.current;
  }

  /* ---- Step 7: playAll(callback): visit every song, head → tail ---- */
  playAll(callback) {
    let song = this.head;
    while (song) {
      callback(song);
      song = song.next;
    }
  }

  /* ---- Step 8 (stretch): removeCurrent() ---- */
  removeCurrent() {
    const song = this.current;
    if (!song) return null;

    // Re-wire the neighbours so they point past the removed song.
    if (song.prev) song.prev.next = song.next;
    else this.head = song.next;             // removing the first song: head moves forward

    if (song.next) song.next.prev = song.prev;
    else this.tail = song.prev;             // removing the last song: tail moves back

    // Move the needle to a neighbour (prefer the next song, like real players do).
    this.current = song.next || song.prev || null;

    song.next = null;                       // detach the removed node completely
    song.prev = null;
    this.length--;
    return song;
  }

  /* Handy for the console: playlist.titles() */
  titles() {
    const out = [];
    this.playAll(song => out.push(song.title));
    return out;
  }
}
