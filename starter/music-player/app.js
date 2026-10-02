/* app.js: the user interface. You do NOT need to edit this file.
   It creates one Playlist, seeds it with songs, and wires the buttons to YOUR methods.
   `playlist` is on window so you can poke at it from the console. */
(function () {
  const $ = (id) => document.getElementById(id);
  const titleEl = $('songTitle'), artistEl = $('songArtist'), stateEl = $('playState');
  const nowPlaying = $('nowPlaying'), status = $('status'), logEl = $('log'), viz = $('viz');
  const buttons = ['prevBtn', 'playBtn', 'nextBtn', 'playAllBtn', 'removeBtn'].map($);

  const SEED = [
    ['Thinking Out Loud', 'Ed Sheeran'],
    ['Blinding Lights', 'The Weeknd'],
    ['Levitating', 'Dua Lipa'],
    ['Bohemian Rhapsody', 'Queen'],
    ['Hey Jude', 'The Beatles'],
  ];

  function log(msg) { logEl.textContent += msg + '\n'; logEl.scrollTop = logEl.scrollHeight; }
  function say(msg, kind) { status.textContent = msg; status.dataset.kind = kind || ''; }

  function showSong(song, state) {
    stateEl.textContent = state || 'Currently playing';
    titleEl.textContent = song ? song.title : '—';
    artistEl.textContent = song && song.artist ? 'by ' + song.artist : '';
    nowPlaying.classList.toggle('is-playing', state === 'Playing');
  }

  // A method is "ready" when the student has written it.
  function ready(name, step) {
    if (!window.playlist) {
      say('Step 2: define `class Playlist` in player.js, save, and refresh.', 'warn');
      return false;
    }
    if (typeof window.playlist[name] === 'function') return true;
    say(`Not implemented yet: ${name}(). That is Step ${step} in player.js.`, 'warn');
    return false;
  }

  // ---- Build the playlist ----
  if (typeof Playlist !== 'function') {
    say('Step 2: define `class Playlist` in player.js, save, and refresh.', 'warn');
    window.playlist = null;
  } else {
    window.playlist = new Playlist();
    if (typeof window.playlist.addSong === 'function') {
      try {
        SEED.forEach(([title, artist]) => window.playlist.addSong(title, artist));
        log(`Seeded ${SEED.length} songs with addSong().`);
        say('Ready. Press Play.', 'ok');
      } catch (err) {
        say('addSong() threw: ' + err.message, 'error');
        console.error(err);
      }
    } else {
      say('Step 3: write addSong(title, artist) so the playlist can be filled.', 'warn');
    }
  }

  LinkedListViz.watch(viz, () => window.playlist, () => ({ current: window.playlist && window.playlist.current }));
  if (window.playlist && window.playlist.current) showSong(window.playlist.current, 'Ready to play');

  // ---- Controls ----
  $('playBtn').addEventListener('click', () => {
    if (!ready('play', 4)) return;
    const song = window.playlist.play();
    if (!song) return say('Nothing to play. Add a song first.', 'warn');
    showSong(song, 'Playing');
    log(`play()      → "${song.title}"`);
    say(`Playing "${song.title}"`, 'ok');
  });

  $('nextBtn').addEventListener('click', () => {
    if (!ready('next', 5)) return;
    const before = window.playlist.current;
    const song = window.playlist.next();
    if (!song) return say('Nothing to play. Add a song first.', 'warn');
    showSong(song, 'Playing');
    log(`next()      → "${song.title}"`);
    if (song === before) say('Already at the last song. Turn on Repeat to wrap around.', 'warn');
    else say(`Moved forward to "${song.title}"`, 'ok');
  });

  $('prevBtn').addEventListener('click', () => {
    if (!ready('previous', 6)) return;
    const before = window.playlist.current;
    const song = window.playlist.previous();
    if (!song) return say('Nothing to play. Add a song first.', 'warn');
    showSong(song, 'Playing');
    log(`previous()  → "${song.title}"`);
    if (song === before) say('Already at the first song. Turn on Repeat to wrap around.', 'warn');
    else say(`Moved back to "${song.title}"`, 'ok');
  });

  $('playAllBtn').addEventListener('click', () => {
    if (!ready('playAll', 7)) return;
    const queue = [];
    window.playlist.playAll(song => queue.push(song));   // your traversal collects the songs
    if (!queue.length) return say('Playlist is empty.', 'warn');

    buttons.forEach(b => b.disabled = true);
    log(`playAll()   → ${queue.length} songs`);
    let i = 0;
    (function step() {
      if (i >= queue.length) {
        buttons.forEach(b => b.disabled = false);
        say('Play all finished.', 'ok');
        showSong(window.playlist.current, 'Finished. Currently on');
        return;
      }
      const song = queue[i++];
      window.playlist.current = song;        // the UI moves the needle as it plays each song
      showSong(song, `Playing ${i} of ${queue.length}`);
      log(`   ♪ "${song.title}"`);
      setTimeout(step, 800);
    })();
  });

  $('repeatToggle').addEventListener('change', (e) => {
    if (!window.playlist) return;
    window.playlist.repeat = e.target.checked;
    say(e.target.checked ? 'Repeat on: next() after the last song wraps to the first.' : 'Repeat off.', 'ok');
    log(`repeat = ${e.target.checked}`);
  });

  $('removeBtn').addEventListener('click', () => {
    if (!ready('removeCurrent', 8)) return;
    const removed = window.playlist.removeCurrent();
    if (!removed) return say('Nothing to remove.', 'warn');
    log(`removeCurrent() → removed "${removed.title}"`);
    showSong(window.playlist.current, window.playlist.current ? 'Currently playing' : 'Playlist empty');
    say(`Removed "${removed.title}"`, 'ok');
  });

  $('addForm').addEventListener('submit', (e) => {
    e.preventDefault();
    if (!ready('addSong', 3)) return;
    const title = $('newTitle').value.trim();
    const artist = $('newArtist').value.trim();
    if (!title) return;
    const song = window.playlist.addSong(title, artist);
    log(`addSong("${title}") → appended at the tail`);
    say(`Added "${title}" to the end of the playlist`, 'ok');
    if (!titleEl.textContent || titleEl.textContent === '—') showSong(window.playlist.current, 'Ready to play');
    e.target.reset();
    $('newTitle').focus();
    return song;
  });
})();
