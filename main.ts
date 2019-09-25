import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ScaleNavigator } from './lib/scale-navigator/component';

import './lib/scale-navigator/style.sass';

class Main {

    constructor() {
        ReactDOM.render(
            React.createElement(ScaleNavigator, { map: undefined }, null),
            document.querySelector('body target')
        )
    }
}

new Main();