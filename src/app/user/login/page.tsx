import Layout from '../../layout'
import Navbar from '../../../components/navbar/main';
import { Card, CardContent } from '../../../../@/components/ui/card';
import LoginForm from './login-form';

export default async function Login() {

    return (
        <Layout>
            <Navbar />
            <Card className='border-0 h-screen w-2/3 mx-auto mt-[60px]'>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </Layout>
    )
}