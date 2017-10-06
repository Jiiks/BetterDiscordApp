/**
 * BetterDiscord Modal Component Template
 * Copyright (c) 2015-present Jiiks - https://jiiks.net
 * All rights reserved.
 * https://github.com/Jiiks/BetterDiscordApp - https://betterdiscord.net
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
*/

import * as React from 'react';
import { ReactComponent } from '../reactcomponent';
import { EButtonType, Button } from './';
import { IError } from '../../interfaces';

export class Modal extends ReactComponent<any, any> {

    private container: any;

    public bindings(): void {
        this.backDropClick = this.backDropClick.bind(this);
        this.unmount = this.unmount.bind(this);
    }

    public setInitialState(props: any): void {

    }

    public render() {
        const { modalProps, body } = this.props;

        return (
            <div ref={(node: any) => this.container = node} className='bd-modal-backdrop' onClick={this.backDropClick}>
                <div className='bd-modal'>
                    <div className='bd-modal-inner'>
                        <div className='bd-modal-title bd-white bd-weight-bold'>
                            <div className='bd-flex-row'>
                                <div className='bd-icon' style={{ margin: '2px 5px 0 0' }} />
                                <span>{modalProps.title || 'Something went wrong'}</span>
                                <Button zeroPadding={true} icon='close' onClick={this.unmount} type={EButtonType.none} />
                            </div>
                        </div>
                        <div className='bd-modal-body bd-white bd-flex-col bd-flex-grow'>
                            {modalProps.message}
                            {body}
                            {modalProps.errors && this.renderErrors}
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    private get renderErrors(): JSX.Element {

        const { modalProps } = this.props;

        return (
            <div className='bd-modal-errors bd-flex-col bd-flex-grow'>
                {modalProps.errors.map((error: IError, index: number) => this.renderError(error, index))}
                <div className='bd-flex-grow' />
                <div className='bd-modal-errorhint'>
                    Check console for more details (Ctrl + Shift + I)
                </div>
            </div>
        );
    }

    private renderError(error: IError, index: number): JSX.Element {
        return (
            <div key={index} className='bd-modal-error'>
                <div className='bd-modal-error-title'>{error.title}</div>
                <div className='bd-modal-error-reason'>{error.reason}</div>
            </div>
        );
    }

    private unmount(e: any): void {
        e.stopPropagation();
        this.props.backDropClick();
    }

    private backDropClick(e: any): void {
        if (e.target !== this.container) return;
        e.stopPropagation();
        this.props.backDropClick();
    }
}