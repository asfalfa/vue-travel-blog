import Layout from '../../layout'
import { Card, CardContent } from '../../../../@/components/ui/card';
import LoginForm from './login-form';

export default async function Login() {

    return (
        <Layout>
            <Card className='border-0 h-screen w-2/3 mx-auto pt-[60px]'>
                <CardContent>
                    <LoginForm />
                </CardContent>
            </Card>
        </Layout>
    )
}