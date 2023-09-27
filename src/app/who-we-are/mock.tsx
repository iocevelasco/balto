import { ContentProps } from './page'
import profile1 from '@/assets/Images/Profile1.png'

export const mock: ContentProps = {
  title: 'Who we are',
  description:
    "Headquartered in the Seattle area with offices in Buenos Aires and Las Vegas. Our company was founded by a team of experienced professionals who came together with the common goal of solving software development's biggest challenge: delivering quality solutions on time and on budget.",
  profileCards: [
    {
      name: 'Scott Craig',
      aditionalInfo: 'Co - Founder',
      location: 'London, UK',
      position: 'CEO',
      href: '/test',
      image: profile1,
      alt: 'scott craig picture',
    },
    {
      name: 'Mario Agüero',
      aditionalInfo: 'Co - Founder',
      location: 'Buenos Aires',
      position: 'General Manager',
      href: '/test',
      image: profile1,
      alt: 'mario aguero picture',
    },
    {
      name: 'Luis Paradela',
      aditionalInfo: 'Co - Founder',
      location: 'London, UK',
      position: 'Chief Development Officer',
      href: '/test',
      image: profile1,
      alt: 'luis paradela picture',
    },
  ],
  bottomContent:
    'We are a Design-First company by approach and recommend that your product’s UX & UI Are Designed first. We assign engineering oversight to the design process to ensure engineering feasibility and budget alignment.As a trusted software development company , ErDesarrollo is experienced in working on diverse projects across industries with every type of software problem imaginable. From web services and mobile apps to cloud solutions and product design, we pride ourselves in solving complex problems and delivering innovative, secure, and high-quality solutions to our clients – always on time and within budget. We work closely with you to define project requirements and then deliver quality code using the Scrum framework.We work iteratively with you through development, deployment, and testing until your solution is fully integrated, functional, and aligned with your application’s users. Our company’s guiding principles of transparency, accountability and responsiveness are core to ensuring successful software development services throughout the continuum of the software development lifecycle and ongoing through product maintenance.With custom software development, you have the opportunity to achieve a solution tailored precisely to your needs, rather than an off-the-shelf template that may not be a good fit. To achieve this, an organized, logical progression model is followed to make sure your vision is being followed and the software is secure, tested, and reliable.1. Outline Vision: Our experts consult with your company to clearly understand your business needs and software requirements as well as the project budget and timeline. At this stage, we will address any potential issues in advance, and outline a roadmap and communication schedule.eds. 2. Design and prototyping: Our team designs the software UI and features according to your requirements, and builds prototypes to serve as proof-of-concept, assimilating your feedback along the way. 3. Development: Taking on board what was learned in the prototyping stage, we develop your custom software product, with regular check-ins and an ongoing QA process to determine if any changes are needed. 4. Testing: Our team will collaborate with all stakeholders to test the software and ensure that it works as intended 5. Deployment: Working together with your team, we help launch the product in your organization and address any issues to ensure a smooth rollout. 6. Aftercare: Our team continues to provide ongoing monitoring, maintenance, and support.',
}