import { useBoundStore } from "@/store";
import { FormValues } from "./zodFormSchema";
import { countries } from "@/constants/countriesList";

const store = useBoundStore.getState();

export const onSubmit = (values: FormValues) => {
    store.setDiscipline(values.disciplines);
    store.setCategory(values.categories);
    store.setNameAndSurname(values.name_and_surname);
    store.setDateOfBirth(values.date_of_birth);
    store.setTeacher(values.teacher);
    store.setAccompanist(values.accompanist);
    store.setConductor(values.conductor);
    store.setCollectiveLeader(values.collective_leader);
    const countryCode = countries.find(c => c.name === values.countries)?.code;
    store.setCountry(countryCode);
    store.setPlace(values.place);
    store.setInstitution(values.institution);
    store.setProgram(values.program);
    store.setBiography(values.biography);
    store.setParticipantsEmail(values.participants_email);
    store.setTeachersEmail(values.teachers_email);
    store.setVideoLink(values.video_link);
    store.setIdentityDocuments(values.identity_documents);
    store.setAvatar(values.avatar);
    store.setInfoCorrect(values.info_correct);
    store.setAgreeWithTerms(values.agree_with_terms);
    store.setDiplomaByPost(values.diploma_by_post);
    store.setPostalAddress(values.address);
    store.setReadyToCheckout(true);
    store.setOpenCheckout(true);
    store.diploma_by_post ? store.setAmountToPay(40) : store.setAmountToPay(30);
  }