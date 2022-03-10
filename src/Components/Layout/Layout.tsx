import React, { Component, ReactNode } from 'react';

import styles from './Layout.module.scss';

export default class Layout extends Component {
  public render(): ReactNode {
    const { children } = this.props;

    return (
      <div className={styles.wrapper}>
      
        <div className={styles.layout}>{children}</div>
      </div>
    );
  }
}