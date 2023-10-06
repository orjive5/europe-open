export interface IParticipantInfo {
    participant: {
      accompanist: string | null;
      category: string[];
      country: string;
      country_code: string;
      place: string;
      date_of_birth: string;
      discipline: string[];
      institution: string;
      name_and_surname: string;
      poster_photo: string | null;
      program: string;
      slug: string;
      teacher: string;
      conductor: string;
      collective_leader: string;
      youtube_link: string;
      biography: string;
      _createdAt: string;
      _id: string;
    }
  }