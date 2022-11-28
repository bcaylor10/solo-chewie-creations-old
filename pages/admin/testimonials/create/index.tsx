import { TestimonialForm } from "@/components/AdminForms";

const CreateTestimonial = () => {

    const submit = (data: any) => {

    };

    return (
        <TestimonialForm 
            onSubmit={submit}
            loading={false}
            title="Create Testimonial"
        />
    )
};

export default CreateTestimonial;