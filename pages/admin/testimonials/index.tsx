import { Table, Button } from "@mantine/core";
import { useRouter } from "next/router";

import { useGetTestimonials } from "@/queries/testimonials";
import Loader from "@/components/Loader";
import { ITestimonial } from "@/mongo/models/Testimonial";

const Testimonials = () => {
    const { data, isLoading } = useGetTestimonials();
    const router = useRouter();

    console.log(data?.data)

    return (
        <>
            <Button 
                onClick={() => router.push('/admin/testimonials/create')}
                color="green"
                style={{ marginBottom: '20px' }}
            >
                Create Testimonial
            </Button>
            <Loader loading={isLoading} />
            <Table highlightOnHover verticalSpacing="md">
                <thead>
                    <tr>
                        <th>Author</th>
                        <th>Rating</th>
                    </tr>
                </thead>
                <tbody>
                    {data?.data && data.data.map((d: ITestimonial, i: number) => {
                        const url = `/admin/testimonials/${d._id}`
                        return (
                            <tr 
                                onClick={() => router.push(url)} 
                                role="link" 
                                key={i} 
                                style={{ cursor: 'pointer' }}
                            >
                                <td>{d.author}</td>
                                <td>{d.rating}</td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </>
    )
};

export default Testimonials;