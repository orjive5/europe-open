'use client'
import { deleteAllParticipants } from "@/sanity/sanity-utils";
import { generateParticipant, generateCategory } from "@/lib/generateSanityDoc";
import { Button } from "../ui/button";

const Footer = () => {
 
  return (
    <div className="mt-auto flex justify-center">
      <Button onClick={() => generateParticipant({
        discipline: 'a83000ec-ae50-4f46-b46f-7307c706b49d',
        category: 'I',
        name_and_surname: 'Paja Jovanovic',
        date_of_birth: '2023-10-10',
        teacher_conductor_collective_leader: 'Bajica Nenadic',
        accompanist: 'Arthur Rubinstein',
        country: 'Poland',
        country_code: 'PL',
        place: 'Warsaw',
        institution_city_country: 'Warsaw Conservatory',
        program: 'F. Chopin - Nocturne',
        diploma_by_postal_service: false,
        teacher_email: 'bajica@hotmail.com',
        participant_email: 'paja@yahoo.com',
    })}>
        Generate participant
      </Button>
      {/* <Button onClick={() => generateCategory({title: 'HHH'})}>Generate Category</Button> */}
      <Button onClick={() => deleteAllParticipants()}>
        Delete all participants
      </Button>
      <p className="text-center h-full flex items-center">
          &copy; 2023 Europe Open. All rights reserved
      </p>
    </div>
  )
}

export default Footer;