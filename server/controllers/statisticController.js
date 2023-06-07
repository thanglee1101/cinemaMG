import { Movie, Cineplex, Cinema, Showtime, Booking, Ticket, sequelize } from '../models';
import { Op } from 'sequelize';
import moment from 'moment';

const getByCineplexs = async(req, res) => {
    try {
        const { from, to } = req.query;
        const cineplexs = await Cineplex.findAll({
            attributes: {
                include: [
                    [
                        sequelize.fn('COUNT', sequelize.col('"Cinemas.Showtimes.Bookings.Tickets"."id"')),
                        'ticket_number',
                    ],
                    [
                        sequelize.fn('SUM', sequelize.col('"Cinemas.Showtimes.Bookings.Tickets"."price"')),
                        'revenue',
                    ],
                ],
            },
            include: [{
                model: Cinema,
                attributes: [],
                include: [{
                    model: Showtime,
                    attributes: [],
                    include: [{
                        model: Booking,
                        attributes: [],
                        where: from && to ? {
                            createdAt: {
                                [Op.between]: [
                                    moment(from).format(),
                                    moment(to).add(1, 'day').subtract(1, 'seconds').format(),
                                ],
                            },
                        } : {},
                        include: [{ model: Ticket, attributes: [] }],
                    }, ],
                }, ],
            }, ],
            group: ['"Cineplex"."id"'],
        });

        let result = {
            labels: [],
            datasets: [{
                label: 'Doanh thu',
                yAxisID: 'right-y-axis',
                data: [],
                backgroundColor: [
                    'rgba(255, 99, 255,0.7)',
                    'rgba(54, 162, 255,0.7)',
                    'rgba(255, 206,255,0.7)',
                    'rgba(75, 192, 255,0.7)',
                    'rgba(153, 102, 255,0.7)',
                    'rgba(255, 159, 64,0.7)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)',
                ],
                borderWidth: 1,
            }, ],
        };

        if (cineplexs) {
            cineplexs.map((cineplex) => {
                result.labels.push(cineplex.name);
                // result.datasets[0].data.push(parseInt(cineplex.dataValues.ticket_number));
                cineplex.dataValues.revenue !== null ?
                    result.datasets[0].data.push(parseInt(cineplex.dataValues.revenue)) :
                    result.datasets[0].data.push(0);
            });
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send({ message: 'Invalid date value!' });
    }
};

const getByMovies = async(req, res) => {
    try {
        const { from, to } = req.query;
        const movies = await Movie.findAll({
            attributes: {
                include: [
                    [
                        sequelize.fn('COUNT', sequelize.col('"Showtimes.Bookings.Tickets"."id"')),
                        'ticket_number',
                    ],
                    [sequelize.fn('SUM', sequelize.col('"Showtimes.Bookings.Tickets"."price"')), 'revenue'],
                ],
            },
            include: [{
                model: Showtime,
                attributes: [],
                include: [{
                    model: Booking,
                    attributes: [],
                    where: from && to ? {
                        createdAt: {
                            [Op.between]: [
                                moment(from).format(),
                                moment(to).add(1, 'day').subtract(1, 'seconds').format(),
                            ],
                        },
                    } : {},
                    include: [{ model: Ticket, attributes: [] }],
                }, ],
            }, ],
            group: ['"Movie"."id"'],
        });

        let result = {
            labels: [],
            datasets: [{
                    label: 'Số vé',
                    yAxisID: 'left-y-axis',
                    data: [],
                    backgroundColor: '#FF00FF',
                },
                {
                    label: 'Doanh thu',
                    yAxisID: 'right-y-axis',
                    data: [],
                    backgroundColor: '#FF6347',
                },
            ],
        };

        if (movies) {
            movies.map((movie) => {
                result.labels.push(movie.title);
                result.datasets[0].data.push(parseInt(movie.dataValues.ticket_number));
                movie.dataValues.revenue !== null ?
                    result.datasets[1].data.push(parseInt(movie.dataValues.revenue)) :
                    result.datasets[1].data.push(0);
            });
            res.status(200).send(result);
        }
    } catch (error) {
        res.status(500).send({ message: 'Invalid date value!' });
    }
};
const getByMonth = async(req, res) => {
    try {
        const totals = await Booking.findAll({
            attributes: [
                [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM DATE_TRUNC(\'month\', "createdAt")')), 'month'],
                [sequelize.fn('SUM', sequelize.col('total')), 'totalSum'],
            ],
            group: [sequelize.fn('EXTRACT', sequelize.literal('MONTH FROM DATE_TRUNC(\'month\', "createdAt")'))],
            raw: true,
        });
        let result = {
            labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
            datasets: [{
                    label: 'Doanh thu',
                    data: [],
                    borderColor: 'rgb(255, 99, 132)',
                    backgroundColor: 'rgba(255, 99, 132, 0.5)',
                }

            ],
        };
        if (totals) {
            totals.map((total) => {
                total.totalSum !== null ?
                    result.datasets[0].data.push(parseInt(total.totalSum)) :
                    result.datasets[0].data.push(0);
            })
        }
        res.status(200).send(result);
    } catch (error) {
        res.status(500).send({});
    }
}
export { getByCineplexs, getByMovies, getByMonth };