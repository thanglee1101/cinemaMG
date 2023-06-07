import React, { useEffect, useState } from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import axiosClient from '../../../api/axiosClient';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import './styles.scss';

function Statistic() {
  const [dataMovies, setDataMovies] = useState({ labels: [], datasets: [] });
  const [dataCineplexs, setDataCineplexs] = useState({ labels: [], datasets: [] });
  const [dataMonth, setDataMonth] = useState({ labels: [], datasets: [] });
 
 
  
  useEffect(() => {
    const fetchDataSetsMovies = async () => {
      const response = await axiosClient.get('/statistic/movies');
      setDataMovies(response);
    };
    fetchDataSetsMovies();
    const fetchDataSetsCineplexs = async () => {
      const response = await axiosClient.get('/statistic/cineplexs');
      setDataCineplexs(response);
    };
    fetchDataSetsCineplexs();
    const fetchDataSetsMonth = async () => {
      const response = await axiosClient.get('/statistic/month');
      setDataMonth(response);
    };
    fetchDataSetsMonth();
    return () => {
      setDataMovies([]);
      setDataCineplexs([]);
      setDataMonth([])
    };
  }, []);
  console.log(dataMovies);
  const options = {
    responsive: true,
    tooltips: {
      mode: 'index',
      intersect: true,
    },
    scales: {
      'left-y-axis': {
        position: 'left',
      },
      'right-y-axis': {
        position: 'right',
      },
    },
  };
  return (
    <div className="content">
      <Row>
        <Col>
          <h1 className="text-center">Thống kê</h1>
        </Col>
      </Row>
      <Row style={{height:"400px"}}>
        <Col>
          <Row className="mt-3">
            <Col>
              <h3 >Doanh thu theo phim</h3>
            </Col>
          </Row>
          <Bar data={dataMovies} options={options} />
        </Col>
        <Col>
          <Row className="mt-3">
            <Col>
              <h3 >Doanh thu theo rạp</h3>
            </Col>
          </Row>
          <Row style={{ paddingBottom: "50%" }}>
            <Col></Col>
            <Col>
              <Pie data={dataCineplexs} />
            </Col>
            <Col></Col>
          </Row>
        </Col>
      </Row>
      <Row>
        <Row className="mt-3">
          <Col>
            <h3 >Doanh thu theo Tháng</h3>
          </Col>
        </Row>
        <Col></Col>
        <Col>
          <Line data={dataMonth} />
        </Col>
        <Col></Col>
      </Row>
    </div>
  );

}

export default Statistic;
