import { createSlice } from '@reduxjs/toolkit';

export type Song = {
  name: string;
  id: string;
  uri: string;
  duration_ms: number;
  position: number;
  album: {
    name: string;
    uri: string;
    id: string;
    images: { url: string; uri: string }[];
  };
  artists: { name: string; id: string; uri: string }[];
};

class SongQueue {
  public queue: Song[] = [];
  public previousQueue: Song[] = [];
  public currentSong: Song | null | undefined = null;

  public append(song: Song) {
    this.queue.push(song);
  }

  public removeSong(song: Song) {
    this.queue = this.queue.filter((s) => s.id !== song.id);

  }
  public dequeue() {
    const song = this.queue.shift();
    if (song) {
      this.previousQueue.push(this.currentSong!);

      this.currentSong = song;
    }
    return song;
  }
  public isPreviousEmpty(){
    return this.previousQueue.length === 0;
  }

  public playPrevious() {
    const song = this.previousQueue.pop();
    if (song) {
      this.queue.unshift(this.currentSong? this.currentSong : song);
      this.currentSong = song;
    }
    return song;
  }




  public peek() {
    return this.queue[0];
  }
  public isEmpty() {
    return this.queue.length === 0;
  }
  public makeQueue(queue: Song[], shuffle: boolean) {
    if (shuffle) {
      this.shuffle(queue);
    } else {  
    this.currentSong = queue[0];
    if(queue.length > 2)
      this.queue = queue.slice(1);
    }

  }
  public shuffle(queue: Song[]) {
    const randomIndex = Math.floor(Math.random() * queue.length);
    this.currentSong = queue[randomIndex];
    queue.splice(randomIndex, 1);
    this.queue = queue;
  }

  public overrideQueue(queue: Song[]) {
    this.queue = queue;
  }
  public playNext() {
    const song = this.queue.shift();
    if (song) {
      this.previousQueue.push(this.currentSong!);
      this.currentSong = song;
    }
    return song;
  }
  public playRandom() {
    const randomIndex = Math.floor(Math.random() * this.queue.length);
    const song = this.queue[randomIndex];
    this.queue.splice(randomIndex, 1);
    this.previousQueue.push(this.currentSong!);
    this.currentSong = song;
    return song;
  }
  

  public containsSong(uri:string){
    return this.queue.some(song => song.uri === uri)
  }

}

export interface PlayerState {
  playing: boolean;
  volume: number;
  shuffle: boolean;
  current_song: Song;
  previousSong: string;
  nextSong: string;
  queue: SongQueue;
}

const initialState: PlayerState = {
  playing: false,
  volume: 0.3,
  shuffle: false,
  current_song: {
    id: '',
    name: '',
    uri: '',
    duration_ms: 0,
    album: { name: '', id: '', images: [], uri: '' },
    position: 0,
    artists: [],
  },
  previousSong: '',
  nextSong: '',
  queue: new SongQueue(),
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
 
    playNext(state) {
      // if shuffle is on, play a random song from the queue
      if (state.shuffle) {
        const randomIndex = Math.floor(Math.random() * state.queue.queue.length);
        state.current_song = state.queue.queue[randomIndex];
        state.queue.queue.splice(randomIndex, 1);
      } else {
        state.current_song = state.queue.dequeue() || state.current_song;
      }

    },
    playPrevious(state) {
      state.current_song = state.queue.playPrevious() || state.current_song;
    },
    setShuffle(state,action) {
      state.shuffle = action.payload;

    },
    setSongPosition(state) {

    },

    seekToPosition(state, action) {
    },

    setPlaying(state, action) {
      state.playing = action.payload;
    },
    setDuration(state, action) {
      state.current_song.duration_ms = action.payload;
    },
    pause(state) {
  
    },
    resume(state) {
     
    },
    setPosition(state, action) {
      state.current_song.position = action.payload;
    },

    setCurrentSong(state, action) {
      state.current_song = { ...action.payload };
    },

    updateVolume(state, action) {
      state.volume = action.payload;
    },

    makeQueue(state, action) {
      state.queue.makeQueue(action.payload, state.shuffle);

    },
    overrideQueue(state, action) {
      state.queue.overrideQueue(action.payload);

    },
    addToQueue(state, action) {
      state.queue.append(action.payload);
    },
    removeFromQueue(state, action) {
      state.queue.removeSong(action.payload);
    },
  },
});

export const {
  setPlaying,
  overrideQueue,
  setCurrentSong,
  setDuration,
  pause,
  resume,
  setPosition,
  playNext,
  playPrevious,
  setShuffle,
  makeQueue,
  updateVolume,
  seekToPosition,
  addToQueue,
  removeFromQueue,
  setSongPosition,
  // clearQueue,
} = playerSlice.actions;
export default playerSlice.reducer;
