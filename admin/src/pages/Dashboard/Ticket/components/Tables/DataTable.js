import ReactDatatable from '@ashvin27/react-datatable';
import { orderBy } from 'lodash';
import moment from 'moment';
import React from 'react';
import './styles.scss';

function DataTable(props) {
  const { tickets } = props;

  const columns = [
    {
      key: 'id',
      text: 'ID',
      sortable: true,
      cell: (ticket, index) => {
        return index + 1;
      },
    },
    {
      key: 'customer',
      text: 'Khách hàng',
      sortable: true,
      cell: (ticket) => {
        return ticket.Booking.User.fullname;
      },
    },
    {
      key: 'movie',
      text: 'Phim',
      sortable: true,
      cell: (ticket) => {
        return ticket.Booking.Showtime.Movie.title;
      },
    },
    {
      key: 'showtime',
      text: 'Lịch chiếu',
      sortable: true,
      cell: (ticket) => {
        return (
          <div>
            <p>{moment(ticket.Booking.Showtime.start_time).format('DD/MM/YYYY')}</p>
            <p>
              {moment(ticket.Booking.Showtime.start_time).format('HH:mm A')} -{' '}
              {moment(ticket.Booking.Showtime.end_time).format('HH:mm A')}
            </p>
          </div>
        );
      },
    },
    {
      key: 'cinema',
      text: 'Phòng',
      sortable: true,
      cell: (ticket) => {
        return ticket.Booking.Showtime.Cinema.name;
      },
    },
    {
      key: 'type',
      text: 'Loại',
      sortable: true,
      cell: (ticket) => {
        return ticket.Booking.Showtime.Cinema.CinemaType.name;
      },
    },
    {
      key: 'cineplex',
      text: 'Rạp',
      sortable: true,
      cell: (ticket) => {
        return ticket.Booking.Showtime.Cinema.Cineplex.name;
      },
    },
    {
      key: 'seat',
      text: 'Ghế',
      sortable: true,
      cell: (ticket) => {
        return ticket.seat_code;
      },
    },
    {
      key: 'price',
      text: 'Giá',
      sortable: true,
      cell: (ticket) => {
        return ticket.price.toLocaleString('it-IT', {
          style: 'currency',
          currency: 'VND',
        });
      },
    },
  ];

  const config = {
    page_size: 30,
    show_filter: false,
    show_length_menu: false,
    show_pagination: true,
    pagination: 'advance',
  };

  const onSort = (column, records, sortOrder) => {
    return orderBy(records, [column], [sortOrder]);
  };

  return (
    <>
      <ReactDatatable
        responsive
        hover
        config={config}
        records={tickets}
        columns={columns}
        onSort={onSort}
      />
    </>
  );
}

export default DataTable;
