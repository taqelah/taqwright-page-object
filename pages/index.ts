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

export type { LoginPage } from './login/LoginPage';
export type { HomePage } from './home/HomePage';
export type { SearchCataloguePage } from './search-catalogue/SearchCataloguePage';
export type { CartPage } from './cart/CartPage';

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
