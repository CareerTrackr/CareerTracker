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

export interface DarkMode {
  setDarkMode: React.Dispatch<React.SetStateAction<string>>;
}