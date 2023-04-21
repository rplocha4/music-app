type ExternalUrls = {
  spotify: string;
};

type Followers = {
  href: string | null;
  total: number;
};

type Image = {
  height: number;
  url: string;
  width: number;
};

export type Artist = {
  external_urls: ExternalUrls;
  followers: Followers;
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  name: string;
  popularity: number;
  type: string;
  uri: string;
};
type Copyright = {
  text: string;
  type: 'C';
};
export type TrackItem = {
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
  album: Album;
};

export type Album = {
  album_group: string;
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  copyrights: Copyright[];
  external_ids: {
    upc: string;
  };
  external_urls: {
    spotify: string;
  };
  genres: string[];
  href: string;
  id: string;
  images: Image[];
  label: string;
  name: string;
  popularity: number;
  release_date: string;
  release_date_precision: 'year' | 'month' | 'day';
  total_tracks: string;
  tracks: {
    href: string;
    items: TrackItem[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
  type: 'album';
  uri: string;
};

export type Playlist = {
  name: string;
  description: string;
  images: [{ url: string }];
  owner: { display_name: string };
  tracks: { items: []; total: number };
  followers: { total: number };
  public: boolean;
  id: string;
};
