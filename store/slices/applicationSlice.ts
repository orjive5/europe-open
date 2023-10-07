import { IApplicationSlice } from "@/types/applicationSlice.interface";
import { IUploadedFile } from "@/types/uploadedFile.interface";
import { StateCreator } from "zustand";

export const applicationSlice: StateCreator<IApplicationSlice> = (set) => ({
    discipline: undefined,
    setDiscipline: (state: string) => 
        set(() => ({ discipline: state })),
    category: undefined,
    setCategory: (state: string) => 
        set(() => ({ category: state })),
    name_and_surname: undefined,
    setNameAndSurname: (state: string) => 
        set(() => ({ name_and_surname: state })),
    date_of_birth: undefined,
    setDateOfBirth: (state: Date) => 
        set(() => ({ date_of_birth: state })),
    teacher: undefined,
    setTeacher: (state: string) => 
        set(() => ({ teacher: state })),
    accompanist: undefined,
    setAccompanist: (state: string) => 
        set(() => ({ accompanist: state })),
    conductor: undefined,
    setConductor: (state: string) => 
        set(() => ({ conductor: state })),
    collective_leader: undefined,
    setCollectiveLeader: (state: string) => 
        set(() => ({ collective_leader: state })),
    country: undefined,
    setCountry: (state: string) => 
        set(() => ({ country: state })),
    place: undefined,
    setPlace: (state: string) => 
        set(() => ({ place: state })),
    institution: undefined,
    setInstitution: (state: string) => 
        set(() => ({ institution: state })),
    program: undefined,
    setProgram: (state: string) => 
        set(() => ({ program: state })),
    biography: undefined,
    setBiography: (state: string) => 
        set(() => ({ biography: state })),
    participants_email: undefined,
    setParticipantsEmail: (state: string) => 
        set(() => ({ participants_email: state })),
    teachers_email: undefined,
    setTeachersEmail: (state: string) => 
        set(() => ({ teachers_email: state })),
    video_link: undefined,
    setVideoLink: (state: string) =>
        set(() => ({video_link: state})),
    identity_documents: undefined,
    setIdentityDocuments: (state: IUploadedFile[]) =>
        set(() => ({identity_documents: state})),
    avatar: undefined,
    setAvatar: (state: IUploadedFile[]) =>
        set(() => ({avatar: state})),
    info_correct: undefined,
    setInfoCorrect: (state: boolean) =>
        set(() => ({info_correct: state})),
    agree_with_terms: undefined,
    setAgreeWithTerms: (state: boolean) =>
        set(() => ({agree_with_terms: state})),
    ready_to_checkout: false,
    setReadyToCheckout: (state: boolean) =>
        set(() => ({ready_to_checkout: state})),
    amount_to_pay: undefined,
    setAmountToPay: (state: number) =>
        set(() => ({amount_to_pay: state})),
    diploma_by_post: false,
    setDiplomaByPost: (state: boolean) =>
        set(() => ({diploma_by_post: state})),
    postal_address: undefined,
    setPostalAddress: (state: string) =>
        set(() => ({postal_address: state})),
    open_checkout: false,
    setOpenCheckout: (state: boolean) =>
        set(() => ({open_checkout: state})),
});