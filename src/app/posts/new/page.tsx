import { Card, CardContent } from '../../../../@/components/ui/card'
import Form from '../../../components/form'
import Layout from '../../layout'

export default async function NewPost() {
  return (
    <Layout>
        <Card className='border-0 h-screen w-2/3 mx-auto pt-[60px]'>
            <CardContent>
                <Form />
            </CardContent>
        </Card>
    </Layout>
  )
}