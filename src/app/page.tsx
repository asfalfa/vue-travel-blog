import Link from 'next/link'
import { getSortedPostsData } from '../services/posts';
import Layout from './layout'
import Date from '../components/date'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle, 
} from '../../@/components/ui/card';

export default async function Home() {
  const data = await getSortedPostsData()
  
  return (
    <Layout>
      <ul className='my-5 grid grid-cols-2 gap-4 justify-items-center w-5/6 m-auto'>
          {data.map(({ id, date, title, timage, bimage }) => (
              <Card className='bg-neutral-200 hover:bg-white mb-5 rounded-full border-solid border-8 border-black w-5/6 hover:saturate-150'>
                <Link href={`/posts/${id}`} key={id}>
                <CardHeader className='rounded-t-full overflow-hidden grid content-center'>
                  <img className='h-[300px] align-center w-full' src={timage} />
                </CardHeader>
                <CardContent className='p-2 text-center'>
                  <CardDescription>
                    <small>
                      <Date dateString={date} /> | Category
                    </small>
                  </CardDescription>
                  <CardTitle className='font-semibold text-xl'>{title}</CardTitle>
                </CardContent>
                <CardFooter className='rounded-b-full overflow-hidden grid content-center'>
                  <img className='h-[300px] align-center w-full' src={bimage} />
                </CardFooter>
            </Link>
              </Card>
          ))}
      </ul>
    </Layout>
  );

}