// interfaces
import { INavItem } from "./nav-menu.types";

export const AuthenticatedNavItems: INavItem[] = [
  {
    id: 1,
    name: "Akcje",
    url: "/",
    isLink: true,
    isExact: true
  },
  {
    id: 2,
    name: "Mój profil",
    url: "/moj-profil",
    isLink: true,
    isExact: false
  },
  {
    id: 3,
    name: "Wyloguj",
    url: "",
    isLink: false,
    isExact: true
  },
];

export const UnauthenticatedNavItems: INavItem[] = [
  {
    id: 1,
    name: "Akcje",
    url: "/",
    isLink: true,
    isExact: true
  },
  {
    id: 2,
    name: "Logowanie",
    url: "/logowanie",
    isLink: true,
    isExact: true
  },
  {
    id: 3,
    name: "Rejestracja",
    url: "/rejestracja",
    isLink: true,
    isExact: true
  },
];