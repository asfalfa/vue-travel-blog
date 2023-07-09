import { getPostData, getAllPostIds } from '../../../services/posts'
import Link from 'next/link'
import Layout from '../../layout'
import Date from '../../../components/date'
import Navbar from '../../../components/navbar/main';
import { Card, CardContent, CardFooter, CardHeader } from '../../../../@/components/ui/card';

export default async function Post({ params }: { params: {id: string} }) {
    const postData = await getPostData(params.id);
    const post = postData.data;

    return (
        <Layout>
            <Navbar />
            <Card className='mt-[51px] border-0 w-5/6 mx-auto'>
                <CardHeader className='overflow-hidden grid content-center h-[400px]'>
                  <img className='h-[500px] md:h-[800px] align-center w-full saturate-150' src={post.top_image_url} />
                </CardHeader>
                <CardContent className='my-4'>
                    <div className='grid justify-items-center pb-4'>
                        <small><Date dateString={post.date} /></small>
                        <p className='font-semibold text-xl'>{post.title}</p>
                    </div>
                    <div className='border-t border-b border-black py-4 text-justify' dangerouslySetInnerHTML={{ __html: post.content }} />
                </CardContent>
                <CardFooter className='grid justify-items-center mb-4'>
                    <Link href="/" className='rounded-b-sm px-5 hover:bg-neutral-300'>Back</Link>
                </CardFooter>
            </Card>
        </Layout>
    )
}

export async function generateStaticParams() {
    const posts = await getAllPostIds();
    
    return posts.map((post) => ({
        id: post.id,
    }))
}

export async function generateMetadata({ params }: { params: {id: string} }) {
    const postData = await getPostData(params.id);

    return {
      title: postData.data.title,
    };
}