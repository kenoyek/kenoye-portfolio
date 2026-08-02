export type ProjectMedia = {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
};

export const projectPreviewMedia: Record<string, ProjectMedia> = {
  asele: {
    src: "/images/projects/asele/asele-native-cycle-home.webp",
    alt: "Asele mobile app home screen showing the user's current luteal phase, next period date, and logging actions.",
    caption: "Approved native mobile screenshot of Asele's cycle and wellness home screen.",
    width: 591,
    height: 1280,
  },
  teacheasy: {
    src: "/images/projects/teacheasy/teacheasy-public-home-desktop.webp",
    alt: "TeachEasy public homepage introducing the tutoring academy management platform.",
    caption: "Public website introducing TeachEasy's tutoring academy management platform.",
    width: 720,
    height: 900,
  },
  reframe: {
    src: "/images/projects/reframe/reframe-native-feed.webp",
    alt: "Reframe mobile app feed showing a community post card with image, likes, comments, sharing, and navigation.",
    caption: "Approved native mobile screenshot of Reframe's community feed experience.",
    width: 540,
    height: 1170,
  },
};
