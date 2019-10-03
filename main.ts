import { ScaleNavigator } from './lib/scale-navigator/control';
import './lib/scale-navigator/style.sass';

class Main {

    constructor() {
        let target = document.querySelector('#scale-navigator');
        new ScaleNavigator(target as HTMLElement);
    }
}

new Main();