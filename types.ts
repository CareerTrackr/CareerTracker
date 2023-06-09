/* eslint-disable @typescript-eslint/ban-types */
export interface ControllerFunctions {
  patchDatabase: Function;
  postDatabase: Function;
  getDatabase: Function;
}

export interface PageOptions {
  showApplications: boolean;
  showNotes: boolean;
  showNotifications: boolean;
  showSearchFilter: boolean;
  setShowApplications: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotes: React.Dispatch<React.SetStateAction<boolean>>;
  setShowNotifications: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSearchFilter: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface ShowHomepageOptions {
  setShowHomepage: React.Dispatch<React.SetStateAction<boolean>>;
}

export interface DarkMode {
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
  darkMode: boolean;
}

export interface RowData {
  [key: string]: string | number;
}

export interface NotesData {
  github: string;
  linkedin: string;
  email: string;
  portfolio: string;
  other: string;
  notes: string;
  coverLetter: string;
}

export interface IdCache {
  [key: string]: true;
}
