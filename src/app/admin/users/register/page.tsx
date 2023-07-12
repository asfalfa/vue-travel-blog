import Layout from '../../../layout'
import { Card, CardContent } from '../../../../../@/components/ui/card';
import RegisterForm from './form';

export default async function Register() {

    return (
        <Layout>
            <Card className='border-0 h-screen w-2/3 mx-auto pt-[60px]'>
                <CardContent>
                    <RegisterForm />
                </CardContent>
            </Card>
        </Layout>
    )
}