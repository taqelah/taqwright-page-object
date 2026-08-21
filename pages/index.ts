import type { Mobile } from 'taqwright';

import type { LoginPage } from './login/LoginPage';
import { AndroidLoginPage } from './login/AndroidLoginPage';
import { IosLoginPage } from './login/IosLoginPage';

import type { HomePage } from './home/HomePage';
import { AndroidHomePage } from './home/AndroidHomePage';
import { IosHomePage } from './home/IosHomePage';

import type { SearchCataloguePage } from './search-catalogue/SearchCataloguePage';
import { AndroidSearchCataloguePage } from './search-catalogue/AndroidSearchCataloguePage';
import { IosSearchCataloguePage } from './search-catalogue/IosSearchCataloguePage';

import type { CartPage } from './cart/CartPage';
import { AndroidCartPage } from './cart/AndroidCartPage';
import { IosCartPage } from './cart/IosCartPage';

// New pages added for this flow
import type { SideMenuPage } from './side-menu/SideMenuPage';
import { AndroidSideMenuPage } from './side-menu/AndroidSideMenuPage';
import { IosSideMenuPage } from './side-menu/IosSideMenuPage';

import type { GesturesPage } from './gestures/GesturesPage';
import { AndroidGesturesPage } from './gestures/AndroidGesturesPage';
import { IosGesturesPage } from './gestures/IosGesturesPage';

export type { LoginPage } from './login/LoginPage';
export type { HomePage } from './home/HomePage';
export type { SearchCataloguePage } from './search-catalogue/SearchCataloguePage';
export type { CartPage } from './cart/CartPage';
export type { SideMenuPage } from './side-menu/SideMenuPage';
export type { GesturesPage } from './gestures/GesturesPage';

// One factory per screen: pick the platform's subclass from the running project's name
// ('android' | 'ios'). Specs only ever touch the abstract page types — the flow methods chain from
// one factory to the next (loginPage → homePage → searchCataloguePage → cartPage).
export function loginPage(mobile: Mobile, projectName: string): LoginPage {
  return projectName === 'ios'
    ? new IosLoginPage(mobile, projectName)
    : new AndroidLoginPage(mobile, projectName);
}

export function homePage(mobile: Mobile, projectName: string): HomePage {
  return projectName === 'ios'
    ? new IosHomePage(mobile, projectName)
    : new AndroidHomePage(mobile, projectName);
}

export function searchCataloguePage(mobile: Mobile, projectName: string): SearchCataloguePage {
  return projectName === 'ios'
    ? new IosSearchCataloguePage(mobile, projectName)
    : new AndroidSearchCataloguePage(mobile, projectName);
}

export function cartPage(mobile: Mobile, projectName: string): CartPage {
  return projectName === 'ios'
    ? new IosCartPage(mobile, projectName)
    : new AndroidCartPage(mobile, projectName);
}

// Factories for the new pages introduced for this flow
export function sideMenuPage(mobile: Mobile, projectName: string): SideMenuPage {
  return projectName === 'ios'
    ? new IosSideMenuPage(mobile, projectName)
    : new AndroidSideMenuPage(mobile, projectName);
}

export function gesturesPage(mobile: Mobile, projectName: string): GesturesPage {
  return projectName === 'ios'
    ? new IosGesturesPage(mobile, projectName)
    : new AndroidGesturesPage(mobile, projectName);
}
