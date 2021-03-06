/*
 * menu.js
 *
 * Biterest Key Collector
 * Copyright (c) 2018 All Rights Reserved by Biterest (https://biterest.com/)
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a copy
 *  of this software and associated documentation files (the "Software"), to deal
 *  in the Software without restriction, including without limitation the rights
 *  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 *  copies of the Software, and to permit persons to whom the Software is
 *  furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included in
 *  all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 *  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 *  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 *  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 *  THE SOFTWARE.
 */

import { Menu } from 'electron';
import { t } from 'c-3po'


export default class MenuBuilder {
  constructor(mainWindow) {
    this.mainWindow = mainWindow;
  }

  buildMenu() {
    if (process.env.NODE_ENV === 'development' || process.env.DEBUG_PROD === 'true') {
      this.setupDevelopmentEnvironment();
      return
    }
    if (process.env.NODE_ENV === 'production') {
        this.setupProdEnvironment();
        return
    }

    this.mainWindow.setMenu(null);
  }

  setupDevelopmentEnvironment() {
    this.mainWindow.openDevTools()
    this.mainWindow.webContents.on('context-menu', (e, { x, y }) => {
      Menu
        .buildFromTemplate([{
          label: 'Inspect element',
          click: () => this.mainWindow.inspectElement(x, y),
        }, {
            label: t`Paste`,
            role: 'paste',
        }, {
            label: t`Cut`,
            role: 'cut',
        }, {
            label: t`Copy`,
            role: 'copy',
        }])
        .popup(this.mainWindow)
    })
  }

    setupProdEnvironment() {
        this.mainWindow.webContents.on('context-menu', (e, { x, y }) => {
            Menu
                .buildFromTemplate([{
                    label: t`Paste`,
                    role: 'paste',
                }, {
                    label: t`Cut`,
                    role: 'cut',
                }, {
                    label: t`Copy`,
                    role: 'copy',
                }])
                .popup(this.mainWindow)
        })
    }

}
