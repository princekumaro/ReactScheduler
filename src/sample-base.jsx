import * as React from 'react';
    import { enableRipple } from '@syncfusion/ej2-base';
enableRipple(false);

    export class SampleBase extends React.PureComponent {
        rendereComplete() {
            /**custom render complete function */
        }
        // componentDidMount() {
        //     setTimeout(() => {
        //         this.rendereComplete();
        //     });
        // }
    }
    export function updateSampleSection(){}
    