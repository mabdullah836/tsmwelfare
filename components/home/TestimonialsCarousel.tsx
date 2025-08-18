import { ReusableCarousel } from "@/components/shared/carousel";

const testimonials = [
  {
    name: "Ahmed Khan",
    role: "Father of 3",
    message:
      "My daughter was very sick and I had no money for the doctor. The health department helped us get free treatment. Now she's healthy and going to school again.",
    image: "/placeholder.svg?height=80&width=80&text=Ahmed",
  },
  {
    name: "Fatima Bibi",
    role: "Widow with 4 children",
    message:
      "After my husband died, I didn't know how to feed my children. The trust gives us monthly support and food packages. My kids are still in school because of their help.",
    image: "/placeholder.svg?height=80&width=80&text=Fatima",
  },
  {
    name: "Muhammad Ali",
    role: "Orphan",
    message:
      "I'm an orphan and had no money for my wedding. The marriage support department helped me with everything. Now I have my own family and I'm very grateful.",
    image: "/placeholder.svg?height=80&width=80&text=Ali",
  },
];

const TestimonialsCarousel = () => (
  <ReusableCarousel
    variant="testimonial"
    items={testimonials}
    sectionTitle="What People Say About Us"
    sectionDescription="These are real stories from people we've helped. They tell us how our work has changed their lives."
    height="h-[400px]"
  />
);

export default TestimonialsCarousel;
