import React, { Component, ReactNode } from "react";
import axios from "axios";
import styles from "./Content.module.scss";
import EdiText from 'react-editext'

interface Article {
  id: number;
  title: string;
  description: string;
  body: string;
  author: string;
}

interface ArticleListState {
  isLoading: boolean;
  data?: Array<Article>;
  error?: { statusCode?: number; message?: string };
  perPage: number;
  page: number;
  pages: number;
}

export default class Content extends Component<unknown, ArticleListState> {
  handleClickPut(id: number, v:string) {
    console.log(id);
    console.log(v);
    axios.put(`http://localhost:3001/${id}`,{text: v});
    window.location.reload();
  }
  handleClickDelete(id: number) {
    console.log(id);
    axios.delete(`http://localhost:3001/${id}`);
    window.location.reload();
  }
  state: ArticleListState = {
    isLoading: true,
    perPage: 20,
    page: 0,
    pages: 0,
  };

  public componentDidMount(): void {
    axios.get("http://localhost:3001/").then(
      async (data) => {
        if (data) {
          console.log(data.data);
          //const newdata = await data.json();
          let newData = [data.data];
          const { perPage } = this.state;

          this.setState({
            isLoading: false,
            data: newData,
            pages: Math.floor(newData.length / perPage),
          });
        } else {
          this.setState({
            isLoading: false,
            error: {},
          });
        }
      },
      (error) => {
        this.setState({
          isLoading: false,
          error: {
            message: error.message,
          },
        });
      }
    );
  }

  public handlePageClick = (event: any) => {
    let page = event.selected;
    this.setState({ page });
  };

  public render(): ReactNode {
    return (
      <div className={styles.wrapper}>
        <div className={styles.titleWrapper}>
          <span>List of articles</span>
        </div>
        <div>{this.renderList()}</div>
      </div>
    );
  }

  renderList = (): ReactNode => {
    const { isLoading, data, error } = this.state;

    if (isLoading && data === undefined && error === undefined) {
      return this.renderListLoading();
    } else if (data) {
      return this.renderListData();
    } else if (error) {
      return this.renderListError();
    } else {
      // UNREACHABLE
      return this.renderListLoading();
    }
  };

  renderListLoading = (): ReactNode => {
    return (
      <div className={styles.infoWrapper}>
        <span className={styles.infoText}>Loading...</span>
      </div>
    );
  };

  renderListError = (): ReactNode => {
    const { error } = this.state;

    if (error && error.statusCode === 501) {
      return (
        <div className={styles.infoWrapper}>
          <span className={styles.infoText}>{error.message}</span>
          <span className={styles.descriptionText}>
            Your Mission: Fix this list so that it contains the top 20 fattest
            star wars characters!
          </span>
        </div>
      );
    }

    if (error && error.message === "Failed to fetch") {
      return (
        <div className={styles.infoWrapper}>
          <span className={styles.infoText}>
            Could not contact backend. Is your service up and running, or
            perhaps the code is broken?
          </span>
          <span className={styles.descriptionText}>
            Your Mission: Fix this list so that it contains the top 20 fattest
            star wars characters!
          </span>
        </div>
      );
    }

    if (error && error.statusCode) {
      return (
        <span className={styles.infoText}>
          {error.statusCode}: {error.message}
        </span>
      );
    } else {
      return <span className={styles.infoText}>{error?.message}</span>;
    }
  };

  renderListData = (): ReactNode => {
    console.log(this.state);
    const { page, perPage, pages, data } = this.state;
    let items = data!.slice(page * perPage, (page + 1) * perPage);
    console.log(items);
    let newItems: any = items[0];
    let articles =
      newItems.map((item: any) => {
        let { id, author, title, body, description } = item;
        return (
          <div style={{ border: "1px solid white", paddingBottom: "1.5em" }}>
            <td style={{ textAlign: "left" }} key={id}>
              <tr>
                <h3>Title: {title}</h3>
              </tr>
              <tr>
                <h4
                  style={{ marginBlockStart: "0.7em", marginBlockEnd: "0.7em" }}
                >
                  Author: {author}
                </h4>
              </tr>
              <tr>
                <h4
                  style={{ marginBlockStart: "0.7em", marginBlockEnd: "0.7em" }}
                >
                  Description: {description}
                </h4>
              </tr>
              <tr>
                <EdiText
                  type="text"
                  value={body}
                  onSave={v => this.handleClickPut(id,v)}
                />
              </tr>
            </td>
            <br />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              
              <button onClick={() => this.handleClickDelete(id)}>Delete</button>
            </div>
          </div>
        );
      }) || "";
    return (
      <>
        <table className="Table">
          <thead>
            <td></td>
          </thead>
          <tbody>{articles}</tbody>
        </table>
      </>
    );
  };
}
