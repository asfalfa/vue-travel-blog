import { Card, CardContent } from '../../../../@/components/ui/card'
import Form from '../../../components/form'
import Navbar from '../../../components/navbar/main'
import Layout from '../../layout'

export default async function NewPost() {
  return (
    <Layout>
        <Navbar/>
        <Card className='border-0 h-screen w-2/3 mx-auto mt-[60px]'>
            <CardContent>
                <Form />
            </CardContent>
        </Card>
    </Layout>
  )
}