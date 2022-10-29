// interfaces
import { INavItem } from "./nav-menu.types";

export const AuthenticatedNavItems: INavItem[] = [
  {
    id: 1,
    name: "Akcje",
    url: "/",
    isLink: true
  },
  {
    id: 2,
    name: "Mój profil",
    url: "/moj-profil",
    isLink: true
  },
  {
    id: 3,
    name: "Wyloguj",
    url: "",
    isLink: false
  },
];

export const UnauthenticatedNavItems: INavItem[] = [
  {
    id: 1,
    name: "Logowanie",
    url: "/logowanie",
    isLink: true
  },
  {
    id: 2,
    name: "Rejestracja",
    url: "/rejestracja",
    isLink: true
  },
];