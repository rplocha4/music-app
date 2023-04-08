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

class Node {
  prev: Node | null;
  next: Node | null;
  data: Song;

  constructor(data: Song) {
    this.prev = null;
    this.next = null;
    this.data = data;
  }
}

class DoublyLinkedList {
  head: Node | null;
  tail: Node | null;
  size: number;
  private previousSongs: Song[] = [];

  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  clear(): void {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  overrideQueue(songs: Song[]): void {
    this.clear();
    this.append(songs);
  }

  append(data: Song | Song[]) {
    if (Array.isArray(data)) {
      for (const item of data) {
        const newNode = new Node(item);

        if (this.size === 0) {
          this.head = newNode;
          this.tail = newNode;
        } else {
          newNode.prev = this.tail;
          this.tail!.next = newNode;
          this.tail = newNode;
        }

        this.size++;
      }
    } else {
      const newNode = new Node(data);

      if (this.size === 0) {
        this.head = newNode;
        this.tail = newNode;
      } else {
        newNode.prev = this.tail;
        this.tail!.next = newNode;
        this.tail = newNode;
      }

      this.size++;
    }
  }

  insertAt(data: Song, index: number) {
    if (index < 0 || index > this.size) {
      throw new Error('Index out of bounds');
    }

    const newNode = new Node(data);
    if (this.size === 0) {
      this.head = newNode;
      this.tail = newNode;
      this.size++;
      return;
    }

    if (index === 0) {
      newNode.next = this.head;
      this.head!.prev = newNode;
      this.head = newNode;
    } else if (index === this.size) {
      newNode.prev = this.tail;
      this.tail!.next = newNode;
      this.tail = newNode;
    } else {
      let current = this.head!;
      for (let i = 0; i < index; i++) {
        current = current.next!;
      }
      newNode.prev = current.prev;
      newNode.next = current;
      current.prev!.next = newNode;
      current.prev = newNode;
    }

    this.size++;
  }

  removeAt(index: number) {
    if (index < 0 || index >= this.size) {
      throw new Error('Index out of bounds');
    }

    let current = this.head!;

    if (this.size === 1) {
      this.head = null;
      this.tail = null;
    } else if (index === 0) {
      this.head = current.next;
      this.head!.prev = null;
    } else if (index === this.size - 1) {
      current = this.tail!;
      this.tail = current.prev;
      this.tail!.next = null;
    } else {
      for (let i = 0; i < index; i++) {
        current = current.next!;
      }
      current.prev!.next = current.next;
      current.next!.prev = current.prev;
    }

    this.size--;
    return current.data;
  }
  removeSong(uri: string): void {
    let current = this.head;
    while (current !== null) {
      if (current.data.uri === uri) {
        if (current.prev !== null) {
          current.prev.next = current.next;
        } else {
          this.head = current.next;
        }
        if (current.next !== null) {
          current.next.prev = current.prev;
        } else {
          this.tail = current.prev;
        }
        this.size--;
        return;
      }
      current = current.next;
    }
  }

  print() {
    let current = this.head;

    while (current !== null) {
      console.log(current.data);
      current = current.next;
    }
  }
  playNextSong(): Song | null {
    if (this.head === null) {
      console.log('queue is empty');
      return null;
    }

    if (this.head.next === null) {
      this.head = null;
      this.size = 0;
      return null;
    }
    this.previousSongs.push(this.head.data);
    console.log(this.head.data);

    this.head = this.head.next;
    const songToPlay = this.head.data;
    this.size--;
    return songToPlay;
  }

  playPreviousSong(): Song | null {
    if (this.previousSongs.length === 0) {
      return null;
    }
    const previousSong = this.previousSongs.pop();
    this.insertAt(previousSong!, 0);

    return previousSong!;
  }
  toArray(startNode: Node | null = null): Song[] {
    const result = [];
    let current = startNode !== null ? startNode : this.head;
    while (current !== null) {
      result.push(current.data);
      current = current.next;
    }
    return result;
  }
  containsSong(uri: string): boolean {
    let current = this.head;
    while (current !== null) {
      if (current.data.uri === uri) {
        return true;
      }
      current = current.next;
    }
    return false;
  }
  // toArray(): Song[] {
  //   const arr: Song[] = [];
  //   let currentNode = this.head;
  //   while (currentNode) {
  //     arr.push(currentNode.data);
  //     currentNode = currentNode.next;
  //   }
  //   return arr;
  // }
}

export interface PlayerState {
  playing: boolean;
  volume: number;
  shuffle: boolean;
  current_song: Song;
  previousSong: string;
  nextSong: string;
  queue: DoublyLinkedList;
}

const initialState: PlayerState = {
  playing: false,
  volume: 30,
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
  queue: new DoublyLinkedList(),
};

export const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
 
    playNext(state) {
      
    },
    playPrevious(state) {
      
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

    setQueue(state, action) {

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
  setCurrentSong,
  setDuration,
  pause,
  resume,
  setPosition,
  playNext,
  playPrevious,
  setShuffle,
  setQueue,
  updateVolume,
  seekToPosition,
  addToQueue,
  removeFromQueue,
  setSongPosition,
  // clearQueue,
} = playerSlice.actions;
export default playerSlice.reducer;
