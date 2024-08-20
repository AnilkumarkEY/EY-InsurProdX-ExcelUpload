import moment from 'moment';

const formatDate = (date, format) => {
    //return moment(date).startOf('hour').fromNow();
    if (format == 'display-date-Time')
        return `${moment(date).format('D/MM/YYYY')} ${moment(date).format('LT')}`;
    else if (format == 'form-date') {
        return moment(new Date(date)).format('YYYY-MM-DD');
    }
}

export { formatDate };
