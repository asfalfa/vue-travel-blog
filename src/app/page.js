import Link from 'next/Link'
import { getSortedPostsData } from '../services/posts';
import Layout from './layout'
import Date from '../components/date'

export default async function Home() {
  const data = await getSortedPostsData()
  
  return (
    <Layout>
      <ul>
          {data.map(({ id, date, title }) => (
            <Link href={`/posts/${id}`} key={id}>
              <li className='hover:bg-sky-700 border-solid border-2 border-sky-500 mb-5 p-4 w-fit'>
                <div>
                  {title}
                  <br />
                  {id}
                  <br />
                  {date}
                  <br />
                </div>
                <div>
                  <small>
                    <Date dateString={date} />
                  </small>
                </div>
              </li>
            </Link>
          ))}
      </ul>
    </Layout>
  );

}