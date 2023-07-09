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
import Navbar from '../components/navbar/main';

export default async function Home() {
  const data = await getSortedPostsData()

  return (
    <Layout>
      <Navbar />
      <ul className='mt-[60px] grid xl:grid-cols-2 xl:gap-4 justify-items-center md:w-5/6 m-auto'>
          {data.map(({ title, author_name, top_image_url, bottom_image_url, date, id }) => (
              <Card className='bg-neutral-200 hover:bg-white mb-5 rounded-full border-solid border-8 border-black w-5/6 hover:saturate-150'>
                <Link href={`/posts/${id}`} key={id}>
                <CardHeader className='rounded-t-full overflow-hidden grid content-center'>
                  <img className='h-[200px] md:h-[300px] align-center w-full' src={top_image_url} />
                </CardHeader>
                <CardContent className='p-2 text-center'>
                  <CardDescription>
                    <small>
                      <Date dateString={date} /> | Category
                    </small>
                  </CardDescription>
                  <CardTitle className='font-semibold text-xl'>{title}</CardTitle>
                  <CardDescription>
                    <small>
                      by {author_name}
                    </small>
                  </CardDescription>
                </CardContent>
                <CardFooter className='rounded-b-full overflow-hidden grid content-center'>
                  <img className='h-[200px] md:h-[300px] align-center w-full' src={bottom_image_url} />
                </CardFooter>
            </Link>
              </Card>
          ))}
      </ul>
    </Layout>
  );

}