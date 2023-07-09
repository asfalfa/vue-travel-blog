import { parseISO, format } from 'date-fns';

export default function Date({ dateString }: { dateString: Date }) {
  let string = dateString.toString();
  const date = parseISO(string);
  return <time dateTime={string}>{format(date, 'LLLL d, yyyy')}</time>;
}
