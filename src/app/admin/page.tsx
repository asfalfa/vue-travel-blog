import Link from "next/link";
import Layout from "../layout";

export default async function Admin() {

    return (
        <Layout>
            <ul className='w-2/3 mx-auto pt-[60px]'>
                <div className="flex flex-col">
                    <Link className="m-2 p-2 uppercase font-bold" href='/admin/posts/new'>Add Post</Link>
                    <Link className="m-2 p-2 uppercase font-bold" href='/admin/posts/edit'>Edit Posts</Link>
                </div>
                <hr />
                <div className="flex flex-col">
                    <Link className="m-2 p-2 uppercase font-bold" href='/admin/users/register'>User Register</Link>
                    <Link className="m-2 p-2 uppercase font-bold" href='/admin/users/login'>User Login</Link>
                </div>
            </ul>
        </Layout>
    )
}