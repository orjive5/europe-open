'use client'
import { deleteAllParticipants } from "@/sanity/sanity-utils";
import { generateParticipant, generateCategory } from "@/lib/generateSanityDoc";
import { Button } from "../ui/button";

const Footer = () => {
 
  return (
    <div className="mt-auto flex justify-center">
      <Button onClick={() => generateParticipant({
        discipline: 'a83000ec-ae50-4f46-b46f-7307c706b49d',
        category: '08fd04be-52d3-40b7-954b-5614220493f3',
        name_and_surname: 'Paja Jovanovic',
        date_of_birth: '2023-10-10',
        teacher: 'Bajica Nenadic',
        accompanist: 'Sinan Sakic',
        conductor: 'Hajle Selasije',
        collective_leader: 'Arthur Rubinstein',
        country: 'Poland',
        country_code: 'PL',
        place: 'Warsaw',
        institution: 'Warsaw Conservatory',
        program: '1. M. Bruch - Violin Concerto No. 1 2. H. Wieniawski - Romance',
        teacher_email: 'bajica@hotmail.com',
        participant_email: 'paja@yahoo.com',
        video_link: 'https://www.youtube.com/watch?v=4lTjSlwZW_0',
        biography: 'I am famous Serbian romantic painter.',
        diploma_by_postal_service: true,
        postal_address: 'Vuka Karadzica bez broja'
    })}>
        Generate participant
      </Button>
      {/* <Button onClick={() => generateCategory({title: 'HHH'})}>Generate Category</Button> */}
      {/* <Button onClick={() => deleteAllParticipants()}>
        Delete all participants
      </Button> */}
      <p className="text-center h-full flex items-center">
          &copy; 2023 Europe Open. All rights reserved
      </p>
    </div>
  )
}

export default Footer;