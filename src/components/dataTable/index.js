import React from 'react';
import './index.css';
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.locale(en)
const timeAgo = new TimeAgo('en-US')


class DataTable extends React.Component {
  constructor(props) {
    super(props);
  }

  buildHeaders(headers) {
    return headers.map((header) => {
      return (
        <th class="table-header-cell">
          {header.name}
        </th>
      )
    });
  }

  buildRows(headers, data) {
    if(typeof data == 'undefined') {
      return;
    }
    return data.map((row) => {
      return (
        <tr class="table-row">
          {headers.map((header) => {
            if(header.type =='copy') {
              return (
                <td class="table-row-cell">
                  {row[header.key_name]}
                  <button class="copy-icon"><i class="far fa-copy"></i></button>
                </td>
              )
            } else if (header.type =='time') {
              console.log(timeAgo.format(new Date(row[header.key_name])))
              return (
                <td class="table-row-cell">
                  {timeAgo.format(new Date(row[header.key_name]))}
                </td>
              )
            } else {
              return (
                <td class="table-row-cell">
                  {row[header.key_name]}
                </td>
              );
            }
          })}
        </tr>
      )
    });
  }

  buildFooter(pagination) {
    if(typeof pagination == 'undefined') {
      return;
    }

    return (
      <div class="row pagination footer-row">
          <div class="col-md-4 offset-md-8 ">
            <div class="row">
            <div class="col-md-6">
              <h6 class="footer-counter">{pagination.current_page}  of  {pagination.total_pages}</h6>
            </div>

            <div class="col-md-3">
              <a href="#  "
                className={"prev " + (pagination.current_page == 1 ? 'disabled': '')}
                onClick={pagination.onPrevClick}>
              ❮</a>
            </div>

            <div class="col-md-3">
              <a href="#"
                className={"next " + (pagination.current_page == pagination.total_pages ? 'disabled': '')}
                onClick={pagination.onNextClick}>
                ❯</a>
            </div>
          </div>
          </div>
        </div>
    );
  }

  renderTable(headers, data, pagination) {
    return (
      <table class="table data-table">
        <thead class="table-header">
            {this.buildHeaders(headers)}
        </thead>
        <tbody>
          {this.buildRows(headers, data)}
        </tbody>
      </table>
    );
  }

  render() {
    let data = this.props.data;
    let headers = this.props.headers;
    let pagination = this.props.pagination;

    return (
      <div>
        {this.renderTable(headers, data, pagination)}
        {this.buildFooter(pagination)}
      </div>
    );

  }
}

export default DataTable;
