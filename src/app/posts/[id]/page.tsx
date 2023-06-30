import { getPostData, getAllPostIds } from '../../../services/posts'
import Link from 'next/link'
import Layout from '../../layout'
import Date from '../../../components/date'

export default async function Post({ params }: { params: {id: string} }) {
    const postData = await getPostData(params.id);
    
    return (
        <Layout>
            <div>
                {postData.title}
                <br />
                {postData.id}
                <br />
                <Date dateString={postData.date} />
                <br />
                <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
                <br />
            </div>
            <Link href="/">Back</Link>
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
      title: postData.title,
    };
}