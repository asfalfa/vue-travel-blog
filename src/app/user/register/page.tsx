import Layout from '../../layout'
import Navbar from '../../../components/navbar/main';
import { Card, CardContent } from '../../../../@/components/ui/card';
import RegisterForm from './register-form';

export default async function Register() {

    return (
        <Layout>
            <Navbar />
            <Card className='border-0 h-screen w-2/3 mx-auto mt-[60px]'>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </Layout>
    )
}