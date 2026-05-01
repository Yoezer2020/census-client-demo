/**
 * Assets Constants
 * Centralized location for all asset paths in the application
 */

export const ASSETS = {
  images: {
    chatBot: "/assets/images/ChatBot.jpg",
    background: "/assets/images/background.svg",
    headerText: "/assets/images/headertext.svg",
    birth: "/assets/images/birth.jpg",
    death: "/assets/images/death.jpg",
    cidIssuance: "/assets/images/cidissuance.jpeg",
    relationship: "/assets/images/relationship.jpg",
    moveInMoveOut: "/assets/images/moveinmoveout.jpg",
    naturalization: "/assets/images/naturalization&regularization.png",
    changeOfHoH: "/assets/images/changeofHoH.png",
    nationalityCertificate: "/assets/images/nationality-certificate.png",
    eye: "/assets/images/eye.jpeg",
  },
  icons: {
    left: "/assets/icons/left.svg",
    right: "/assets/icons/right.svg",
    ndi: "/assets/icons/ndi.svg",
    dorji: "/assets/icons/dorji.png",
  },
  logos: {
    left: "/assets/logos/left.png",
    right: "/assets/logos/right.png",
  },
} as const;

// Type for autocomplete support
export type AssetPath = typeof ASSETS;
