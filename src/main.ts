import { initEditorCustomizations } from './utils';
import styles from './styles.css?inline';

(function() {
    'use strict';

    GM_addStyle(styles);

    // Wait before trying to initialize to give the editor time to load
    setTimeout(initEditorCustomizations, 3000);
})();
