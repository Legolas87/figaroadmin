import moment from 'moment';

class DateUtil {
  static formatDate = (date: Date):string => moment(date).format('YYYY-MM-DD HH:mm:ss');

  static parse = (date: string) => moment(date, 'YYYY-MM-DD').toDate();

  static addHours = (date: Date, hours: number):Date => moment(date).add(hours, 'hours').toDate();
}

export default DateUtil;
